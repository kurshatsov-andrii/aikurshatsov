import { createFileRoute } from "@tanstack/react-router";
import { ResourceManager, type Field } from "@/components/admin/ResourceManager";

const fields: Field[] = [
  { name: "title_uk", label: "Назва (UA)", type: "text", required: true },
  { name: "title_en", label: "Назва (EN)", type: "text", required: true },
  { name: "description_uk", label: "Опис (UA)", type: "textarea" },
  { name: "description_en", label: "Опис (EN)", type: "textarea" },
  { name: "genre", label: "Жанр", type: "text" },
  { name: "tags", label: "Теги", type: "tags" },
  { name: "cover_url", label: "Обкладинка", type: "image" },
  { name: "audio_url", label: "Аудіо", type: "audio" },
];

export const Route = createFileRoute("/admin/songs")({
  component: () => (
    <ResourceManager
      table="songs"
      title="Пісні"
      fields={fields}
      primaryColumn="title_uk"
      storageFolder="songs"
    />
  ),
});
