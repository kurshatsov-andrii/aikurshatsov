import { X } from "lucide-react";
import { useEffect } from "react";
import { getEmbedUrl } from "@/lib/media-embed";

type Props = {
  open: boolean;
  onClose: () => void;
  title?: string;
  url: string;
  kind: "audio" | "video";
  cover?: string;
};

export function MediaPlayerModal({ open, onClose, title, url, kind, cover }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const embed = kind === "video" ? getEmbedUrl(url) : null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute top-4 right-4 size-10 rounded-full bg-foreground/10 hover:bg-foreground/20 text-foreground grid place-items-center"
      >
        <X className="size-5" />
      </button>

      <div
        className="relative w-full max-w-3xl glass rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {kind === "audio" ? (
          <div className="p-6 flex flex-col items-center gap-4">
            {cover && (
              <img src={cover} alt={title || ""} className="w-full max-w-sm aspect-square object-cover rounded-xl" />
            )}
            {title && <h3 className="font-display text-xl font-semibold text-center">{title}</h3>}
            {url ? (
              <audio src={url} controls autoPlay className="w-full" />
            ) : (
              <p className="text-muted-foreground text-sm">Аудіо недоступне</p>
            )}
          </div>
        ) : embed && embed.type === "youtube" ? (
          <div className="aspect-video w-full">
            <iframe
              src={embed.src}
              title={title || "video"}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : embed && embed.type === "instagram" ? (
          <div className="w-full h-[80vh]">
            <iframe src={embed.src} title={title || "video"} className="w-full h-full" allowFullScreen />
          </div>
        ) : embed && embed.type === "video" ? (
          <video src={embed.src} controls autoPlay className="w-full max-h-[80vh]" />
        ) : (
          <div className="p-6 text-center">
            <p className="text-muted-foreground text-sm mb-3">Не вдалося відтворити вбудовано.</p>
            {url && (
              <a href={url} target="_blank" rel="noreferrer noopener" className="underline">
                Відкрити в новій вкладці
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
