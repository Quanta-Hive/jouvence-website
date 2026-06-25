"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import type { ApplicationStatus } from "@prisma/client";

async function requireUser() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
}

export async function setApplicationStatus(id: string, status: ApplicationStatus) {
  await requireUser();
  await prisma.membershipApplication.update({ where: { id }, data: { status } });
  revalidatePath("/admin/submissions/membership");
}

export async function deleteApplication(id: string) {
  await requireUser();
  await prisma.membershipApplication.delete({ where: { id } });
  revalidatePath("/admin/submissions/membership");
}
