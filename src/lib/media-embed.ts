export function getEmbedUrl(url: string): { type: "youtube" | "instagram" | "video" | "unknown"; src: string } {
  if (!url) return { type: "unknown", src: "" };
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");

    // YouTube
    if (host === "youtu.be") {
      const id = u.pathname.slice(1).split("/")[0];
      return { type: "youtube", src: `https://www.youtube.com/embed/${id}?autoplay=1&rel=0` };
    }
    if (host.endsWith("youtube.com")) {
      let id = u.searchParams.get("v") || "";
      if (!id) {
        const parts = u.pathname.split("/").filter(Boolean);
        const i = parts.findIndex((p) => p === "shorts" || p === "embed");
        if (i >= 0 && parts[i + 1]) id = parts[i + 1];
      }
      if (id) return { type: "youtube", src: `https://www.youtube.com/embed/${id}?autoplay=1&rel=0` };
    }

    // Instagram
    if (host.endsWith("instagram.com")) {
      const path = u.pathname.replace(/\/+$/, "");
      return { type: "instagram", src: `https://www.instagram.com${path}/embed` };
    }

    // Direct video file
    if (/\.(mp4|webm|ogg|mov)(\?|$)/i.test(u.pathname)) {
      return { type: "video", src: url };
    }
  } catch {
    // ignore
  }
  return { type: "unknown", src: url };
}
