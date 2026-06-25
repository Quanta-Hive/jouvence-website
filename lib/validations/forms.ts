import { z } from "zod";

export const REGIONS = [
  "Adamaoua",
  "Centre",
  "Est",
  "Extrême-Nord",
  "Littoral",
  "Nord",
  "Nord-Ouest",
  "Ouest",
  "Sud",
  "Sud-Ouest",
] as const;

export const contactSchema = z.object({
  firstName: z.string().min(1).max(80),
  lastName: z.string().min(1).max(80),
  email: z.email(),
  phone: z.string().max(40).optional().or(z.literal("")),
  subject: z.string().min(1).max(120),
  message: z.string().min(1).max(5000),
});
export type ContactInput = z.infer<typeof contactSchema>;

export const membershipSchema = z.object({
  fullName: z.string().min(2).max(120),
  birthDate: z.string().min(1),
  email: z.email(),
  phone: z.string().min(4).max(40),
  region: z.string().min(1).max(60),
  city: z.string().min(1).max(80),
  profession: z.string().max(120).optional().or(z.literal("")),
  motivation: z.string().max(2000).optional().or(z.literal("")),
  documentUrl: z.url().optional().or(z.literal("")),
});
export type MembershipInput = z.infer<typeof membershipSchema>;

export const newsletterSchema = z.object({
  email: z.email(),
  locale: z.enum(["fr", "en"]).default("fr"),
});
