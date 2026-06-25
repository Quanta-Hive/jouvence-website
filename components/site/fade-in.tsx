"use client";

import { motion, type MotionProps } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = MotionProps & {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "span" | "section" | "p" | "h1" | "h2" | "h3" | "li";
};

export function FadeIn({ children, className, delay = 0, as = "div", ...rest }: Props) {
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      className={cn(className)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </Comp>
  );
}
