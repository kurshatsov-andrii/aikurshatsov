import { createFileRoute, Outlet, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { LogOut, Music, Film, Code2, GraduationCap, Award, MessageSquare, LayoutDashboard, User, Search, Share2 } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Admin — Kurshatsov.ai" }, { name: "robots", content: "noindex" }],
  }),
  component: AdminLayout,
});

const items: { to: string; icon: typeof Music; label: string; exact?: boolean }[] = [
  { to: "/admin", icon: LayoutDashboard, label: "Дашборд", exact: true },
  { to: "/admin/about", icon: User, label: "Про мене" },
  { to: "/admin/seo", icon: Search, label: "SEO сторінок" },
  { to: "/admin/songs", icon: Music, label: "Пісні" },
  { to: "/admin/videos", icon: Film, label: "Відеореклама" },
  { to: "/admin/clips", icon: Film, label: "ШІ-кліпи" },
  { to: "/admin/projects", icon: Code2, label: "Vibe-проєкти" },
  { to: "/admin/courses", icon: GraduationCap, label: "Курси" },
  { to: "/admin/certificates", icon: Award, label: "Сертифікати" },
  { to: "/admin/testimonials", icon: MessageSquare, label: "Відгуки" },
  { to: "/admin/socials", icon: Share2, label: "Соцмережі" },
];

function AdminLayout() {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [loading, user, navigate]);

  if (loading) {
    return <div className="min-h-[60vh] grid place-items-center text-muted-foreground">Завантаження…</div>;
  }
  if (!user) return null;
  if (!isAdmin) {
    return (
      <div className="min-h-[60vh] grid place-items-center px-4">
        <div className="glass rounded-2xl p-8 max-w-md text-center">
          <h2 className="font-display text-2xl font-semibold">Немає доступу</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Твій акаунт ({user.email}) не має ролі адміністратора.
          </p>
          <p className="text-xs text-muted-foreground mt-4">
            Звернись до власника сайту, щоб отримати доступ. ID користувача: <code className="break-all">{user.id}</code>
          </p>
          <Button variant="outline" onClick={signOut} className="mt-6">
            Вийти
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid lg:grid-cols-[240px_1fr] gap-8">
        <aside className="lg:sticky lg:top-24 self-start">
          <div className="glass rounded-2xl p-3">
            <nav className="flex lg:flex-col gap-1 overflow-x-auto">
              {items.map((it) => (
                <Link
                  key={it.to}
                  to={it.to as string}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors whitespace-nowrap"
                  activeProps={{ className: "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-foreground bg-secondary/80" }}
                  activeOptions={{ exact: it.exact ?? false }}
                >
                  <it.icon className="size-4" />
                  {it.label}
                </Link>
              ))}
            </nav>
            <div className="mt-3 border-t border-border pt-3 px-2">
              <div className="text-xs text-muted-foreground truncate">{user.email}</div>
              <Button
                variant="ghost"
                size="sm"
                onClick={signOut}
                className="w-full justify-start mt-2 text-muted-foreground"
              >
                <LogOut className="size-4 mr-2" /> Вийти
              </Button>
            </div>
          </div>
        </aside>

        <div className="min-w-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
