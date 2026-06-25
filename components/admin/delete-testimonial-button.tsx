"use client";

import { DeleteButton } from "./delete-button";
import { deleteTestimonial } from "@/app/admin/(dashboard)/testimonials/actions";

export function DeleteTestimonialButton({ id }: { id: string }) {
  return <DeleteButton onDelete={() => deleteTestimonial(id)} />;
}
