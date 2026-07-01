"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/db";
import {
  contributionSchema,
  type ContributionInput,
} from "@/lib/validations/admin";

async function requireUser() {
  await requireRole("ADMIN", "TREASURY");
}

export type ActionState = { ok: boolean; error?: string };

function toRecord(data: ContributionInput) {
  const isInKind = data.type === "DON_EN_NATURE";
  return {
    date: data.date,
    contributorKind: data.contributorKind,
    matricule: data.matricule?.trim() ? data.matricule.trim() : null,
    contributorName: data.contributorName.trim(),
    type: data.type,
    amount: isInKind ? 0 : data.amount,
    estimatedValue: isInKind ? (data.estimatedValue ?? 0) : null,
    description: data.description,
    paymentMode: data.paymentMode,
    collectedBy: data.collectedBy,
    receiptNumber: data.receiptNumber?.trim() ? data.receiptNumber.trim() : null,
    region: data.region,
    comments: data.comments,
  };
}

export async function createContribution(
  input: ContributionInput,
): Promise<ActionState> {
  await requireUser();
  const parsed = contributionSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }
  try {
    await prisma.contribution.create({ data: toRecord(parsed.data) });
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Erreur" };
  }
  revalidatePath("/admin/contributions");
  redirect("/admin/contributions");
}

export async function updateContribution(
  id: string,
  input: ContributionInput,
): Promise<ActionState> {
  await requireUser();
  const parsed = contributionSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }
  try {
    await prisma.contribution.update({
      where: { id },
      data: toRecord(parsed.data),
    });
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Erreur" };
  }
  revalidatePath("/admin/contributions");
  redirect("/admin/contributions");
}

export async function deleteContribution(id: string) {
  await requireUser();
  await prisma.contribution.delete({ where: { id } });
  revalidatePath("/admin/contributions");
}
