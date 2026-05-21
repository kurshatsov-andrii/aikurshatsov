import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useI18n } from "@/lib/i18n";
import { fetchVibeProjects, pick } from "@/lib/data";
import { fetchSeo, seoMeta } from "@/lib/site-content";

export const Route = createFileRoute("/vibe-coding")({
  loader: async () => ({ seo: await fetchSeo("/vibe-coding") }),
  head: ({ loaderData }) => ({
    ...seoMeta(
      loaderData?.seo ?? null,
      "Vibe Coding — Куршацов Андрій",
      "Vibe-coded продукти та сайти.",
      "/vibe-coding"
    ),
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Vibe Coding — Куршацов Андрій",
        url: "https://kurshatsov-andrii.lovable.app/vibe-coding",
      }),
    }],
  }),
  component: VibePage,
});

function VibePage() {
  const { t, lang } = useI18n();
  const { data: projects = [] } = useQuery({ queryKey: ["vibe_projects"], queryFn: fetchVibeProjects });

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

        {projects.length === 0 ? (
          <div className="glass rounded-2xl p-10 text-center text-muted-foreground">
            {t("portfolio.empty")}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((p, i) => (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group glass rounded-2xl overflow-hidden hover:shadow-elegant transition-all hover:-translate-y-1"
              >
                <div className="aspect-square overflow-hidden">
                  <img src={p.screenshot_url} alt={pick(lang, p.title_uk, p.title_en)} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-5">
                  <h3 className="font-display font-semibold text-lg">{pick(lang, p.title_uk, p.title_en)}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{pick(lang, p.description_uk, p.description_en)}</p>
                  {p.stack?.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {p.stack.map((s) => (
                        <span key={s} className="text-[11px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">{s}</span>
                      ))}
                    </div>
                  )}
                  {p.features?.length > 0 && (
                    <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
                      {p.features.map((f) => (<li key={f}>• {f}</li>))}
                    </ul>
                  )}
                  <div className="mt-4 flex items-center gap-3 text-sm">
                    {p.live_url && (
                      <a href={p.live_url} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1.5 hover:text-violet transition-colors">
                        <ExternalLink className="size-4" /> Web
                      </a>
                    )}
                    {p.github_url && (
                      <a href={p.github_url} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1.5 hover:text-violet transition-colors">
                        <Github className="size-4" /> GitHub
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
        <div className="mt-12 flex justify-center">
          <a
            href="https://github.com/kurshatsov-andrii"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-full border border-input bg-background px-6 py-3 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <ExternalLink className="size-4" />
            Більше сайтів на GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
