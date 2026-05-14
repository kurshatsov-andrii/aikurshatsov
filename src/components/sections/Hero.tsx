import { motion } from "framer-motion";
import { ArrowRight, GraduationCap, Mail } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { useI18n } from "@/lib/i18n";

export function Hero() {
  const { t } = useI18n();

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <img
          src={heroBg}
          alt=""
          width={1920}
          height={1080}
          fetchPriority="high"
          className="w-full h-full object-cover opacity-20 dark:opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/92 via-background/80 to-background dark:from-background/82 dark:via-background/64 dark:to-background" />
        <div className="absolute inset-x-0 top-0 h-[72%] bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--background)_88%,transparent)_0%,color-mix(in_oklab,var(--background)_66%,transparent)_42%,transparent_72%)]" />
        <div className="absolute inset-0 grid-pattern opacity-[0.05] dark:opacity-[0.08]" />
      </div>

      {/* Floating glows */}
      <motion.div
        aria-hidden
        className="absolute -top-20 -left-20 w-[480px] h-[480px] rounded-full bg-violet/30 blur-[120px]"
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -bottom-32 -right-20 w-[520px] h-[520px] rounded-full bg-cyan/30 blur-[120px]"
        animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-6xl px-4 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs sm:text-sm hero-muted mb-8"
        >
          <span className="size-1.5 rounded-full bg-cyan animate-pulse" />
          {t("hero.role")}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="font-display font-semibold tracking-tight text-5xl sm:text-7xl lg:text-8xl leading-[0.95] hero-text-shadow"
        >
          {t("hero.lastName")} <br className="sm:hidden" />
          <span className="hero-name-accent">{t("hero.firstName")}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-6 max-w-2xl mx-auto text-base sm:text-lg hero-muted font-medium"
        >
          {t("hero.tagline")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#portfolio"
            className="group inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 sm:px-6 h-12 text-sm font-medium hover:opacity-90 transition-all hover:scale-[1.02]"
          >
            {t("hero.cta.portfolio")}
            <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
          <a
            href="#courses"
            className="inline-flex items-center gap-2 glass rounded-full px-5 sm:px-6 h-12 text-sm font-medium hover:bg-secondary/60 transition-all hover:scale-[1.02]"
          >
            <GraduationCap className="size-4" />
            {t("hero.cta.courses")}
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full px-5 sm:px-6 h-12 text-sm font-medium hover:bg-secondary/60 transition-all hover:scale-[1.02]"
          >
            <Mail className="size-4" />
            {t("hero.cta.contact")}
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px rounded-2xl glass overflow-hidden"
        >
          {[
            { n: "17+", k: "stats.web" as const },
            { n: "17+", k: "stats.seo" as const },
            { n: "10+", k: "stats.ads" as const },
            { n: "3+", k: "stats.ai" as const },
            { n: "2+", k: "stats.teach" as const },
            { n: "1+", k: "stats.vibe" as const },
          ].map((s) => (
            <div key={s.k} className="bg-background/40 px-4 py-5 text-center">
              <div className="font-display text-2xl sm:text-3xl font-semibold text-gradient">{s.n}</div>
              <div className="mt-1 text-[11px] sm:text-xs text-muted-foreground uppercase tracking-wide">
                {t(s.k)}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
