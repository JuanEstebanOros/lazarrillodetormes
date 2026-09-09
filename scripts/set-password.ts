import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const [email, password] = process.argv.slice(2);

  if (!email || !password) {
    console.error(
      'Uso: npx tsx scripts/set-password.ts correo@ejemplo.com "NuevaContraseña123"'
    );
    process.exit(1);
  }

  const existing = await prisma.adminUser.findUnique({ where: { email } });
  if (!existing) {
    console.error(`Error: no existe ningún AdminUser con el correo "${email}".`);
    process.exit(1);
  }

  const hashed = await bcrypt.hash(password, 12);
  await prisma.adminUser.update({
    where: { email },
    data: { password: hashed },
  });

  console.log(`Contraseña actualizada correctamente para ${email}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
