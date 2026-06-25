import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-brand-blue to-brand-blue-light text-white shadow-md shadow-brand-blue/25 hover:shadow-lg hover:shadow-brand-blue/40 hover:-translate-y-0.5",
        accent:
          "bg-gradient-to-r from-brand-orange to-brand-orange-light text-white shadow-md shadow-brand-orange/25 hover:shadow-lg hover:shadow-brand-orange/40 hover:-translate-y-0.5",
        outline:
          "border border-brand-navy/15 bg-white text-brand-navy hover:border-brand-blue hover:text-brand-blue",
        ghost:
          "text-brand-navy hover:bg-brand-navy/5",
        soft:
          "bg-brand-blue/10 text-brand-blue hover:bg-brand-blue/20",
        destructive:
          "bg-red-600 text-white hover:bg-red-700",
      },
      size: {
        sm: "h-9 px-4",
        md: "h-11 px-6",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
