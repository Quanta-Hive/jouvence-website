-- Rename existing EDITOR value to COMMUNITY_MANAGER (preserves existing rows)
ALTER TYPE "UserRole" RENAME VALUE 'EDITOR' TO 'COMMUNITY_MANAGER';

-- Add new TREASURY value
ALTER TYPE "UserRole" ADD VALUE 'TREASURY';

-- Update default to the new role name
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'COMMUNITY_MANAGER';
