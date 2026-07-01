import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import type { UserRole } from "@prisma/client";
import { prisma } from "@/lib/db";
import { hasAccess, type Section } from "@/lib/permissions";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: UserRole;
    } & DefaultSession["user"];
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  session: { strategy: "jwt" },
  pages: { signIn: "/admin/login" },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        const email = String(credentials?.email ?? "").trim().toLowerCase();
        const password = String(credentials?.password ?? "");
        if (!email || !password) return null;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return null;

        const match = await bcrypt.compare(password, user.hashedPassword);
        if (!match) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: UserRole }).role ?? "COMMUNITY_MANAGER";
      }
      return token;
    },
    session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as UserRole;
      }
      return session;
    },
  },
});

/**
 * For server actions: throws if user is missing or lacks any of the allowed roles.
 */
export async function requireRole(...allowed: UserRole[]) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  if (allowed.length && !allowed.includes(session.user.role)) {
    throw new Error("Forbidden");
  }
  return session;
}

/**
 * For server components / pages: redirects to /admin or /admin/login when access is denied.
 */
export async function requireSection(section: Section) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");
  if (!hasAccess(session.user.role, section)) redirect("/admin");
  return session;
}
