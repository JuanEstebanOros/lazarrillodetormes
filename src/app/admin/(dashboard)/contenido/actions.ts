"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { contentSchema } from "@/lib/content-schema";

export async function saveSectionContent(sectionKey: string, formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("No autorizado");

  const section = contentSchema.find((s) => s.section === sectionKey);
  if (!section) throw new Error("Sección desconocida");

  for (const field of section.fields) {
    const raw = formData.get(field.key);
    if (raw === null) continue;
    const value = String(raw);

    await prisma.siteContent.upsert({
      where: { section_key: { section: sectionKey, key: field.key } },
      update: { value },
      create: {
        section: sectionKey,
        key: field.key,
        value,
        type: field.type === "image" ? "image" : "text",
      },
    });
  }

  revalidatePath("/admin/contenido");
  revalidatePath("/");
}
