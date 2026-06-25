"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { saveSiteInfo } from "@/lib/site-settings";
import { siteInfoSchema, type SiteInfo } from "@/lib/validations/site-settings";

async function requireUser() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
}

export type ActionState = { ok: boolean; error?: string };

export async function updateSiteInfo(input: SiteInfo): Promise<ActionState> {
  await requireUser();
  const parsed = siteInfoSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }
  try {
    await saveSiteInfo(parsed.data);
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Erreur" };
  }
  revalidatePath("/admin/site-info");
  revalidatePath("/fr", "layout");
  revalidatePath("/en", "layout");
  return { ok: true };
}
