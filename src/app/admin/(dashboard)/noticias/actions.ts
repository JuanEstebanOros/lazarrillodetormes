"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function requireSession() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("No autorizado");
}

function readNoticiaFields(formData: FormData) {
  const titulo = String(formData.get("titulo") || "").trim();
  const fecha = String(formData.get("fecha") || "");
  const imagenUrl = String(formData.get("imagenUrl") || "").trim();

  if (!titulo || !fecha || !imagenUrl) {
    throw new Error("Título, fecha e imagen son obligatorios.");
  }

  return { titulo, fecha: new Date(fecha), imagenUrl };
}

export async function createNoticia(formData: FormData) {
  await requireSession();
  const data = readNoticiaFields(formData);

  await prisma.noticia.create({ data });

  revalidatePath("/admin/noticias");
  revalidatePath("/");
}

export async function updateNoticia(id: string, formData: FormData) {
  await requireSession();
  const data = readNoticiaFields(formData);

  await prisma.noticia.update({ where: { id }, data });

  revalidatePath("/admin/noticias");
  revalidatePath("/");
}

export async function deleteNoticia(id: string) {
  await requireSession();
  await prisma.noticia.delete({ where: { id } });

  revalidatePath("/admin/noticias");
  revalidatePath("/");
}
