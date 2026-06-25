"use client";

import { DeleteButton } from "./delete-button";
import { deleteMember } from "@/app/admin/(dashboard)/members/actions";

export function DeleteMemberButton({ id }: { id: string }) {
  return <DeleteButton onDelete={() => deleteMember(id)} />;
}
