import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { membershipSchema } from "@/lib/validations/forms";

export async function POST(request: NextRequest) {
  const formData = await request.formData().catch(() => null);
  if (!formData) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const payload = Object.fromEntries(formData.entries()) as Record<string, string>;
  const parsed = membershipSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload", details: parsed.error.flatten() }, { status: 400 });
  }

  const data = parsed.data;
  await prisma.membershipApplication.create({
    data: {
      fullName: data.fullName,
      birthDate: new Date(data.birthDate),
      email: data.email,
      phone: data.phone,
      region: data.region,
      city: data.city,
      profession: data.profession || null,
      motivation: data.motivation || null,
      documentUrl: data.documentUrl || null,
    },
  });

  return NextResponse.json({ ok: true });
}
