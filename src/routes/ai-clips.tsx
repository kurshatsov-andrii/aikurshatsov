import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ExternalLink, Play } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useI18n } from "@/lib/i18n";
import { fetchClips, pick } from "@/lib/data";
import { fetchSeo, seoMeta } from "@/lib/site-content";
import { MediaPlayerModal } from "@/components/MediaPlayerModal";

export const Route = createFileRoute("/ai-clips")({
  loader: async () => ({ seo: await fetchSeo("/ai-clips") }),
  head: ({ loaderData }) =>
    seoMeta(
      loaderData?.seo ?? null,
      "ШІ кліпи — Куршацов Андрій",
      "AI-згенеровані музичні кліпи для артистів і брендів.",
      "/ai-clips"
    ),
  component: ClipsPage,
});

function ClipsPage() {
  const { t, lang } = useI18n();
  const { data: clips = [] } = useQuery({ queryKey: ["clips"], queryFn: fetchClips });
  const [player, setPlayer] = useState<{ url: string; title: string } | null>(null);

  return (
    <>
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <header className="mb-12">
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
              {t("portfolio.tab.clips")}
            </div>
            <h1 className="font-display text-5xl sm:text-6xl font-semibold tracking-tight">
              <span className="text-gradient">{t("page.clips.h1a")}</span> {t("page.clips.h1b")}
            </h1>
            <p className="mt-3 text-muted-foreground max-w-xl">{t("portfolio.subtitle")}</p>
          </header>

          {clips.length === 0 ? (
            <div className="glass rounded-2xl p-10 text-center text-muted-foreground">
              {t("portfolio.empty")}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {clips.map((c, i) => (
                <motion.article
                  key={c.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="group glass rounded-2xl overflow-hidden hover:shadow-elegant transition-all hover:-translate-y-1"
                >
                  <button
                    type="button"
                    onClick={() => c.video_url && setPlayer({ url: c.video_url, title: pick(lang, c.title_uk, c.title_en) })}
                    disabled={!c.video_url}
                    className="w-full text-left disabled:cursor-not-allowed"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img src={c.thumbnail_url} alt={pick(lang, c.title_uk, c.title_en)} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <span className="absolute top-3 left-3 glass rounded-full px-2.5 py-1 text-[11px]">{c.platform}</span>
                      <span className="absolute inset-0 m-auto size-14 rounded-full bg-foreground/90 text-background grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="size-6 ml-0.5" />
                      </span>
                    </div>
                    <div className="p-5">
                      {c.artist && <div className="text-xs text-muted-foreground">{c.artist}</div>}
                      <h3 className="font-display font-semibold text-lg mt-0.5">{pick(lang, c.title_uk, c.title_en)}</h3>
                      <p className="mt-1.5 text-sm text-muted-foreground">{pick(lang, c.description_uk, c.description_en)}</p>
                    </div>
                  </button>
                </motion.article>
              ))}
            </div>
        )}
        <div className="mt-12 flex justify-center">
          <a
            href="https://www.youtube.com/@aigurtfartlek"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-full border border-input bg-background px-6 py-3 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <ExternalLink className="size-4" />
            Быльше кліпів на Yuotube
          </a>
        </div>
      </div>
    </section>
      <MediaPlayerModal
        open={!!player}
        onClose={() => setPlayer(null)}
        kind="video"
        url={player?.url ?? ""}
        title={player?.title}
      />
    </>
  );
}
