import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/telegram";
const CHAT_ID = "8968369395";

async function sendMessage(text: string) {
  const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
  if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");
  const TELEGRAM_API_KEY = process.env.TELEGRAM_API_KEY;
  if (!TELEGRAM_API_KEY) throw new Error("TELEGRAM_API_KEY is not configured");

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

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    console.error("Telegram sendMessage failed", res.status, data);
    throw new Error(`Telegram error ${res.status}`);
  }
  return { ok: true };
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export const sendBriefToTelegram = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z
      .object({
        service: z.string().trim().min(1).max(200),
        description: z.string().trim().min(1).max(2000),
        name: z.string().trim().max(100).optional().nullable(),
        contact: z.string().trim().min(1).max(200),
        contactType: z.string().trim().min(1).max(50),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    const text =
      `🧾 <b>Новий бриф з сайту</b>\n\n` +
      `<b>Послуга:</b> ${escapeHtml(data.service)}\n` +
      `<b>Ім'я:</b> ${escapeHtml(data.name || "—")}\n` +
      `<b>Канал:</b> ${escapeHtml(data.contactType)}\n` +
      `<b>Контакт:</b> ${escapeHtml(data.contact)}\n\n` +
      `<b>Опис:</b>\n${escapeHtml(data.description)}`;
    return sendMessage(text);
  });

export const sendContactToTelegram = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z
      .object({
        name: z.string().trim().min(1).max(100),
        email: z.string().trim().email().max(255),
        message: z.string().trim().min(1).max(1000),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    const text =
      `✉️ <b>Нове повідомлення з форми "Написати мені"</b>\n\n` +
      `<b>Ім'я:</b> ${escapeHtml(data.name)}\n` +
      `<b>Email:</b> ${escapeHtml(data.email)}\n\n` +
      `<b>Повідомлення:</b>\n${escapeHtml(data.message)}`;
    return sendMessage(text);
  });
