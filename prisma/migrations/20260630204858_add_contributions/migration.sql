-- CreateEnum
CREATE TYPE "ContributionType" AS ENUM ('COTISATION', 'DON_FINANCIER', 'DON_EN_NATURE', 'AUTRE');

-- CreateEnum
CREATE TYPE "PaymentMode" AS ENUM ('ESPECES', 'MOBILE_MONEY', 'VIREMENT', 'CHEQUE', 'AUTRE');

-- CreateEnum
CREATE TYPE "ContributorKind" AS ENUM ('MEMBRE', 'NON_MEMBRE');

-- CreateEnum
CREATE TYPE "CameroonRegion" AS ENUM ('ADAMAOUA', 'CENTRE', 'EST', 'EXTREME_NORD', 'LITTORAL', 'NORD', 'NORD_OUEST', 'OUEST', 'SUD', 'SUD_OUEST');

-- CreateTable
CREATE TABLE "Contribution" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "contributorKind" "ContributorKind" NOT NULL,
    "matricule" TEXT,
    "contributorName" TEXT NOT NULL,
    "type" "ContributionType" NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 0,
    "estimatedValue" INTEGER,
    "description" TEXT NOT NULL DEFAULT '',
    "paymentMode" "PaymentMode" NOT NULL,
    "collectedBy" TEXT NOT NULL DEFAULT '',
    "receiptNumber" TEXT,
    "region" "CameroonRegion",
    "comments" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contribution_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Contribution_date_idx" ON "Contribution"("date");

-- CreateIndex
CREATE INDEX "Contribution_type_idx" ON "Contribution"("type");

-- CreateIndex
CREATE INDEX "Contribution_paymentMode_idx" ON "Contribution"("paymentMode");

-- CreateIndex
CREATE INDEX "Contribution_contributorKind_idx" ON "Contribution"("contributorKind");

-- CreateIndex
CREATE INDEX "Contribution_region_idx" ON "Contribution"("region");
