"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { MAX_MOMENTOS } from "@/lib/momentos";

async function requireSession() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("No autorizado");
}

export async function createMomento(formData: FormData) {
  await requireSession();

  const count = await prisma.momentoLazarillo.count();
  if (count >= MAX_MOMENTOS) {
    throw new Error(`Máximo de ${MAX_MOMENTOS} fotos alcanzado, elimina una para agregar otra.`);
  }

  const caption = String(formData.get("caption") || "").trim();
  const imagenUrl = String(formData.get("imagenUrl") || "").trim();

  if (!caption || !imagenUrl) {
    throw new Error("La foto y el pie de foto son obligatorios.");
  }

  const last = await prisma.momentoLazarillo.findFirst({ orderBy: { order: "desc" } });
  const nextOrder = last ? last.order + 1 : 0;

  await prisma.momentoLazarillo.create({
    data: { caption, imagenUrl, order: nextOrder },
  });

  revalidatePath("/admin/momentos");
  revalidatePath("/");
}

export async function updateMomentoCaption(id: string, formData: FormData) {
  await requireSession();

  const caption = String(formData.get("caption") || "").trim();
  if (!caption) throw new Error("El pie de foto es obligatorio.");

  await prisma.momentoLazarillo.update({ where: { id }, data: { caption } });

  revalidatePath("/admin/momentos");
  revalidatePath("/");
}

export async function deleteMomento(id: string) {
  await requireSession();

  await prisma.momentoLazarillo.delete({ where: { id } });

  revalidatePath("/admin/momentos");
  revalidatePath("/");
}

export async function moveMomento(id: string, direction: "up" | "down") {
  await requireSession();

  const momentos = await prisma.momentoLazarillo.findMany({ orderBy: { order: "asc" } });
  const index = momentos.findIndex((m) => m.id === id);
  if (index === -1) return;

  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (swapIndex < 0 || swapIndex >= momentos.length) return;

  const current = momentos[index];
  const target = momentos[swapIndex];

  await prisma.$transaction([
    prisma.momentoLazarillo.update({ where: { id: current.id }, data: { order: target.order } }),
    prisma.momentoLazarillo.update({ where: { id: target.id }, data: { order: current.order } }),
  ]);

  revalidatePath("/admin/momentos");
  revalidatePath("/");
}
