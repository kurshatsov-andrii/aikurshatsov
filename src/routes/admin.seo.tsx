import { createFileRoute } from "@tanstack/react-router";
import { KeyValueEditor, type KVField } from "@/components/admin/KeyValueEditor";

const PAGES: { path: string; label: string }[] = [
  { path: "/", label: "Головна" },
  { path: "/ai-songs", label: "AI Songs" },
  { path: "/ai-video-ads", label: "AI Video Ads" },
  { path: "/vibe-coding", label: "Vibe Coding" },
  { path: "/courses", label: "Курси" },
  { path: "/certificates", label: "Сертифікати" },
];

const fields: KVField[] = [
  { name: "title_uk", label: "Title (UA)", type: "text" },
  { name: "title_en", label: "Title (EN)", type: "text" },
  { name: "description_uk", label: "Description (UA)", type: "textarea" },
  { name: "description_en", label: "Description (EN)", type: "textarea" },
];

export const Route = createFileRoute("/admin/seo")({
  component: SeoAdminPage,
});

function SeoAdminPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight">SEO сторінок</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Title та description для кожної сторінки. Збережене відображається у вкладці браузера, пошуку Google і соцмережах.
        </p>
      </div>
      {PAGES.map((p) => (
        <KeyValueEditor
          key={p.path}
          contentKey={`seo:${p.path}`}
          title={`${p.label}  ·  ${p.path}`}
          fields={fields}
        />
      ))}
    </div>
  );
}
