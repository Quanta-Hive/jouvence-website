"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { partyMemberSchema, type PartyMemberInput } from "@/lib/validations/admin";

async function requireUser() {
  await requireRole("ADMIN", "COMMUNITY_MANAGER");
}

export type ActionState = { ok: boolean; error?: string };

export async function createMember(input: PartyMemberInput): Promise<ActionState> {
  await requireUser();
  const parsed = partyMemberSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }
  try {
    await prisma.partyMember.create({ data: parsed.data });
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Erreur" };
  }
  revalidatePath("/admin/members");
  revalidatePath("/fr/about");
  revalidatePath("/en/about");
  revalidatePath("/fr");
  revalidatePath("/en");
  redirect("/admin/members");
}

export async function updateMember(id: string, input: PartyMemberInput): Promise<ActionState> {
  await requireUser();
  const parsed = partyMemberSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }
  try {
    await prisma.partyMember.update({ where: { id }, data: parsed.data });
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Erreur" };
  }
  revalidatePath("/admin/members");
  revalidatePath("/fr/about");
  revalidatePath("/en/about");
  revalidatePath("/fr");
  revalidatePath("/en");
  redirect("/admin/members");
}

export async function deleteMember(id: string) {
  await requireUser();
  await prisma.partyMember.delete({ where: { id } });
  revalidatePath("/admin/members");
  revalidatePath("/fr/about");
  revalidatePath("/en/about");
  revalidatePath("/fr");
  revalidatePath("/en");
}
