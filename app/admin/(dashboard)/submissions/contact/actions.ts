"use server";

import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/db";

async function requireUser() {
  await requireRole("ADMIN", "COMMUNITY_MANAGER");
}

export async function markContactRead(id: string, isRead: boolean) {
  await requireUser();
  await prisma.contactMessage.update({ where: { id }, data: { isRead } });
  revalidatePath("/admin/submissions/contact");
}

export async function deleteContact(id: string) {
  await requireUser();
  await prisma.contactMessage.delete({ where: { id } });
  revalidatePath("/admin/submissions/contact");
}
