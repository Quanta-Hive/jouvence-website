"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { blogPostSchema, type BlogPostInput } from "@/lib/validations/admin";

async function requireUser() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  return session.user;
}

export type ActionState = {
  ok: boolean;
  error?: string;
};

export async function createBlogPost(input: BlogPostInput): Promise<ActionState> {
  const user = await requireUser();
  const parsed = blogPostSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const data = parsed.data;
  try {
    await prisma.blogPost.create({
      data: {
        ...data,
        coverImage: data.coverImage,
        authorId: user.id,
        publishedAt: data.status === "PUBLISHED" ? new Date() : null,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erreur de création";
    return { ok: false, error: message };
  }

  revalidatePath("/admin/blog");
  revalidatePath("/fr/news");
  revalidatePath("/en/news");
  redirect("/admin/blog");
}

export async function updateBlogPost(id: string, input: BlogPostInput): Promise<ActionState> {
  await requireUser();
  const parsed = blogPostSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const data = parsed.data;
  try {
    const existing = await prisma.blogPost.findUnique({ where: { id } });
    if (!existing) return { ok: false, error: "Introuvable" };

    const willPublish = data.status === "PUBLISHED";
    const wasPublished = existing.status === "PUBLISHED";

    await prisma.blogPost.update({
      where: { id },
      data: {
        ...data,
        publishedAt: willPublish ? existing.publishedAt ?? new Date() : wasPublished ? existing.publishedAt : null,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erreur";
    return { ok: false, error: message };
  }

  revalidatePath("/admin/blog");
  revalidatePath("/fr/news");
  revalidatePath("/en/news");
  redirect("/admin/blog");
}

export async function deleteBlogPost(id: string) {
  await requireUser();
  await prisma.blogPost.delete({ where: { id } });
  revalidatePath("/admin/blog");
  revalidatePath("/fr/news");
  revalidatePath("/en/news");
}
