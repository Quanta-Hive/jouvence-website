import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type Props = {
  title: string;
  description?: string;
  backHref?: string;
  backLabel?: string;
  actions?: React.ReactNode;
};

export function PageHeader({ title, description, backHref, backLabel = "Retour", actions }: Props) {
  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        {backHref && (
          <Link
            href={backHref}
            className="mb-3 inline-flex items-center gap-1.5 text-sm text-brand-navy/60 transition-colors hover:text-brand-navy"
          >
            <ArrowLeft size={14} />
            {backLabel}
          </Link>
        )}
        <h1 className="font-display text-3xl font-extrabold text-brand-navy">{title}</h1>
        {description && <p className="mt-1 text-brand-navy/60">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
    </div>
  );
}
