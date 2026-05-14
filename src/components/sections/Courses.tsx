import { motion } from "framer-motion";
import { Sparkles, ArrowUpRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useI18n } from "@/lib/i18n";
import { fetchCourses, pick } from "@/lib/data";

const gradients = ["from-violet to-fuchsia-500", "from-cyan to-violet", "from-fuchsia-500 to-cyan"];

export function Courses() {
  const { t, lang } = useI18n();
  const { data: courses = [] } = useQuery({ queryKey: ["courses"], queryFn: fetchCourses });

  return (
    <section id="courses" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center mb-14">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">{t("courses.title")}</div>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight">
            <span className="text-gradient">Навчись створювати</span> з ШІ
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">{t("courses.subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {courses.map((c, i) => (
            <motion.a
              key={c.id}
              href={c.link_url ?? "#"}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-3xl glass p-8 sm:p-10 hover:shadow-elegant transition-all hover:-translate-y-1"
            >
              <div className={`absolute -top-24 -right-24 w-72 h-72 rounded-full bg-gradient-to-br ${gradients[i % gradients.length]} opacity-30 blur-3xl group-hover:opacity-50 transition-opacity`} />
              <div className="relative">
                <div className="flex items-center gap-2 text-xs">
                  <span className="glass rounded-full px-2.5 py-1 inline-flex items-center gap-1.5">
                    <Sparkles className="size-3" /> AI
                  </span>
                  {c.price && <span className="glass rounded-full px-2.5 py-1">{c.price}</span>}
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-semibold mt-6 leading-tight">{pick(lang, c.title_uk, c.title_en)}</h3>
                <p className="mt-3 text-muted-foreground">{pick(lang, c.description_uk, c.description_en)}</p>
                <div className="mt-8 inline-flex items-center gap-2 text-sm font-medium">
                  {t("courses.cta")}
                  <ArrowUpRight className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
