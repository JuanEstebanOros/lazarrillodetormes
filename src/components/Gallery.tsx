import { gallery as defaultGallery } from "@/lib/site-data";
import { prisma } from "@/lib/prisma";
import GalleryCarousel, { type GalleryPhoto } from "./GalleryCarousel";

async function getPhotos(): Promise<GalleryPhoto[]> {
  try {
    const momentos = await prisma.momentoLazarillo.findMany({ orderBy: { order: "asc" } });
    if (momentos.length === 0) return defaultGallery.slice(0, 20);

    return momentos.map((momento) => ({
      id: momento.id,
      caption: momento.caption,
      src: momento.imagenUrl,
    }));
  } catch (error) {
    console.error("[Gallery] No se pudo leer MomentoLazarillo desde Prisma:", error);
    return defaultGallery.slice(0, 20);
  }
}

export default async function Gallery() {
  const photos = await getPhotos();
  return <GalleryCarousel photos={photos} />;
}
