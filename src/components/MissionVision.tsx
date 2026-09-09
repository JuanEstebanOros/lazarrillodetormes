import { missionVision as defaultMissionVision } from "@/lib/site-data";
import { getSection, pick } from "@/lib/content";

export default async function MissionVision() {
  const content = await getSection("mision-vision");

  const cards = [
    {
      title: pick(content, "mision_titulo", defaultMissionVision.mision.title),
      text: pick(content, "mision_texto", defaultMissionVision.mision.text),
    },
    {
      title: pick(content, "vision_titulo", defaultMissionVision.vision.title),
      text: pick(content, "vision_texto", defaultMissionVision.vision.text),
    },
  ];

  return (
    <div className="grid gap-6 mb-14 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]">
      {cards.map((card) => (
        <div key={card.title} className="bg-white rounded-2xl p-8 border border-border">
          <h3 className="font-display text-xl font-bold mb-3 text-gold">{card.title}</h3>
          <p className="text-[15px] leading-relaxed text-ink-soft whitespace-pre-line">{card.text}</p>
        </div>
      ))}
    </div>
  );
}
