import { createFileRoute } from "@tanstack/react-router";
import { Courses } from "@/components/sections/Courses";
import { fetchSeo, seoMeta } from "@/lib/site-content";

export const Route = createFileRoute("/courses")({
  loader: async () => ({ seo: await fetchSeo("/courses") }),
  head: ({ loaderData }) =>
    seoMeta(
      loaderData?.seo ?? null,
      "Курси — Куршацов Андрій",
      "AI-курси: створи пісню та кліп з ШІ, створи рекламу бренду з ШІ.",
      "/courses"
    ),
  component: () => <Courses />,
});
