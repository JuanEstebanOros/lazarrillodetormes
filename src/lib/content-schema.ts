import { motto, symbols, cifras, levels, missionVision, contact } from "./site-data";

export type ContentFieldType = "text" | "textarea" | "image";

export interface ContentField {
  key: string;
  label: string;
  type: ContentFieldType;
  default: string;
}

export interface ContentSectionDef {
  section: string;
  label: string;
  fields: ContentField[];
}

/**
 * Single source of truth for the editable fields backed by SiteContent.
 * Drives both /admin/contenido (form generation) and prisma/seed.ts (initial values).
 * Components read these same sections/keys via src/lib/content.ts, falling back to
 * the `default` values below (taken from site-data.ts) when Prisma has no row yet.
 */
export const contentSchema: ContentSectionDef[] = [
  {
    section: "mision-vision",
    label: "Misión y visión",
    fields: [
      { key: "mision_titulo", label: "Misión — título", type: "text", default: missionVision.mision.title },
      { key: "mision_texto", label: "Misión — texto", type: "textarea", default: missionVision.mision.text },
      { key: "vision_titulo", label: "Visión — título", type: "text", default: missionVision.vision.title },
      { key: "vision_texto", label: "Visión — texto", type: "textarea", default: missionVision.vision.text },
    ],
  },
  {
    section: "simbolos",
    label: "Nuestros símbolos",
    fields: [
      { key: "lema", label: "Lema institucional", type: "text", default: motto },
      { key: "escudo_titulo", label: "Escudo — título", type: "text", default: symbols.escudo.title },
      {
        key: "escudo_descripcion",
        label: "Escudo — descripción",
        type: "textarea",
        default: symbols.escudo.description,
      },
      { key: "escudo_imagen", label: "Escudo — imagen", type: "image", default: symbols.escudo.image },
      { key: "bandera_titulo", label: "Bandera — título", type: "text", default: symbols.bandera.title },
      {
        key: "bandera_descripcion",
        label: "Bandera — descripción",
        type: "textarea",
        default: symbols.bandera.description,
      },
      { key: "bandera_imagen", label: "Bandera — imagen", type: "image", default: symbols.bandera.image },
      {
        key: "himno_video_url",
        label: "Himno — link de YouTube",
        type: "text",
        default: "",
      },
    ],
  },
  {
    section: "cifras",
    label: "Lazarillo en cifras",
    fields: cifras.flatMap((cifra, i) => [
      { key: `cifra${i + 1}_num`, label: `Cifra ${i + 1} — número`, type: "text" as const, default: cifra.num },
      {
        key: `cifra${i + 1}_label`,
        label: `Cifra ${i + 1} — descripción`,
        type: "text" as const,
        default: cifra.label,
      },
    ]),
  },
  {
    section: "oferta",
    label: "Oferta educativa",
    fields: levels.flatMap((nivel, i) => [
      { key: `nivel${i + 1}_nombre`, label: `Nivel ${i + 1} — nombre`, type: "text" as const, default: nivel.name },
      { key: `nivel${i + 1}_edad`, label: `Nivel ${i + 1} — edades`, type: "text" as const, default: nivel.age },
      {
        key: `nivel${i + 1}_desc`,
        label: `Nivel ${i + 1} — descripción`,
        type: "textarea" as const,
        default: nivel.desc,
      },
    ]),
  },
  {
    section: "contacto",
    label: "Contacto y redes sociales",
    fields: [
      { key: "contacto_telefono", label: "Teléfono / WhatsApp", type: "text", default: contact.telefono },
      { key: "contacto_email", label: "Correo electrónico", type: "text", default: contact.email },
      { key: "contacto_direccion", label: "Dirección", type: "text", default: contact.direccion },
      { key: "redes_facebook", label: "Facebook (URL completa)", type: "text", default: contact.facebook },
      { key: "redes_instagram", label: "Instagram (URL completa)", type: "text", default: contact.instagram },
      { key: "redes_youtube", label: "YouTube (URL completa)", type: "text", default: contact.youtube },
    ],
  },
];
