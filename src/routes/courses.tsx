import { createFileRoute } from "@tanstack/react-router";
import { Courses } from "@/components/sections/Courses";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "Курси — Куршацов Андрій" },
      { name: "description", content: "AI-курси: створи пісню та кліп з ШІ, створи рекламу бренду з ШІ." },
      { property: "og:title", content: "AI Courses — Куршацов Андрій" },
      { property: "og:url", content: "/courses" },
    ],
    links: [{ rel: "canonical", href: "/courses" }],
  }),
  component: () => <Courses />,
});
