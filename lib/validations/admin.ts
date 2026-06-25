import { z } from "zod";

export const blogPostSchema = z.object({
  titleFr: z.string().min(1).max(200),
  titleEn: z.string().min(1).max(200),
  slugFr: z.string().min(1).max(120).regex(/^[a-z0-9-]+$/i, "Slug invalide"),
  slugEn: z.string().min(1).max(120).regex(/^[a-z0-9-]+$/i, "Slug invalide"),
  excerptFr: z.string().max(400).default(""),
  excerptEn: z.string().max(400).default(""),
  bodyFr: z.string().default(""),
  bodyEn: z.string().default(""),
  coverImage: z.string().nullable().default(null),
  category: z.string().min(1).max(60).default("Actualité"),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
});
export type BlogPostInput = z.infer<typeof blogPostSchema>;

export const partyMemberSchema = z.object({
  name: z.string().min(2).max(120),
  roleFr: z.string().min(2).max(120),
  roleEn: z.string().min(2).max(120),
  bioFr: z.string().max(4000).default(""),
  bioEn: z.string().max(4000).default(""),
  photoUrl: z.string().nullable().default(null),
  email: z.string().nullable().default(null),
  facebookUrl: z.string().nullable().default(null),
  twitterUrl: z.string().nullable().default(null),
  linkedinUrl: z.string().nullable().default(null),
  isLeader: z.boolean().default(false),
  isPublished: z.boolean().default(true),
  order: z.coerce.number().int().min(0).default(0),
});
export type PartyMemberInput = z.infer<typeof partyMemberSchema>;

export const testimonialSchema = z.object({
  name: z.string().min(2).max(120),
  roleFr: z.string().min(2).max(120),
  roleEn: z.string().min(2).max(120),
  quoteFr: z.string().min(2).max(800),
  quoteEn: z.string().min(2).max(800),
  photoUrl: z.string().nullable().default(null),
  isPublished: z.boolean().default(true),
  order: z.coerce.number().int().min(0).default(0),
});
export type TestimonialInput = z.infer<typeof testimonialSchema>;
