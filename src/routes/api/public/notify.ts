import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/telegram";
const CHAT_ID = "8968369395";

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const briefSchema = z.object({
  type: z.literal("brief"),
  service: z.string().trim().min(1).max(200),
  description: z.string().trim().min(1).max(2000),
  name: z.string().trim().max(100).optional().nullable(),
  contact: z.string().trim().min(1).max(200),
  contactType: z.string().trim().min(1).max(50),
});

const contactSchema = z.object({
  type: z.literal("contact"),
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  message: z.string().trim().min(1).max(1000),
});

const payloadSchema = z.discriminatedUnion("type", [briefSchema, contactSchema]);

async function sendMessage(text: string) {
  const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
  const TELEGRAM_API_KEY = process.env.TELEGRAM_API_KEY;
  if (!LOVABLE_API_KEY || !TELEGRAM_API_KEY) {
    throw new Error("Telegram secrets are not configured");
  }
  const res = await fetch(`${GATEWAY_URL}/sendMessage`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "X-Connection-Api-Key": TELEGRAM_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });
  const data: unknown = await res.json().catch(() => ({}));
  if (!res.ok) {
    console.error("Telegram sendMessage failed", res.status, data);
    const description =
      typeof data === "object" && data && "description" in data
        ? String((data as { description?: unknown }).description)
        : `Telegram error ${res.status}`;
    throw new Error(description);
  }
}

export const Route = createFileRoute("/api/public/notify")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const raw = await request.json();
          const parsed = payloadSchema.safeParse(raw);
          if (!parsed.success) {
            return new Response(
              JSON.stringify({ ok: false, error: "invalid payload" }),
              { status: 400, headers: { "content-type": "application/json" } },
            );
          }
          const data = parsed.data;
          let text: string;
          if (data.type === "brief") {
            text =
              `🧾 <b>Новий бриф з сайту</b>\n\n` +
              `<b>Послуга:</b> ${escapeHtml(data.service)}\n` +
              `<b>Ім'я:</b> ${escapeHtml(data.name || "—")}\n` +
              `<b>Канал:</b> ${escapeHtml(data.contactType)}\n` +
              `<b>Контакт:</b> ${escapeHtml(data.contact)}\n\n` +
              `<b>Опис:</b>\n${escapeHtml(data.description)}`;
          } else {
            text =
              `✉️ <b>Нове повідомлення з форми "Написати мені"</b>\n\n` +
              `<b>Ім'я:</b> ${escapeHtml(data.name)}\n` +
              `<b>Email:</b> ${escapeHtml(data.email)}\n\n` +
              `<b>Повідомлення:</b>\n${escapeHtml(data.message)}`;
          }
          await sendMessage(text);
          return new Response(JSON.stringify({ ok: true }), {
            status: 200,
            headers: { "content-type": "application/json" },
          });
        } catch (err) {
          console.error("notify route failed", err);
          return new Response(
            JSON.stringify({ ok: false, error: err instanceof Error ? err.message : "send failed" }),
            { status: 500, headers: { "content-type": "application/json" } },
          );
        }
      },
    },
  },
});
