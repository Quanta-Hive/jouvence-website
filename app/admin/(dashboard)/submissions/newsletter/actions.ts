"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function deleteSubscriber(id: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  await prisma.newsletterSubscriber.delete({ where: { id } });
  revalidatePath("/admin/submissions/newsletter");
}
