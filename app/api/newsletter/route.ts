import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { newsletterSchema } from "@/lib/validations/forms";

export async function POST(request: NextRequest) {
  const json = await request.json().catch(() => null);
  const parsed = newsletterSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const { email, locale } = parsed.data;
  await prisma.newsletterSubscriber.upsert({
    where: { email },
    update: { locale },
    create: { email, locale },
  });

  return NextResponse.json({ ok: true });
}
