import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { contactSchema } from "@/lib/validations/forms";

export async function POST(request: NextRequest) {
  const json = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const data = parsed.data;
  await prisma.contactMessage.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone || null,
      subject: data.subject,
      message: data.message,
    },
  });

  return NextResponse.json({ ok: true });
}
