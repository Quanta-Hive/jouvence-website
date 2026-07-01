import { notFound } from "next/navigation";
import { TestimonialForm } from "@/components/admin/testimonial-form";
import { PageHeader } from "@/components/admin/page-header";
import { prisma } from "@/lib/db";
import { requireSection } from "@/lib/auth";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditTestimonialPage({ params }: Props) {
  await requireSection("testimonials");
  const { id } = await params;
  const item = await prisma.testimonial.findUnique({ where: { id } });
  if (!item) notFound();

  return (
    <div className="px-8 py-10">
      <PageHeader
        title="Éditer le témoignage"
        description={item.name}
        backHref="/admin/testimonials"
        backLabel="Tous les témoignages"
      />
      <TestimonialForm
        testimonialId={item.id}
        initial={{
          name: item.name,
          roleFr: item.roleFr,
          roleEn: item.roleEn,
          quoteFr: item.quoteFr,
          quoteEn: item.quoteEn,
          photoUrl: item.photoUrl,
          isPublished: item.isPublished,
          order: item.order,
        }}
      />
    </div>
  );
}
