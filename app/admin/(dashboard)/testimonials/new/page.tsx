import { TestimonialForm } from "@/components/admin/testimonial-form";
import { PageHeader } from "@/components/admin/page-header";

export default function NewTestimonialPage() {
  return (
    <div className="px-8 py-10">
      <PageHeader
        title="Nouveau témoignage"
        description="Ajoutez le témoignage d'un sympathisant."
        backHref="/admin/testimonials"
        backLabel="Tous les témoignages"
      />
      <TestimonialForm />
    </div>
  );
}
