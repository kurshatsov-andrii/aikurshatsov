import { createFileRoute } from "@tanstack/react-router";
import { ResourceManager, type Field } from "@/components/admin/ResourceManager";

const fields: Field[] = [
  { name: "name", label: "Ім'я", type: "text", required: true },
  { name: "role_uk", label: "Роль (UA)", type: "text" },
  { name: "role_en", label: "Роль (EN)", type: "text" },
  { name: "text_uk", label: "Текст відгуку (UA)", type: "textarea" },
  { name: "text_en", label: "Текст відгуку (EN)", type: "textarea" },
  { name: "avatar_url", label: "Аватар", type: "image" },
];

export const Route = createFileRoute("/admin/testimonials")({
  component: () => (
    <ResourceManager
      table="testimonials"
      title="Відгуки"
      fields={fields}
      primaryColumn="name"
      storageFolder="testimonials"
    />
  ),
});
