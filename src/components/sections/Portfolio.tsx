import { motion } from "framer-motion";
import { ExternalLink, Github, Music, Play } from "lucide-react";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useI18n } from "@/lib/i18n";
import { fetchSongs, fetchVideos, fetchVibeProjects, fetchClips, pick } from "@/lib/data";
import { MediaPlayerModal } from "@/components/MediaPlayerModal";

type Tab = "songs" | "video" | "clips" | "code";
type PlayerState = { open: boolean; kind: "audio" | "video"; url: string; title?: string; cover?: string };

export function Portfolio() {
  const { t, lang } = useI18n();
  const [tab, setTab] = useState<Tab>("songs");
  const [player, setPlayer] = useState<PlayerState>({ open: false, kind: "audio", url: "" });

  const { data: songs = [] } = useQuery({ queryKey: ["songs"], queryFn: fetchSongs });
  const { data: videos = [] } = useQuery({ queryKey: ["videos"], queryFn: fetchVideos });
  const { data: projects = [] } = useQuery({ queryKey: ["vibe_projects"], queryFn: fetchVibeProjects });
  const { data: clips = [] } = useQuery({ queryKey: ["clips"], queryFn: fetchClips });

  const tabs: { id: Tab; label: string }[] = [
    { id: "songs", label: t("portfolio.tab.songs") },
    { id: "video", label: t("portfolio.tab.video") },
    { id: "clips", label: t("portfolio.tab.clips") },
    { id: "code", label: t("portfolio.tab.code") },
  ];

  return (
    <section id="portfolio" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
              {t("portfolio.title")}
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight">
              {t("portfolio.headline1")} <span className="text-gradient">{t("portfolio.headline2")}</span>
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl">{t("portfolio.subtitle")}</p>
          </div>

          <div className="glass rounded-full p-1 inline-flex">
            {tabs.map((tb) => (
              <button
                key={tb.id}
                onClick={() => setTab(tb.id)}
                className={`relative px-4 sm:px-5 h-10 text-sm rounded-full transition-colors ${
                  tab === tb.id ? "text-background" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab === tb.id && (
                  <motion.span
                    layoutId="tab-bg"
                    className="absolute inset-0 bg-foreground rounded-full"
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  />
                )}
                <span className="relative">{tb.label}</span>
              </button>
            ))}
          </div>
        </div>

        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {tab === "songs" && songs.map((s) => (
            <article key={s.id} className="group glass rounded-2xl overflow-hidden hover:shadow-elegant transition-all hover:-translate-y-1">
              <div className="relative aspect-square overflow-hidden">
                <img src={s.cover_url} alt={pick(lang, s.title_uk, s.title_en)} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <button
                  aria-label="Play"
                  onClick={() => s.audio_url && setPlayer({ open: true, kind: "audio", url: s.audio_url, title: pick(lang, s.title_uk, s.title_en), cover: s.cover_url })}
                  disabled={!s.audio_url}
                  className="absolute bottom-4 left-4 size-12 rounded-full bg-foreground text-background grid place-items-center hover:scale-110 transition-transform disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Play className="size-5 ml-0.5" />
                </button>
                {s.genre && (
                  <span className="absolute top-3 right-3 glass rounded-full px-2.5 py-1 text-[11px] flex items-center gap-1">
                    <Music className="size-3" />{s.genre}
                  </span>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-display font-semibold text-lg">{pick(lang, s.title_uk, s.title_en)}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{pick(lang, s.description_uk, s.description_en)}</p>
                {s.tags?.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {s.tags.map((tg) => (
                      <span key={tg} className="text-[11px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">{tg}</span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}

          {tab === "video" && videos.map((v) => (
            <article key={v.id} className="group glass rounded-2xl overflow-hidden hover:shadow-elegant transition-all hover:-translate-y-1">
              <button
                type="button"
                onClick={() => v.video_url && setPlayer({ open: true, kind: "video", url: v.video_url, title: pick(lang, v.title_uk, v.title_en) })}
                className="block w-full text-left"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img src={v.thumbnail_url} alt={pick(lang, v.title_uk, v.title_en)} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 glass rounded-full px-2.5 py-1 text-[11px]">{v.platform}</span>
                  <span aria-label="Play" className="absolute inset-0 m-auto size-14 rounded-full bg-foreground/90 text-background grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="size-6 ml-0.5" />
                  </span>
                </div>
                <div className="p-5">
                  <div className="text-xs text-muted-foreground">{v.brand}</div>
                  <h3 className="font-display font-semibold text-lg mt-0.5">{pick(lang, v.title_uk, v.title_en)}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{pick(lang, v.description_uk, v.description_en)}</p>
                </div>
              </button>
            </article>
          ))}

          {tab === "clips" && clips.map((c) => (
            <article key={c.id} className="group glass rounded-2xl overflow-hidden hover:shadow-elegant transition-all hover:-translate-y-1">
              <button
                type="button"
                onClick={() => c.video_url && setPlayer({ open: true, kind: "video", url: c.video_url, title: pick(lang, c.title_uk, c.title_en) })}
                className="block w-full text-left"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img src={c.thumbnail_url} alt={pick(lang, c.title_uk, c.title_en)} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 glass rounded-full px-2.5 py-1 text-[11px]">{c.platform}</span>
                  <span aria-label="Play" className="absolute inset-0 m-auto size-14 rounded-full bg-foreground/90 text-background grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="size-6 ml-0.5" />
                  </span>
                </div>
                <div className="p-5">
                  {c.artist && <div className="text-xs text-muted-foreground">{c.artist}</div>}
                  <h3 className="font-display font-semibold text-lg mt-0.5">{pick(lang, c.title_uk, c.title_en)}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{pick(lang, c.description_uk, c.description_en)}</p>
                </div>
              </button>
            </article>
          ))}

          {tab === "code" && projects.map((p) => (
            <article key={p.id} className="group glass rounded-2xl overflow-hidden hover:shadow-elegant transition-all hover:-translate-y-1">
              <div className="relative aspect-square overflow-hidden">
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
                <div className="mt-4 flex items-center gap-3 text-sm">
                  {p.live_url && <a href={p.live_url} className="inline-flex items-center gap-1.5 hover:text-violet transition-colors"><ExternalLink className="size-4" /> Live</a>}
                  {p.github_url && <a href={p.github_url} className="inline-flex items-center gap-1.5 hover:text-violet transition-colors"><Github className="size-4" /> GitHub</a>}
                </div>
              </div>
            </article>
          ))}
        </motion.div>

        <div className="mt-10 text-center">
          <Link to={tab === "songs" ? "/ai-songs" : tab === "video" ? "/ai-video-ads" : tab === "clips" ? "/ai-clips" : "/vibe-coding"} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            {t("portfolio.viewAll")} →
          </Link>
        </div>
      </div>
    </section>
  );
}
