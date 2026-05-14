import { createFileRoute } from "@tanstack/react-router";
import { ResourceManager, type Field } from "@/components/admin/ResourceManager";

const fields: Field[] = [
  { name: "title_uk", label: "Назва (UA)", type: "text", required: true },
  { name: "title_en", label: "Назва (EN)", type: "text", required: true },
  { name: "artist", label: "Артист / Бренд", type: "text" },
  { name: "description_uk", label: "Опис (UA)", type: "textarea" },
  { name: "description_en", label: "Опис (EN)", type: "textarea" },
  { name: "platform", label: "Платформа", type: "select", options: ["YouTube", "Instagram", "TikTok", "Vimeo"] },
  { name: "video_url", label: "Посилання на відео (embed/URL)", type: "url", placeholder: "https://www.youtube.com/embed/..." },
  { name: "thumbnail_url", label: "Прев'ю", type: "image" },
];

export const Route = createFileRoute("/admin/clips")({
  component: () => (
    <ResourceManager
      table="clips"
      title="ШІ-кліпи"
      fields={fields}
      primaryColumn="title_uk"
      storageFolder="clips"
    />
  ),
});
