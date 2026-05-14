import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Music, Film, Code2, GraduationCap, Award, MessageSquare } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

const tables = [
  { table: "songs", label: "Пісні", to: "/admin/songs", icon: Music },
  { table: "videos", label: "Відеореклама", to: "/admin/videos", icon: Film },
  { table: "vibe_projects", label: "Vibe-проєкти", to: "/admin/projects", icon: Code2 },
  { table: "courses", label: "Курси", to: "/admin/courses", icon: GraduationCap },
  { table: "certificates", label: "Сертифікати", to: "/admin/certificates", icon: Award },
  { table: "testimonials", label: "Відгуки", to: "/admin/testimonials", icon: MessageSquare },
] as const;

function AdminDashboard() {
  const { data } = useQuery({
    queryKey: ["admin-counts"],
    queryFn: async () => {
      const counts: Record<string, number> = {};
      await Promise.all(
        tables.map(async (t) => {
          const { count } = await supabase.from(t.table).select("*", { count: "exact", head: true });
          counts[t.table] = count ?? 0;
        })
      );
      return counts;
    },
  });

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold tracking-tight">Адмін-панель</h1>
      <p className="text-muted-foreground mt-1">Керуй контентом сайту в одному місці.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {tables.map((t) => (
          <Link
            key={t.table}
            to={t.to}
            className="glass rounded-2xl p-5 hover:shadow-elegant transition-all hover:-translate-y-0.5 group"
          >
            <div className="flex items-center justify-between">
              <t.icon className="size-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              <span className="text-2xl font-display font-semibold">{data?.[t.table] ?? "—"}</span>
            </div>
            <div className="mt-4 font-medium">{t.label}</div>
            <div className="text-xs text-muted-foreground mt-0.5">Керувати →</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
