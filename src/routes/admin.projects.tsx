import { createFileRoute } from "@tanstack/react-router";
import { ResourceManager, type Field } from "@/components/admin/ResourceManager";

const fields: Field[] = [
  { name: "title_uk", label: "Назва (UA)", type: "text", required: true },
  { name: "title_en", label: "Назва (EN)", type: "text", required: true },
  { name: "description_uk", label: "Опис (UA)", type: "textarea" },
  { name: "description_en", label: "Опис (EN)", type: "textarea" },
  { name: "stack", label: "Стек технологій", type: "tags" },
  { name: "features", label: "Фічі", type: "tags" },
  { name: "live_url", label: "Live URL", type: "url" },
  { name: "github_url", label: "GitHub URL", type: "url" },
  { name: "screenshot_url", label: "Скріншот", type: "image" },
];

export const Route = createFileRoute("/admin/projects")({
  component: () => (
    <ResourceManager
      table="vibe_projects"
      title="Vibe-проєкти"
      fields={fields}
      primaryColumn="title_uk"
      storageFolder="projects"
    />
  ),
});
