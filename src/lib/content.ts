import { prisma } from "./prisma";

export type ContentMap = Record<string, string>;

/**
 * Reads every SiteContent row for a section and returns it as a { key: value } map.
 * Never throws: if Prisma/the DB is unreachable, callers fall back to the site-data.ts defaults.
 */
export async function getSection(section: string): Promise<ContentMap> {
  try {
    const rows = await prisma.siteContent.findMany({ where: { section } });
    return Object.fromEntries(rows.map((row) => [row.key, row.value]));
  } catch (error) {
    console.error(`[content] No se pudo leer SiteContent para la sección "${section}":`, error);
    return {};
  }
}

/** Returns the DB value for `key` if present and non-empty, otherwise `fallback`. */
export function pick(map: ContentMap, key: string, fallback: string): string {
  const value = map[key];
  return value && value.trim() !== "" ? value : fallback;
}

/**
 * Like `pick`, but an explicitly empty value (e.g. an admin clearing an optional
 * social link) stays empty instead of falling back — callers use the empty
 * result to hide the field rather than render a broken link. `fallback` only
 * applies when the row doesn't exist yet (e.g. before the DB is seeded).
 */
export function pickOptional(map: ContentMap, key: string, fallback: string): string {
  return key in map ? map[key] : fallback;
}
