import { useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Upload, Loader2 } from "lucide-react";
import { toast } from "sonner";

export type FieldType = "text" | "textarea" | "number" | "url" | "tags" | "image" | "audio" | "select";

export type Field = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: string[];
  placeholder?: string;
};

type Row = Record<string, unknown> & { id: string };

type Props = {
  table: string;
  title: string;
  fields: Field[];
  primaryColumn: string;
  storageFolder: string;
};

export function ResourceManager({ table, title, fields, primaryColumn, storageFolder }: Props) {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<Row | null>(null);
  const [open, setOpen] = useState(false);

  const { data: rows = [], isLoading } = useQuery({
    queryKey: [table],
    queryFn: async () => {
      const { data, error } = await supabase
        .from(table)
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return (data ?? []) as Row[];
    },
  });

  const upsert = useMutation({
    mutationFn: async (payload: Row) => {
      const { id, ...rest } = payload;
      if (id) {
        const { error } = await supabase.from(table).update(rest).eq("id", id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from(table).insert(rest);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [table] });
      setOpen(false);
      setEditing(null);
      toast.success("Збережено");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from(table).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [table] });
      toast.success("Видалено");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const startNew = () => {
    const blank: Row = { id: "" } as Row;
    fields.forEach((f) => {
      blank[f.name] = f.type === "tags" ? [] : f.type === "number" ? 0 : "";
    });
    blank["sort_order"] = (rows[rows.length - 1]?.sort_order as number ?? 0) + 10;
    setEditing(blank);
    setOpen(true);
  };

  const startEdit = (row: Row) => {
    setEditing({ ...row });
    setOpen(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight">{title}</h1>
          <p className="text-muted-foreground mt-1 text-sm">Усього: {rows.length}</p>
        </div>
        <Button onClick={startNew}>
          <Plus className="size-4 mr-2" /> Додати
        </Button>
      </div>

      {isLoading ? (
        <div className="text-muted-foreground">Завантаження…</div>
      ) : rows.length === 0 ? (
        <div className="glass rounded-2xl p-8 text-center text-muted-foreground">
          Поки порожньо. Додай перший запис.
        </div>
      ) : (
        <div className="space-y-2">
          {rows.map((row) => (
            <div key={row.id} className="glass rounded-xl p-4 flex items-center gap-4">
              {(row.cover_url || row.thumbnail_url || row.screenshot_url || row.image_url || row.avatar_url) ? (
                <img
                  src={String(row.cover_url || row.thumbnail_url || row.screenshot_url || row.image_url || row.avatar_url)}
                  alt=""
                  className="size-14 rounded-lg object-cover bg-secondary"
                />
              ) : (
                <div className="size-14 rounded-lg bg-secondary grid place-items-center text-xs text-muted-foreground">
                  —
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{String(row[primaryColumn] ?? "—")}</div>
                <div className="text-xs text-muted-foreground">#{String(row.sort_order ?? 0)}</div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => startEdit(row)}>
                <Pencil className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  if (confirm("Видалити запис?")) remove.mutate(row.id);
                }}
              >
                <Trash2 className="size-4 text-destructive" />
              </Button>
            </div>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={(v) => { if (!v) { setOpen(false); setEditing(null); } }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing?.id ? "Редагувати" : "Новий запис"}</DialogTitle>
          </DialogHeader>
          {editing && (
            <FormBody
              fields={fields}
              row={editing}
              storageFolder={storageFolder}
              onChange={setEditing}
            />
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => { setOpen(false); setEditing(null); }}>
              Скасувати
            </Button>
            <Button
              onClick={() => editing && upsert.mutate(editing)}
              disabled={upsert.isPending}
            >
              {upsert.isPending && <Loader2 className="size-4 mr-2 animate-spin" />}
              Зберегти
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function FormBody({
  fields,
  row,
  storageFolder,
  onChange,
}: {
  fields: Field[];
  row: Row;
  storageFolder: string;
  onChange: (r: Row) => void;
}) {
  const set = (name: string, val: unknown) => onChange({ ...row, [name]: val });

  return (
    <div className="space-y-4">
      {fields.map((f) => (
        <div key={f.name}>
          <Label htmlFor={f.name}>
            {f.label}
            {f.required && <span className="text-destructive ml-1">*</span>}
          </Label>
          <FieldInput field={f} value={row[f.name]} onChange={(v) => set(f.name, v)} storageFolder={storageFolder} />
        </div>
      ))}
      <div>
        <Label htmlFor="sort_order">Порядок</Label>
        <Input
          id="sort_order"
          type="number"
          value={Number(row.sort_order ?? 0)}
          onChange={(e) => set("sort_order", Number(e.target.value))}
          className="mt-1"
        />
      </div>
    </div>
  );
}

function FieldInput({
  field,
  value,
  onChange,
  storageFolder,
}: {
  field: Field;
  value: unknown;
  onChange: (v: unknown) => void;
  storageFolder: string;
}) {
  if (field.type === "textarea") {
    return (
      <Textarea
        id={field.name}
        value={String(value ?? "")}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
        rows={3}
        className="mt-1"
      />
    );
  }
  if (field.type === "tags") {
    const arr = Array.isArray(value) ? (value as string[]) : [];
    return (
      <Input
        id={field.name}
        value={arr.join(", ")}
        onChange={(e) =>
          onChange(
            e.target.value
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          )
        }
        placeholder="tag1, tag2"
        className="mt-1"
      />
    );
  }
  if (field.type === "select") {
    return (
      <select
        id={field.name}
        value={String(value ?? "")}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
      >
        {field.options?.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    );
  }
  if (field.type === "image" || field.type === "audio") {
    return (
      <FileField
        accept={field.type === "image" ? "image/*" : "audio/*"}
        value={String(value ?? "")}
        onChange={onChange}
        folder={`${storageFolder}/${field.name}`}
      />
    );
  }
  return (
    <Input
      id={field.name}
      type={field.type === "number" ? "number" : "text"}
      value={field.type === "number" ? Number(value ?? 0) : String(value ?? "")}
      onChange={(e) =>
        onChange(field.type === "number" ? Number(e.target.value) : e.target.value)
      }
      placeholder={field.placeholder}
      className="mt-1"
    />
  );
}

function FileField({
  accept,
  value,
  onChange,
  folder,
}: {
  accept: string;
  value: string;
  onChange: (v: string) => void;
  folder: string;
}) {
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = async (file: File) => {
    setBusy(true);
    try {
      const ext = file.name.split(".").pop() ?? "bin";
      const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error } = await supabase.storage.from("media").upload(path, file, { upsert: false });
      if (error) throw error;
      const { data } = supabase.storage.from("media").getPublicUrl(path);
      onChange(data.publicUrl);
      toast.success("Файл завантажено");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Помилка завантаження");
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
          const file = e.dataTransfer.files?.[0];
          if (file) upload(file);
        }}
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-border rounded-lg p-4 text-center text-sm text-muted-foreground hover:border-foreground/30 cursor-pointer transition-colors"
      >
        {busy ? (
          <span className="inline-flex items-center gap-2"><Loader2 className="size-4 animate-spin" /> Завантаження…</span>
        ) : (
          <span className="inline-flex items-center gap-2"><Upload className="size-4" /> Перетягни файл або клацни</span>
        )}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) upload(file);
            e.target.value = "";
          }}
        />
      </div>
      {value && accept.startsWith("image") && (
        <img src={value} alt="preview" className="h-24 rounded-lg object-cover" />
      )}
      {value && accept.startsWith("audio") && (
        <audio src={value} controls className="w-full" />
      )}
    </div>
  );
}
