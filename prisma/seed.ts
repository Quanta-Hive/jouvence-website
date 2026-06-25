import "dotenv/config";

import { PrismaClient, PostStatus, UserRole } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@parti-jouvence.cm";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "changeme";
  const adminName = process.env.ADMIN_NAME ?? "Administrateur";

  const hashedPassword = await bcrypt.hash(adminPassword, 12);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: { name: adminName, hashedPassword, role: UserRole.ADMIN },
    create: {
      email: adminEmail,
      name: adminName,
      hashedPassword,
      role: UserRole.ADMIN,
    },
  });

  await prisma.partyMember.upsert({
    where: { id: "seed-leader" },
    update: {},
    create: {
      id: "seed-leader",
      name: "Dr. Valère Bertrand BESSALA",
      photoUrl: "/brand/leader-2.jpeg",
      email: "jcp.jouvence237@gmail.com",
      isLeader: true,
      order: 0,
      roleFr: "Guide de Jouvence",
      roleEn: "Leader of Jouvence",
      bioFr:
        "Dr. Valère Bertrand BESSALA est un leader visionnaire engagé pour le renouveau démocratique et le développement du Cameroun.",
      bioEn:
        "Dr. Valère Bertrand BESSALA is a visionary leader committed to democratic renewal and the development of Cameroon.",
    },
  });

  const teamSeed = [
    {
      id: "seed-member-1",
      name: "Jane Doe",
      roleFr: "Secrétaire Générale",
      roleEn: "Secretary General",
      order: 1,
    },
    {
      id: "seed-member-2",
      name: "John Doe",
      roleFr: "Responsable des Programmes",
      roleEn: "Programs Officer",
      order: 2,
    },
    {
      id: "seed-member-3",
      name: "Sarah Doe",
      roleFr: "Directrice Communication",
      roleEn: "Communications Director",
      order: 3,
    },
  ];

  for (const member of teamSeed) {
    await prisma.partyMember.upsert({
      where: { id: member.id },
      update: {},
      create: { ...member, bioFr: "", bioEn: "" },
    });
  }

  const samplePost = {
    id: "seed-post-1",
    slugFr: "lancement-officiel-parti-jouvence",
    slugEn: "official-launch-jouvence",
    titleFr:
      "Lancement Officiel de Parti Jouvence : Un Nouveau Souffle pour le Cameroun",
    titleEn: "Official Launch of Parti Jouvence: A New Breath for Cameroon",
    excerptFr:
      "Dr. Valère Bessala présente sa vision pour un Cameroun renouvelé lors d'une cérémonie rassemblant plus de 5 000 personnes à Yaoundé.",
    excerptEn:
      "Dr. Valère Bessala unveils his vision for a renewed Cameroon at a ceremony gathering more than 5,000 people in Yaoundé.",
    bodyFr:
      "<p>Le Parti Jouvence a officiellement lancé sa campagne devant plus de 5 000 sympathisants à Yaoundé. L'événement marque une étape majeure dans la mobilisation de la jeunesse camerounaise pour un changement politique profond.</p>",
    bodyEn:
      "<p>Parti Jouvence officially launched its campaign in front of more than 5,000 supporters in Yaoundé. The event marks a major step in mobilizing Cameroonian youth for deep political change.</p>",
    coverImage: "/brand/event-1.jpeg",
    category: "Événement",
    status: PostStatus.PUBLISHED,
    publishedAt: new Date(),
    authorId: admin.id,
  };

  await prisma.blogPost.upsert({
    where: { id: samplePost.id },
    update: {},
    create: samplePost,
  });

  await prisma.testimonial.upsert({
    where: { id: "seed-testimonial-1" },
    update: {},
    create: {
      id: "seed-testimonial-1",
      name: "Marie Tchounkou",
      roleFr: "Étudiante à Yaoundé",
      roleEn: "Student in Yaoundé",
      quoteFr:
        "Parti Jouvence porte une vision qui parle directement à la jeunesse. Je crois en ce projet.",
      quoteEn:
        "Parti Jouvence carries a vision that speaks directly to youth. I believe in this project.",
      order: 0,
    },
  });

  console.log(`Seeded admin user: ${admin.email}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
