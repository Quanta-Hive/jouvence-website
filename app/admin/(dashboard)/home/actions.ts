"use server";

import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/auth";
import { saveHomeContent } from "@/lib/site-settings";
import { homeContentSchema, type HomeContent } from "@/lib/validations/site-settings";

async function requireUser() {
  await requireRole("ADMIN", "COMMUNITY_MANAGER");
}

export type ActionState = { ok: boolean; error?: string };

export async function updateHomeContent(input: HomeContent): Promise<ActionState> {
  await requireUser();
  const parsed = homeContentSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }
  try {
    await saveHomeContent(parsed.data);
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Erreur" };
  }
  revalidatePath("/admin/home");
  revalidatePath("/fr");
  revalidatePath("/en");
  return { ok: true };
}
