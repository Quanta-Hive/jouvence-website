import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        blue: "bg-brand-blue/10 text-brand-blue",
        orange: "bg-brand-orange/10 text-brand-orange",
        yellow: "bg-brand-yellow/15 text-amber-700",
        navy: "bg-brand-navy/10 text-brand-navy",
        success: "bg-emerald-100 text-emerald-700",
        muted: "bg-brand-navy/5 text-brand-navy/60",
        outline: "border border-brand-navy/15 text-brand-navy",
      },
    },
    defaultVariants: {
      variant: "blue",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
