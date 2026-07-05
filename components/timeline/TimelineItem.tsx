"use client";

import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import type { TimelineEntry } from "@/types";

interface TimelineItemProps {
  entry: TimelineEntry;
  index: number;
  isLast: boolean;
}

/**
 * A single timeline row: a rail with a glowing node on the left and a
 * glass content card on the right. Reveals as it scrolls into view.
 */
export function TimelineItem({ entry, index, isLast }: TimelineItemProps) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="relative grid grid-cols-[auto_1fr] gap-x-5 sm:gap-x-7"
    >
      {/* Rail + node */}
      <div className="relative flex flex-col items-center">
        <span className="relative mt-1.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center">
          <span className="absolute inline-flex h-full w-full rounded-full bg-accent/40 blur-[3px]" />
          <span className="relative h-2.5 w-2.5 rounded-full bg-gradient-to-br from-accent to-accent-cyan ring-2 ring-background" />
        </span>
        {!isLast && (
          <span className="mt-1 w-px flex-1 bg-gradient-to-b from-line-strong via-line to-transparent" />
        )}
      </div>

      {/* Content */}
      <div className="pb-10">
        <span className="font-mono text-xs tracking-wide text-subtle">
          {entry.period}
        </span>
        <h3 className="mt-1.5 text-lg font-semibold tracking-tight text-foreground sm:text-xl">
          {entry.title}
        </h3>
        {entry.org && (
          <p className="mt-0.5 text-sm text-accent-soft">{entry.org}</p>
        )}
        <p className="mt-3 max-w-xl text-pretty font-jp text-sm leading-relaxed text-muted">
          {entry.description}
        </p>
        {entry.tags && entry.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {entry.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        )}
      </div>
    </motion.li>
  );
}
