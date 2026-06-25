"use client";

import { DeleteButton } from "./delete-button";
import { deleteSubscriber } from "@/app/admin/(dashboard)/submissions/newsletter/actions";

export function SubscriberRowActions({ id }: { id: string }) {
  return <DeleteButton onDelete={() => deleteSubscriber(id)} />;
}
