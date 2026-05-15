import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

const NAV_ITEMS = [
  { to: "/", k: "nav.home" as const },
  { to: "/services", k: "nav.services" as const },
  { to: "/ai-songs", k: "portfolio.tab.songs" as const },
  { to: "/ai-video-ads", k: "portfolio.tab.video" as const },
  { to: "/ai-clips", k: "portfolio.tab.clips" as const },
  { to: "/vibe-coding", k: "portfolio.tab.code" as const },
  { to: "/courses", k: "nav.courses" as const },
  { to: "/certificates", k: "nav.certificates" as const },
  { to: "/contact", k: "nav.contact" as const },
];

export function Header() {
  const { theme, toggle } = useTheme();
  const { lang, setLang, t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4">
        <nav
          className={`glass rounded-2xl px-4 sm:px-5 py-3 flex items-center justify-between transition-all ${
            scrolled ? "shadow-elegant" : ""
          }`}
        >
          <Link to="/" className="font-display font-semibold text-base sm:text-lg tracking-tight">
            <span className="text-gradient">Kurshatsov</span>
            <span className="text-muted-foreground">.ai</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="px-3 py-1.5 text-sm rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
                activeProps={{ className: "px-3 py-1.5 text-sm rounded-lg text-foreground bg-secondary/60" }}
                activeOptions={{ exact: true }}
              >
                {t(item.k)}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setLang(lang === "uk" ? "en" : "uk")}
              className="h-9 px-2.5 rounded-lg text-xs font-medium flex items-center hover:bg-secondary/60 transition-colors"
              aria-label="Switch language"
            >
              <span className="uppercase">{lang}</span>
            </button>
            <button
              onClick={toggle}
              className="h-9 w-9 grid place-items-center rounded-lg hover:bg-secondary/60 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button
                  className="md:hidden h-9 w-9 grid place-items-center rounded-lg hover:bg-secondary/60 transition-colors"
                  aria-label="Open menu"
                >
                  <Menu className="size-4" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 p-6">
                <SheetTitle className="mb-6 font-display">
                  <span className="text-gradient">Kurshatsov</span>
                  <span className="text-muted-foreground">.ai</span>
                </SheetTitle>
                <div className="flex flex-col gap-1">
                  {NAV_ITEMS.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className="px-3 py-2.5 text-sm rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
                      activeProps={{ className: "px-3 py-2.5 text-sm rounded-lg text-foreground bg-secondary/60" }}
                      activeOptions={{ exact: true }}
                    >
                      {t(item.k)}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
}
