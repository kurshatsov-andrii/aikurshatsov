import { createFileRoute } from "@tanstack/react-router";
import { ResourceManager, type Field } from "@/components/admin/ResourceManager";

const fields: Field[] = [
  { name: "title_uk", label: "Назва (UA)", type: "text", required: true },
  { name: "title_en", label: "Назва (EN)", type: "text", required: true },
  { name: "description_uk", label: "Опис (UA)", type: "textarea" },
  { name: "description_en", label: "Опис (EN)", type: "textarea" },
  { name: "icon", label: "Іконка", type: "select", options: ["music", "film", "sparkles", "code", "graduation"] },
  { name: "price", label: "Ціна", type: "text", placeholder: "$199" },
  { name: "link_url", label: "Посилання на курс", type: "url" },
];

export const Route = createFileRoute("/admin/courses")({
  component: () => (
    <ResourceManager
      table="courses"
      title="Курси"
      fields={fields}
      primaryColumn="title_uk"
      storageFolder="courses"
    />
  ),
});
