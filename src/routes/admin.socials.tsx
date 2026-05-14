import { createFileRoute } from "@tanstack/react-router";
import { KeyValueEditor, type KVField } from "@/components/admin/KeyValueEditor";

const fields: KVField[] = [
  { name: "telegram", label: "Telegram URL", type: "text" },
  { name: "viber", label: "Viber URL (viber://chat?number=...)", type: "text" },
  { name: "instagram", label: "Instagram URL", type: "text" },
  { name: "linkedin", label: "LinkedIn URL", type: "text" },
  { name: "github", label: "GitHub URL", type: "text" },
  { name: "website", label: "Website URL", type: "text" },
];

export const Route = createFileRoute("/admin/socials")({
  component: () => (
    <KeyValueEditor
      contentKey="socials"
      title="Соцмережі"
      description="Посилання на соцмережі, що відображаються у блоці контактів."
      fields={fields}
    />
  ),
});
