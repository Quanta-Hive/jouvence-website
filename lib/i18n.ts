import "server-only";
import { cache } from "react";
import fr from "@/messages/fr.json";
import en from "@/messages/en.json";

export const locales = ["fr", "en"] as const;
export const defaultLocale = "fr" as const;
export type Locale = (typeof locales)[number];

export type Dictionary = typeof fr;

const dictionaries: Record<Locale, Dictionary> = { fr, en };

export const getDictionary = cache((locale: Locale): Dictionary => {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
});

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "fr" || value === "en";
}

export function resolveLocale(value: string | undefined | null): Locale {
  return isLocale(value) ? value : defaultLocale;
}
