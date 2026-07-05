"use client";

import { type ReactNode } from "react";
import { motion, type HTMLMotionProps } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface FadeInProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  delay?: number;
  y?: number;
  /** Animate on mount instead of when scrolled into view. */
  onMount?: boolean;
}

/**
 * Declarative fade + rise wrapper. Defaults to a one-shot reveal when the
 * element scrolls into view; set `onMount` for above-the-fold content.
 */
export function FadeIn({
  children,
  delay = 0,
  y = 20,
  onMount = false,
  ...props
}: FadeInProps) {
  const reduced = usePrefersReducedMotion();

  const initial = reduced ? { opacity: 0 } : { opacity: 0, y };
  const animate = { opacity: 1, y: 0 };
  const transition = {
    duration: 0.7,
    delay,
    ease: [0.16, 1, 0.3, 1] as const,
  };

  return (
    <motion.div
      initial={initial}
      {...(onMount
        ? { animate }
        : { whileInView: animate, viewport: { once: true, margin: "-80px" } })}
      transition={transition}
      {...props}
    >
      {children}
    </motion.div>
  );
}
