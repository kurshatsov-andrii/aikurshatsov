import { createFileRoute } from "@tanstack/react-router";
import { KeyValueEditor, type KVField } from "@/components/admin/KeyValueEditor";

const fields: KVField[] = [
  { name: "photo_url", label: "Фото", type: "image", folder: "about" },
  { name: "description_uk", label: "Опис (UA)", type: "textarea" },
  { name: "description_en", label: "Опис (EN)", type: "textarea" },
  { name: "tags", label: "Теги (через кому)", type: "tags" },
];

export const Route = createFileRoute("/admin/about")({
  component: () => (
    <KeyValueEditor
      contentKey="about"
      title="Про мене"
      description="Фото, опис двома мовами та теги-інструменти."
      fields={fields}
    />
  ),
});
