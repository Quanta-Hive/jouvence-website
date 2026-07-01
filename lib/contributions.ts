import type {
  CameroonRegion,
  ContributionType,
  ContributorKind,
  PaymentMode,
} from "@prisma/client";

export const CONTRIBUTION_TYPE_LABELS: Record<ContributionType, string> = {
  COTISATION: "Cotisation",
  DON_FINANCIER: "Don financier",
  DON_EN_NATURE: "Don en nature",
  AUTRE: "Autre",
};

export const PAYMENT_MODE_LABELS: Record<PaymentMode, string> = {
  ESPECES: "Espèces",
  MOBILE_MONEY: "Mobile Money",
  VIREMENT: "Virement",
  CHEQUE: "Chèque",
  AUTRE: "Autre",
};

export const CONTRIBUTOR_KIND_LABELS: Record<ContributorKind, string> = {
  MEMBRE: "Membre",
  NON_MEMBRE: "Non membre",
};

export const REGION_LABELS: Record<CameroonRegion, string> = {
  ADAMAOUA: "Adamaoua",
  CENTRE: "Centre",
  EST: "Est",
  EXTREME_NORD: "Extrême-Nord",
  LITTORAL: "Littoral",
  NORD: "Nord",
  NORD_OUEST: "Nord-Ouest",
  OUEST: "Ouest",
  SUD: "Sud",
  SUD_OUEST: "Sud-Ouest",
};

const FCFA_FORMATTER = new Intl.NumberFormat("fr-FR");
export function formatFcfa(amount: number): string {
  return `${FCFA_FORMATTER.format(amount)} FCFA`;
}
