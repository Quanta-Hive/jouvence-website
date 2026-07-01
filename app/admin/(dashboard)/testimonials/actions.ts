"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { testimonialSchema, type TestimonialInput } from "@/lib/validations/admin";

async function requireUser() {
  await requireRole("ADMIN", "COMMUNITY_MANAGER");
}

export type ActionState = { ok: boolean; error?: string };

export async function createTestimonial(input: TestimonialInput): Promise<ActionState> {
  await requireUser();
  const parsed = testimonialSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  try {
    await prisma.testimonial.create({ data: parsed.data });
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Erreur" };
  }
  revalidatePath("/admin/testimonials");
  redirect("/admin/testimonials");
}

export async function updateTestimonial(id: string, input: TestimonialInput): Promise<ActionState> {
  await requireUser();
  const parsed = testimonialSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  try {
    await prisma.testimonial.update({ where: { id }, data: parsed.data });
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Erreur" };
  }
  revalidatePath("/admin/testimonials");
  redirect("/admin/testimonials");
}

export async function deleteTestimonial(id: string) {
  await requireUser();
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/admin/testimonials");
}
