import { createFileRoute } from "@tanstack/react-router";
import { Courses } from "@/components/sections/Courses";
import { fetchSeo, seoMeta } from "@/lib/site-content";
import { fetchCourses } from "@/lib/data";

export const Route = createFileRoute("/courses")({
  loader: async () => ({
    seo: await fetchSeo("/courses"),
    courses: await fetchCourses().catch(() => []),
  }),
  head: ({ loaderData }) => ({
    ...seoMeta(
      loaderData?.seo ?? null,
      "Курси — Куршацов Андрій",
      "AI-курси: створи пісню та кліп з ШІ, створи рекламу бренду з ШІ.",
      "/courses"
    ),
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "AI-курси",
        itemListElement: (loaderData?.courses ?? []).map((c: any, i: number) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "Course",
            name: c.title_uk || c.title_en,
            description: c.description_uk || c.description_en,
            provider: {
              "@type": "Person",
              name: "Андрій Куршацов",
            },
          },
        })),
      }),
    }],
  }),
  component: () => <Courses />,
});
