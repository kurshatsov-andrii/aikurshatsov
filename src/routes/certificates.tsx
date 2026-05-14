import { createFileRoute } from "@tanstack/react-router";
import { Certificates } from "@/components/sections/Certificates";

export const Route = createFileRoute("/certificates")({
  head: () => ({
    meta: [
      { title: "Сертифікати — Куршацов Андрій" },
      { name: "description", content: "Підтверджена експертиза в AI, відео, музиці та веб-розробці." },
      { property: "og:title", content: "Certificates — Куршацов Андрій" },
      { property: "og:url", content: "/certificates" },
    ],
    links: [{ rel: "canonical", href: "/certificates" }],
  }),
  component: () => <Certificates />,
});
