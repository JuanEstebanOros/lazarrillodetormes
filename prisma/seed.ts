import "dotenv/config";
import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { contentSchema } from "../src/lib/content-schema";
import { gallery } from "../src/lib/site-data";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const ADMIN_EMAIL = "rectoria@lazarillodetormes.edu.co";

async function seedAdminUser() {
  const existing = await prisma.adminUser.findUnique({ where: { email: ADMIN_EMAIL } });
  if (existing) {
    console.log(`\n[seed] AdminUser ya existe (${ADMIN_EMAIL}). No se generaron credenciales nuevas.`);
    return;
  }

  const tempPassword = crypto.randomBytes(9).toString("base64url"); // 12-char random temp password
  const hashed = await bcrypt.hash(tempPassword, 12);

  await prisma.adminUser.create({
    data: { email: ADMIN_EMAIL, password: hashed },
  });

  console.log("\n===========================================");
  console.log(" Usuario admin creado — credenciales temporales");
  console.log("===========================================");
  console.log(` Correo:      ${ADMIN_EMAIL}`);
  console.log(` Contraseña:  ${tempPassword}`);
  console.log(" Cámbiala después de iniciar sesión por primera vez.");
  console.log("===========================================\n");
}

async function seedSiteContent() {
  let created = 0;
  let skipped = 0;

  for (const section of contentSchema) {
    for (const field of section.fields) {
      const existing = await prisma.siteContent.findUnique({
        where: { section_key: { section: section.section, key: field.key } },
      });
      if (existing) {
        skipped++;
        continue;
      }
      // Campos sin default (p.ej. himno_video_url) se guardan vacíos: el componente
      // muestra su placeholder mientras no tengan valor.
      await prisma.siteContent.create({
        data: {
          section: section.section,
          key: field.key,
          value: field.default,
          type: field.type === "image" ? "image" : "text",
        },
      });
      created++;
    }
  }

  console.log(`[seed] SiteContent: ${created} valores creados, ${skipped} ya existían.`);
}

async function seedMomentos() {
  const count = await prisma.momentoLazarillo.count();
  if (count > 0) {
    console.log(`[seed] MomentoLazarillo: ya hay ${count} fotos, no se migró nada.`);
    return;
  }

  const fotos = gallery.slice(0, 20);
  await prisma.momentoLazarillo.createMany({
    data: fotos.map((foto, i) => ({
      imagenUrl: foto.src,
      caption: foto.caption,
      order: i,
    })),
  });

  console.log(`[seed] MomentoLazarillo: ${fotos.length} fotos migradas desde site-data.ts.`);
}

const NOTICIAS_INICIALES = [
  { titulo: "Nuestra promesa al futuro", fecha: "2026-04-27", imagenUrl: "/images/noticias/noticia1.jpg" },
  { titulo: "Ciencia que encanta: nuestro laboratorio", fecha: "2026-05-11", imagenUrl: "/images/noticias/noticia2.jpg" },
];

async function seedNoticias() {
  const count = await prisma.noticia.count();
  if (count > 0) {
    console.log(`[seed] Noticia: ya hay ${count} noticias, no se migró nada.`);
    return;
  }

  await prisma.noticia.createMany({
    data: NOTICIAS_INICIALES.map((noticia) => ({
      titulo: noticia.titulo,
      fecha: new Date(noticia.fecha),
      imagenUrl: noticia.imagenUrl,
    })),
  });

  console.log(`[seed] Noticia: ${NOTICIAS_INICIALES.length} noticias creadas.`);
}

async function main() {
  await seedAdminUser();
  await seedSiteContent();
  await seedMomentos();
  await seedNoticias();
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
