import { BlogForm } from "@/components/admin/blog-form";
import { PageHeader } from "@/components/admin/page-header";

export default function NewBlogPostPage() {
  return (
    <div className="px-8 py-10">
      <PageHeader
        title="Nouvel article"
        description="Rédigez le contenu en français et en anglais."
        backHref="/admin/blog"
        backLabel="Tous les articles"
      />
      <BlogForm />
    </div>
  );
}
