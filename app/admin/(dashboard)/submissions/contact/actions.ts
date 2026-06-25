"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

async function requireUser() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
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
