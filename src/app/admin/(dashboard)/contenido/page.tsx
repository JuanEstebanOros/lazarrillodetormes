import { contentSchema } from "@/lib/content-schema";
import { getSection } from "@/lib/content";
import ContentSectionForm from "@/components/admin/ContentSectionForm";
import { saveSectionContent } from "./actions";

export default async function ContenidoPage() {
  const sections = await Promise.all(
    contentSchema.map(async (section) => ({
      ...section,
      values: await getSection(section.section),
    }))
  );

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink">Contenido del sitio</h1>
        <p className="text-sm text-muted mt-1">
          Los cambios se publican de inmediato en la página principal.
        </p>
      </div>

      {sections.map((section) => (
        <ContentSectionForm
          key={section.section}
          section={section}
          action={saveSectionContent.bind(null, section.section)}
        />
      ))}
    </div>
  );
}
