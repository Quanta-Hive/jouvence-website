"use client";

import { useRef, useState } from "react";
import { Upload, X } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Props = {
  value?: string | null;
  onChange: (url: string | null) => void;
  label?: string;
  className?: string;
};

export function ImageUploader({ value, onChange, label = "Image", className }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFile(file: File) {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error ?? "Upload failed");
      onChange(json.url);
      toast.success("Image téléversée");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Échec du téléversement");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className={cn("space-y-3", className)}>
      <div className="text-sm font-medium text-brand-navy/70">{label}</div>
      {value ? (
        <div className="group relative overflow-hidden rounded-xl border border-brand-navy/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="" className="h-48 w-full object-cover" />
          <button
            type="button"
            onClick={() => onChange(null)}
            className="absolute right-2 top-2 rounded-full bg-white/90 p-1.5 shadow-md hover:bg-white"
            aria-label="Remove image"
          >
            <X size={16} className="text-brand-navy" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex h-48 w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-brand-navy/15 bg-brand-surface text-sm text-brand-navy/50 transition-colors hover:border-brand-blue/40 hover:text-brand-blue disabled:opacity-60"
        >
          <Upload size={22} />
          {uploading ? "Téléversement…" : "Cliquez pour choisir une image"}
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) void handleFile(file);
        }}
      />
    </div>
  );
}
