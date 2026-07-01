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

export const contributionTypeEnum = z.enum([
  "COTISATION",
  "DON_FINANCIER",
  "DON_EN_NATURE",
  "AUTRE",
]);

export const paymentModeEnum = z.enum([
  "ESPECES",
  "MOBILE_MONEY",
  "VIREMENT",
  "CHEQUE",
  "AUTRE",
]);

export const contributorKindEnum = z.enum(["MEMBRE", "NON_MEMBRE"]);

export const cameroonRegionEnum = z.enum([
  "ADAMAOUA",
  "CENTRE",
  "EST",
  "EXTREME_NORD",
  "LITTORAL",
  "NORD",
  "NORD_OUEST",
  "OUEST",
  "SUD",
  "SUD_OUEST",
]);

export const contributionSchema = z
  .object({
    date: z.coerce.date(),
    contributorKind: contributorKindEnum,
    matricule: z.string().max(60).nullable().default(null),
    contributorName: z.string().min(2).max(160),
    type: contributionTypeEnum,
    amount: z.coerce.number().int().min(0).default(0),
    estimatedValue: z.coerce.number().int().min(0).nullable().default(null),
    description: z.string().max(400).default(""),
    paymentMode: paymentModeEnum,
    collectedBy: z.string().max(120).default(""),
    receiptNumber: z.string().max(60).nullable().default(null),
    region: cameroonRegionEnum.nullable().default(null),
    comments: z.string().max(1000).default(""),
  })
  .superRefine((data, ctx) => {
    if (data.contributorKind === "MEMBRE" && !data.matricule?.trim()) {
      ctx.addIssue({
        code: "custom",
        path: ["matricule"],
        message: "Matricule requis pour un membre",
      });
    }
    if (data.type === "DON_EN_NATURE") {
      if (!data.estimatedValue || data.estimatedValue <= 0) {
        ctx.addIssue({
          code: "custom",
          path: ["estimatedValue"],
          message: "Valeur estimée requise pour un don en nature",
        });
      }
    } else if (data.amount <= 0) {
      ctx.addIssue({
        code: "custom",
        path: ["amount"],
        message: "Montant requis",
      });
    }
  });
export type ContributionInput = z.infer<typeof contributionSchema>;

export const userRoleEnum = z.enum(["ADMIN", "COMMUNITY_MANAGER", "TREASURY"]);

export const createUserSchema = z.object({
  email: z.string().email().max(190),
  name: z.string().min(2).max(120),
  password: z.string().min(8).max(200),
  role: userRoleEnum,
});
export type CreateUserInput = z.infer<typeof createUserSchema>;

export const updateUserSchema = z.object({
  name: z.string().min(2).max(120),
  role: userRoleEnum,
  password: z.string().min(8).max(200).optional().or(z.literal("")),
});
export type UpdateUserInput = z.infer<typeof updateUserSchema>;

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
