import { createFileRoute } from "@tanstack/react-router";
import { ResourceManager, type Field } from "@/components/admin/ResourceManager";

const fields: Field[] = [
  { name: "title", label: "Назва сертифіката", type: "text", required: true },
  { name: "issuer", label: "Видавець", type: "text" },
  { name: "image_url", label: "Зображення", type: "image" },
];

export const Route = createFileRoute("/admin/certificates")({
  component: () => (
    <ResourceManager
      table="certificates"
      title="Сертифікати"
      fields={fields}
      primaryColumn="title"
      storageFolder="certificates"
    />
  ),
});
