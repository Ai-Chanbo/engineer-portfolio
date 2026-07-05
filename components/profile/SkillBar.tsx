"use client";

import { motion } from "motion/react";
import type { Skill } from "@/types";

/**
 * A labelled proficiency bar that fills from 0 → level when scrolled into view.
 */
export function SkillBar({ skill, index }: { skill: Skill; index: number }) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="text-sm text-foreground">{skill.name}</span>
        <span className="font-mono text-[11px] text-subtle">{skill.level}</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            duration: 1,
            delay: 0.1 + index * 0.06,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="h-full rounded-full bg-gradient-to-r from-accent to-accent-cyan"
        />
      </div>
    </div>
  );
}
