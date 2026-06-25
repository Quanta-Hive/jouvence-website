"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

async function requireUser() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  return session.user;
}

export async function updateProfile(formData: FormData) {
  const user = await requireUser();
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return { ok: false, error: "Le nom est requis" };
  await prisma.user.update({ where: { id: user.id }, data: { name } });
  revalidatePath("/admin/settings");
  return { ok: true };
}

export async function updatePassword(formData: FormData) {
  const user = await requireUser();
  const current = String(formData.get("currentPassword") ?? "");
  const next = String(formData.get("newPassword") ?? "");
  if (next.length < 8) return { ok: false, error: "Mot de passe trop court (8 caractères minimum)" };

  const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
  if (!dbUser) return { ok: false, error: "Utilisateur introuvable" };
  const matches = await bcrypt.compare(current, dbUser.hashedPassword);
  if (!matches) return { ok: false, error: "Mot de passe actuel incorrect" };

  const hashed = await bcrypt.hash(next, 12);
  await prisma.user.update({ where: { id: user.id }, data: { hashedPassword: hashed } });
  return { ok: true };
}
