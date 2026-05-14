import { useEffect, useRef, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Upload } from "lucide-react";
import { toast } from "sonner";

export type KVField =
  | { name: string; label: string; type: "text" | "textarea" | "tags" }
  | { name: string; label: string; type: "image"; folder: string };

type Props = {
  contentKey: string;
  title: string;
  description?: string;
  fields: KVField[];
};

export function KeyValueEditor({ contentKey, title, description, fields }: Props) {
  const qc = useQueryClient();
  const [val, setVal] = useState<Record<string, any>>({});

  const { data, isLoading } = useQuery({
    queryKey: ["site_content", contentKey],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from("site_content")
        .select("value")
        .eq("key", contentKey)
        .maybeSingle();
      if (error) throw error;
      return (data?.value ?? {}) as Record<string, any>;
    },
  });

  useEffect(() => {
    if (data) setVal(data);
  }, [data]);

  const save = useMutation({
    mutationFn: async () => {
      const { error } = await (supabase as any)
        .from("site_content")
        .upsert({ key: contentKey, value: val }, { onConflict: "key" });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["site_content", contentKey] });
      toast.success("Збережено");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const set = (k: string, v: any) => setVal((p) => ({ ...p, [k]: v }));

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-3xl font-semibold tracking-tight">{title}</h1>
        {description && <p className="text-muted-foreground mt-1 text-sm">{description}</p>}
      </div>

      {isLoading ? (
        <div className="text-muted-foreground">Завантаження…</div>
      ) : (
        <div className="glass rounded-2xl p-6 space-y-4 max-w-3xl">
          {fields.map((f) => (
            <div key={f.name}>
              <Label htmlFor={f.name}>{f.label}</Label>
              {f.type === "textarea" ? (
                <Textarea
                  id={f.name}
                  rows={4}
                  className="mt-1"
                  value={String(val[f.name] ?? "")}
                  onChange={(e) => set(f.name, e.target.value)}
                />
              ) : f.type === "tags" ? (
                <Input
                  id={f.name}
                  className="mt-1"
                  placeholder="tag1, tag2"
                  value={(Array.isArray(val[f.name]) ? val[f.name] : []).join(", ")}
                  onChange={(e) =>
                    set(
                      f.name,
                      e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                    )
                  }
                />
              ) : f.type === "image" ? (
                <ImageInput
                  value={String(val[f.name] ?? "")}
                  onChange={(v) => set(f.name, v)}
                  folder={f.folder}
                />
              ) : (
                <Input
                  id={f.name}
                  className="mt-1"
                  value={String(val[f.name] ?? "")}
                  onChange={(e) => set(f.name, e.target.value)}
                />
              )}
            </div>
          ))}

          <div className="pt-2">
            <Button onClick={() => save.mutate()} disabled={save.isPending}>
              {save.isPending && <Loader2 className="size-4 mr-2 animate-spin" />}
              Зберегти
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function ImageInput({ value, onChange, folder }: { value: string; onChange: (v: string) => void; folder: string }) {
  const ref = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const upload = async (file: File) => {
    setBusy(true);
    try {
      const ext = file.name.split(".").pop() ?? "bin";
      const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error } = await supabase.storage.from("media").upload(path, file);
      if (error) throw error;
      const { data } = supabase.storage.from("media").getPublicUrl(path);
      onChange(data.publicUrl);
      toast.success("Файл завантажено");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Помилка");
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="mt-1 space-y-2">
      <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder="URL або завантаж файл" />
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const f = e.dataTransfer.files?.[0];
          if (f) upload(f);
        }}
        onClick={() => ref.current?.click()}
        className="border-2 border-dashed border-border rounded-lg p-4 text-center text-sm text-muted-foreground hover:border-foreground/30 cursor-pointer"
      >
        {busy ? (
          <span className="inline-flex items-center gap-2"><Loader2 className="size-4 animate-spin" /> Завантаження…</span>
        ) : (
          <span className="inline-flex items-center gap-2"><Upload className="size-4" /> Перетягни файл або клацни</span>
        )}
        <input
          ref={ref}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) upload(f);
            e.target.value = "";
          }}
        />
      </div>
      {value && <img src={value} alt="" className="h-32 rounded-lg object-cover" />}
    </div>
  );
}
