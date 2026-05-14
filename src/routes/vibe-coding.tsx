import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { vibeProjects } from "@/lib/portfolio-data";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/vibe-coding")({
  head: () => ({
    meta: [
      { title: "Vibe Coding — Куршацов Андрій" },
      { name: "description", content: "Vibe-coded products and websites by Андрій Куршацов." },
      { property: "og:title", content: "Vibe Coding — Куршацов Андрій" },
      { property: "og:url", content: "/vibe-coding" },
    ],
    links: [{ rel: "canonical", href: "/vibe-coding" }],
  }),
  component: VibePage,
});

function VibePage() {
  const { t, lang } = useI18n();
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <header className="mb-12">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
            {t("portfolio.tab.code")}
          </div>
          <h1 className="font-display text-5xl sm:text-6xl font-semibold tracking-tight">
            <span className="text-gradient">Vibe</span> Coding
          </h1>
          <p className="mt-3 text-muted-foreground max-w-xl">{t("portfolio.subtitle")}</p>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {vibeProjects.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group glass rounded-2xl overflow-hidden hover:shadow-elegant transition-all hover:-translate-y-1"
            >
              <div className="aspect-video overflow-hidden">
                <img src={p.screenshot} alt={p.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-5">
                <h3 className="font-display font-semibold text-lg">{p.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{p.description[lang]}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <span key={s} className="text-[11px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">{s}</span>
                  ))}
                </div>
                <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
                  {p.features.map((f) => (<li key={f}>• {f}</li>))}
                </ul>
                <div className="mt-4 flex items-center gap-3 text-sm">
                  {p.liveUrl && (
                    <a href={p.liveUrl} className="inline-flex items-center gap-1.5 hover:text-violet transition-colors">
                      <ExternalLink className="size-4" /> Live
                    </a>
                  )}
                  {p.githubUrl && (
                    <a href={p.githubUrl} className="inline-flex items-center gap-1.5 hover:text-violet transition-colors">
                      <Github className="size-4" /> GitHub
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
