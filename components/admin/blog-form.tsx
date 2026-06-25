"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "./image-uploader";
import { RichTextEditor } from "./rich-text-editor";
import { slugify } from "@/lib/utils";
import { type BlogPostInput } from "@/lib/validations/admin";
import {
  createBlogPost,
  updateBlogPost,
  type ActionState,
} from "@/app/admin/(dashboard)/blog/actions";

type Props = {
  postId?: string;
  initial?: Partial<BlogPostInput>;
};

const CATEGORIES = ["Actualité", "Événement", "Programme", "Activité", "Partenariat", "Initiative"];

export function BlogForm({ postId, initial }: Props) {
  const router = useRouter();
  const [tab, setTab] = useState<"fr" | "en">("fr");
  const [pending, startTransition] = useTransition();

  const [titleFr, setTitleFr] = useState(initial?.titleFr ?? "");
  const [titleEn, setTitleEn] = useState(initial?.titleEn ?? "");
  const [slugFr, setSlugFr] = useState(initial?.slugFr ?? "");
  const [slugEn, setSlugEn] = useState(initial?.slugEn ?? "");
  const [excerptFr, setExcerptFr] = useState(initial?.excerptFr ?? "");
  const [excerptEn, setExcerptEn] = useState(initial?.excerptEn ?? "");
  const [bodyFr, setBodyFr] = useState(initial?.bodyFr ?? "");
  const [bodyEn, setBodyEn] = useState(initial?.bodyEn ?? "");
  const [coverImage, setCoverImage] = useState<string | null>(initial?.coverImage ?? null);
  const [category, setCategory] = useState(initial?.category ?? "Actualité");
  const [status, setStatus] = useState<"DRAFT" | "PUBLISHED">(initial?.status ?? "DRAFT");

  function autoSlug(value: string, setter: (next: string) => void) {
    if (!value) {
      setter("");
      return;
    }
    setter(slugify(value));
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const payload: BlogPostInput = {
      titleFr,
      titleEn,
      slugFr: slugFr || slugify(titleFr),
      slugEn: slugEn || slugify(titleEn),
      excerptFr,
      excerptEn,
      bodyFr,
      bodyEn,
      coverImage,
      category,
      status,
    };

    startTransition(async () => {
      let result: ActionState | undefined;
      try {
        result = postId
          ? await updateBlogPost(postId, payload)
          : await createBlogPost(payload);
      } catch {
        toast.success(postId ? "Article mis à jour" : "Article créé");
        return;
      }
      if (result && !result.ok) {
        toast.error(result.error ?? "Échec de l'enregistrement");
      }
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6 rounded-2xl border border-brand-navy/5 bg-white p-6 shadow-sm">
          <div className="flex gap-1 rounded-lg bg-brand-surface p-1">
            {(["fr", "en"] as const).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setTab(lang)}
                className={`flex-1 rounded-md px-4 py-2 font-display text-sm font-semibold transition-colors ${
                  tab === lang ? "bg-white text-brand-navy shadow-sm" : "text-brand-navy/60 hover:text-brand-navy"
                }`}
              >
                {lang === "fr" ? "Français" : "English"}
              </button>
            ))}
          </div>

          {tab === "fr" ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Titre (FR)</Label>
                <Input
                  value={titleFr}
                  onChange={(e) => {
                    setTitleFr(e.target.value);
                    if (!postId) autoSlug(e.target.value, setSlugFr);
                  }}
                  placeholder="Ex. Lancement officiel…"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Slug (FR)</Label>
                <Input value={slugFr} onChange={(e) => setSlugFr(e.target.value)} placeholder="lancement-officiel" required />
              </div>
              <div className="space-y-2">
                <Label>Extrait (FR)</Label>
                <Textarea value={excerptFr} onChange={(e) => setExcerptFr(e.target.value)} rows={3} placeholder="Court résumé visible dans la liste des articles." />
              </div>
              <div className="space-y-2">
                <Label>Contenu (FR)</Label>
                <RichTextEditor value={bodyFr} onChange={setBodyFr} placeholder="Rédigez l'article en français…" />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Title (EN)</Label>
                <Input
                  value={titleEn}
                  onChange={(e) => {
                    setTitleEn(e.target.value);
                    if (!postId) autoSlug(e.target.value, setSlugEn);
                  }}
                  placeholder="E.g. Official launch…"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Slug (EN)</Label>
                <Input value={slugEn} onChange={(e) => setSlugEn(e.target.value)} placeholder="official-launch" required />
              </div>
              <div className="space-y-2">
                <Label>Excerpt (EN)</Label>
                <Textarea value={excerptEn} onChange={(e) => setExcerptEn(e.target.value)} rows={3} placeholder="Short summary shown on the news list." />
              </div>
              <div className="space-y-2">
                <Label>Body (EN)</Label>
                <RichTextEditor value={bodyEn} onChange={setBodyEn} placeholder="Write the article in English…" />
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-brand-navy/5 bg-white p-6 shadow-sm">
            <ImageUploader label="Image de couverture" value={coverImage} onChange={setCoverImage} />
          </div>

          <div className="space-y-4 rounded-2xl border border-brand-navy/5 bg-white p-6 shadow-sm">
            <div className="space-y-2">
              <Label>Catégorie</Label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-brand-navy/10 bg-brand-surface px-4 py-3 text-sm focus:border-brand-blue focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label>Statut</Label>
              <div className="flex gap-2">
                {(["DRAFT", "PUBLISHED"] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStatus(s)}
                    className={`flex-1 rounded-lg px-3 py-2 font-display text-xs font-semibold transition-colors ${
                      status === s
                        ? s === "PUBLISHED"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-brand-navy/10 text-brand-navy"
                        : "bg-brand-surface text-brand-navy/50 hover:text-brand-navy"
                    }`}
                  >
                    {s === "PUBLISHED" ? "Publié" : "Brouillon"}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Button type="submit" disabled={pending} className="w-full" size="lg">
              {pending ? "Enregistrement…" : postId ? "Mettre à jour" : "Créer l'article"}
            </Button>
            <Button type="button" variant="outline" className="w-full" onClick={() => router.push("/admin/blog")}>
              Annuler
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
