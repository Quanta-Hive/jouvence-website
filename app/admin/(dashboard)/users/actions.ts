"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { Prisma } from "@prisma/client";
import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/db";
import {
  createUserSchema,
  updateUserSchema,
  type CreateUserInput,
  type UpdateUserInput,
} from "@/lib/validations/admin";

export type ActionState = { ok: boolean; error?: string };

async function lastAdminGuard(targetUserId: string) {
  const adminCount = await prisma.user.count({ where: { role: "ADMIN" } });
  if (adminCount > 1) return null;
  const target = await prisma.user.findUnique({
    where: { id: targetUserId },
    select: { role: true },
  });
  if (target?.role !== "ADMIN") return null;
  return "Impossible : il faut au moins un administrateur.";
}

export async function createUser(input: CreateUserInput): Promise<ActionState> {
  await requireRole("ADMIN");
  const parsed = createUserSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }
  const { email, name, password, role } = parsed.data;
  const hashedPassword = await bcrypt.hash(password, 12);
  try {
    await prisma.user.create({
      data: {
        email: email.trim().toLowerCase(),
        name: name.trim(),
        hashedPassword,
        role,
      },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return { ok: false, error: "Un compte avec cet email existe déjà." };
    }
    return { ok: false, error: error instanceof Error ? error.message : "Erreur" };
  }
  revalidatePath("/admin/users");
  redirect("/admin/users");
}

export async function updateUser(
  id: string,
  input: UpdateUserInput,
): Promise<ActionState> {
  const session = await requireRole("ADMIN");
  const parsed = updateUserSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }
  const { name, role, password } = parsed.data;

  // Prevent demoting yourself from ADMIN
  if (session.user.id === id && role !== "ADMIN") {
    return { ok: false, error: "Vous ne pouvez pas modifier votre propre rôle." };
  }
  // Don't allow demoting the last ADMIN
  if (role !== "ADMIN") {
    const block = await lastAdminGuard(id);
    if (block) return { ok: false, error: block };
  }

  const data: Prisma.UserUpdateInput = { name: name.trim(), role };
  if (password && password.length >= 8) {
    data.hashedPassword = await bcrypt.hash(password, 12);
  }

  try {
    await prisma.user.update({ where: { id }, data });
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Erreur" };
  }
  revalidatePath("/admin/users");
  redirect("/admin/users");
}

export async function deleteUser(id: string): Promise<ActionState> {
  const session = await requireRole("ADMIN");
  if (session.user.id === id) {
    return { ok: false, error: "Vous ne pouvez pas supprimer votre propre compte." };
  }
  const block = await lastAdminGuard(id);
  if (block) return { ok: false, error: block };

  try {
    await prisma.user.delete({ where: { id } });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2003"
    ) {
      return {
        ok: false,
        error: "Impossible : cet utilisateur a des données associées (articles).",
      };
    }
    return { ok: false, error: error instanceof Error ? error.message : "Erreur" };
  }
  revalidatePath("/admin/users");
  return { ok: true };
}
