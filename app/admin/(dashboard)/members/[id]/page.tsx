import { notFound } from "next/navigation";
import { MemberForm } from "@/components/admin/member-form";
import { PageHeader } from "@/components/admin/page-header";
import { prisma } from "@/lib/db";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditMemberPage({ params }: Props) {
  const { id } = await params;
  const member = await prisma.partyMember.findUnique({ where: { id } });
  if (!member) notFound();

  return (
    <div className="px-8 py-10">
      <PageHeader
        title="Éditer le membre"
        description={member.name}
        backHref="/admin/members"
        backLabel="Tous les membres"
      />
      <MemberForm
        memberId={member.id}
        initial={{
          name: member.name,
          roleFr: member.roleFr,
          roleEn: member.roleEn,
          bioFr: member.bioFr,
          bioEn: member.bioEn,
          photoUrl: member.photoUrl,
          email: member.email,
          facebookUrl: member.facebookUrl,
          twitterUrl: member.twitterUrl,
          linkedinUrl: member.linkedinUrl,
          isLeader: member.isLeader,
          isPublished: member.isPublished,
          order: member.order,
        }}
      />
    </div>
  );
}
