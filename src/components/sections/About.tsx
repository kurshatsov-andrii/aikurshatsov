import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import portrait from "@/assets/portrait.jpg";
import { useI18n } from "@/lib/i18n";
import { fetchSiteContent, type AboutValue } from "@/lib/site-content";

export function About() {
  const { t, lang } = useI18n();
  const { data } = useQuery({
    queryKey: ["site_content", "about"],
    queryFn: () => fetchSiteContent<AboutValue>("about"),
  });

  const photo = data?.photo_url || portrait;
  const body =
    (lang === "uk" ? data?.description_uk : data?.description_en) || t("about.body");
  const tags =
    Array.isArray(data?.tags) && data!.tags.length > 0
      ? data!.tags
      : ["Suno", "Runway", "Kling", "Midjourney", "TanStack", "Supabase"];

  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 grid lg:grid-cols-12 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-5 relative"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-elegant">
            <img
              src={photo}
              alt="Куршацов Андрій"
              loading="lazy"
              width={1024}
              height={1024}
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
          </div>
          <div aria-hidden className="absolute -inset-4 -z-10 bg-gradient-hero opacity-20 blur-2xl rounded-[2rem]" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="lg:col-span-7"
        >
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
            {t("about.title")}
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold leading-tight">
            Код + креатив. <br />
            <span className="text-gradient">Від ідеї до запуску.</span>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-xl">
            {body}
          </p>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {tags.map((tool) => (
              <div
                key={tool}
                className="glass rounded-xl px-4 py-3 text-sm text-center hover:scale-105 transition-transform"
              >
                {tool}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
