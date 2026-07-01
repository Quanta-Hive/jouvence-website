"use client";

import { DeleteButton } from "./delete-button";
import { deleteContribution } from "@/app/admin/(dashboard)/contributions/actions";

export function DeleteContributionButton({ id }: { id: string }) {
  return <DeleteButton onDelete={() => deleteContribution(id)} />;
}
