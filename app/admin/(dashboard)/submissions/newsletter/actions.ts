"use server";

import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function deleteSubscriber(id: string) {
  await requireRole("ADMIN", "COMMUNITY_MANAGER");
  await prisma.newsletterSubscriber.delete({ where: { id } });
  revalidatePath("/admin/submissions/newsletter");
}
