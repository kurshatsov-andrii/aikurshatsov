import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Music, Play } from "lucide-react";
import { songs } from "@/lib/portfolio-data";
import { useI18n } from "@/lib/i18n";
import { fetchSeo, seoMeta } from "@/lib/site-content";

export const Route = createFileRoute("/ai-songs")({
  loader: async () => ({ seo: await fetchSeo("/ai-songs") }),
  head: ({ loaderData }) =>
    seoMeta(
      loaderData?.seo ?? null,
      "AI музика — Куршацов Андрій",
      "AI-згенеровані пісні: synthwave, electronic, lo-fi pop.",
      "/ai-songs"
    ),
  component: AiSongsPage,
});

function AiSongsPage() {
  const { t, lang } = useI18n();
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <header className="mb-12">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
            {t("portfolio.tab.songs")}
          </div>
          <h1 className="font-display text-5xl sm:text-6xl font-semibold tracking-tight">
            <span className="text-gradient">{t("page.songs.h1a")}</span> {t("page.songs.h1b")}
          </h1>
          <p className="mt-3 text-muted-foreground max-w-xl">{t("portfolio.subtitle")}</p>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {songs.map((s, i) => (
            <motion.article
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group glass rounded-2xl overflow-hidden hover:shadow-elegant transition-all hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={s.cover} alt={s.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <button aria-label="Play" className="absolute bottom-4 left-4 size-12 rounded-full bg-foreground text-background grid place-items-center hover:scale-110 transition-transform">
                  <Play className="size-5 ml-0.5" />
                </button>
                <span className="absolute top-3 right-3 glass rounded-full px-2.5 py-1 text-[11px] flex items-center gap-1">
                  <Music className="size-3" /> {s.genre}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-display font-semibold text-lg">{s.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{s.description[lang]}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {s.tags.map((tg) => (
                    <span key={tg} className="text-[11px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">{tg}</span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
