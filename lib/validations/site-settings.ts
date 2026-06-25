import { z } from "zod";

const homeStatSchema = z.object({
  value: z.string().min(1).max(40),
  labelFr: z.string().min(1).max(120),
  labelEn: z.string().min(1).max(120),
  descFr: z.string().min(1).max(200),
  descEn: z.string().min(1).max(200),
});

const homeFigureSchema = z.object({
  value: z.string().min(1).max(40),
  labelFr: z.string().min(1).max(120),
  labelEn: z.string().min(1).max(120),
  sublabelFr: z.string().min(1).max(200),
  sublabelEn: z.string().min(1).max(200),
});

export const homeContentSchema = z.object({
  membersBadge: z.string().min(1).max(40),
  stats: z.array(homeStatSchema).length(4),
  figures: z.array(homeFigureSchema).length(8),
});

export type HomeStat = z.infer<typeof homeStatSchema>;
export type HomeFigure = z.infer<typeof homeFigureSchema>;
export type HomeContent = z.infer<typeof homeContentSchema>;

const optionalUrl = z
  .string()
  .max(500)
  .trim()
  .refine((v) => v === "" || /^https?:\/\//i.test(v), "URL invalide (http(s)://…)")
  .default("");

const socialsSchema = z.object({
  facebookUrl: optionalUrl,
  twitterUrl: optionalUrl,
  instagramUrl: optionalUrl,
  youtubeUrl: optionalUrl,
  linkedinUrl: optionalUrl,
  tiktokUrl: optionalUrl,
});

const addressSchema = z.object({
  line1: z.string().min(1).max(120),
  cityFr: z.string().min(1).max(120),
  cityEn: z.string().min(1).max(120),
});

const hourRowSchema = z.object({
  dayFr: z.string().min(1).max(80),
  dayEn: z.string().min(1).max(80),
  valueFr: z.string().min(1).max(80),
  valueEn: z.string().min(1).max(80),
});

export const siteInfoSchema = z.object({
  email: z.string().email().max(160),
  phones: z.array(z.string().min(3).max(40)).min(1).max(5),
  address: addressSchema,
  socials: socialsSchema,
  hours: z.array(hourRowSchema).min(1).max(10),
});

export type Socials = z.infer<typeof socialsSchema>;
export type Address = z.infer<typeof addressSchema>;
export type HourRow = z.infer<typeof hourRowSchema>;
export type SiteInfo = z.infer<typeof siteInfoSchema>;
