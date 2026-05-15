import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useI18n } from "@/lib/i18n";
import { fetchTestimonials, pick } from "@/lib/data";

export function Testimonials() {
  const { t, lang } = useI18n();
  const { data: testimonials = [] } = useQuery({ queryKey: ["testimonials"], queryFn: fetchTestimonials });

  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center mb-14">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">{t("testimonials.title")}</div>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight">
            <span className="text-gradient">{t("testimonials.headline1")}</span>{t("testimonials.headline2")}
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">{t("testimonials.subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((tt, i) => (
            <motion.figure
              key={tt.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass rounded-2xl p-6 flex flex-col gap-4"
            >
              <Quote className="size-6 text-violet" />
              <blockquote className="text-base leading-relaxed">{pick(lang, tt.text_uk, tt.text_en)}</blockquote>
              <figcaption className="mt-auto pt-4 border-t border-border flex items-center gap-3">
                {tt.avatar_url ? (
                  <img
                    src={tt.avatar_url}
                    alt={tt.name}
                    loading="lazy"
                    className="size-10 rounded-full object-cover bg-secondary shrink-0"
                  />
                ) : (
                  <div className="size-10 rounded-full bg-secondary grid place-items-center text-sm font-medium shrink-0">
                    {tt.name.charAt(0)}
                  </div>
                )}
                <div className="min-w-0">
                  <div className="font-medium truncate">{tt.name}</div>
                  <div className="text-xs text-muted-foreground truncate">{pick(lang, tt.role_uk, tt.role_en)}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
