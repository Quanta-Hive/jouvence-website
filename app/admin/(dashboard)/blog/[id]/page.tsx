import { notFound } from "next/navigation";
import { BlogForm } from "@/components/admin/blog-form";
import { PageHeader } from "@/components/admin/page-header";
import { prisma } from "@/lib/db";
import { requireSection } from "@/lib/auth";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditBlogPostPage({ params }: Props) {
  await requireSection("blog");
  const { id } = await params;
  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) notFound();

  return (
    <div className="px-8 py-10">
      <PageHeader
        title="Éditer l'article"
        description={post.titleFr}
        backHref="/admin/blog"
        backLabel="Tous les articles"
      />
      <BlogForm
        postId={post.id}
        initial={{
          titleFr: post.titleFr,
          titleEn: post.titleEn,
          slugFr: post.slugFr,
          slugEn: post.slugEn,
          excerptFr: post.excerptFr,
          excerptEn: post.excerptEn,
          bodyFr: post.bodyFr,
          bodyEn: post.bodyEn,
          coverImage: post.coverImage,
          category: post.category,
          status: post.status,
        }}
      />
    </div>
  );
}
