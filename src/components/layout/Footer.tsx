import { useI18n } from "@/lib/i18n";
import { Link } from "@tanstack/react-router";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-border mt-32">
      <div className="mx-auto max-w-7xl px-4 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Kurshatsov Andrii — {t("footer.role")}.
        </div>
        <div className="flex items-center gap-4 text-sm">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
            {t("nav.home")}
          </Link>
          <Link to="/courses" className="text-muted-foreground hover:text-foreground transition-colors">
            {t("nav.courses")}
          </Link>
          <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
            {t("nav.contact")}
          </a>
        </div>
      </div>
    </footer>
  );
}
