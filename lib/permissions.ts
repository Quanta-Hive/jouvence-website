import type { UserRole } from "@prisma/client";

export type Section =
  | "dashboard"
  | "home"
  | "blog"
  | "members"
  | "contributions"
  | "testimonials"
  | "submissions"
  | "siteInfo"
  | "settings"
  | "users";

export const ROLE_ACCESS: Record<Section, readonly UserRole[]> = {
  dashboard: ["ADMIN", "COMMUNITY_MANAGER", "TREASURY"],
  home: ["ADMIN", "COMMUNITY_MANAGER"],
  blog: ["ADMIN", "COMMUNITY_MANAGER"],
  members: ["ADMIN", "COMMUNITY_MANAGER"],
  contributions: ["ADMIN", "TREASURY"],
  testimonials: ["ADMIN", "COMMUNITY_MANAGER"],
  submissions: ["ADMIN", "COMMUNITY_MANAGER"],
  siteInfo: ["ADMIN"],
  settings: ["ADMIN", "COMMUNITY_MANAGER", "TREASURY"],
  users: ["ADMIN"],
};

export const ROLE_LABELS: Record<UserRole, string> = {
  ADMIN: "Administrateur",
  COMMUNITY_MANAGER: "Community Manager",
  TREASURY: "Trésorerie",
};

export function hasAccess(role: UserRole | undefined, section: Section): boolean {
  if (!role) return false;
  return ROLE_ACCESS[section].includes(role);
}
