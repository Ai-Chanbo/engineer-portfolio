import type { LucideIcon } from "lucide-react";

/** A single step in the career timeline. */
export type TimelineEntry = {
  period: string;
  title: string;
  org?: string;
  description: string;
  /** Highlighted keywords / achievements. */
  tags?: string[];
};

/** A core strength card. */
export type Strength = {
  icon: LucideIcon;
  title: string;
  description: string;
};

/** A skill with a proficiency level (0–100). */
export type Skill = {
  name: string;
  level: number;
};

/** A named group of related skills. */
export type SkillCategory = {
  name: string;
  skills: Skill[];
};

/** A certification / qualification. */
export type Certification = {
  name: string;
  issuer?: string;
  year?: string;
};

/** One stage (column) of a system architecture diagram. */
export type ArchStage = {
  /** Layer label, e.g. "現場", "クラウド". */
  name: string;
  /** Components within the stage. */
  nodes: string[];
};

/** A portfolio project. Managed as data in content/projects.ts. */
export type Project = {
  slug: string;
  /** Sequence label, e.g. "01". */
  index: string;
  title: string;
  /** Short one-line tagline. */
  subtitle: string;
  year?: string;
  /** Which mock visual to render until a real screenshot is provided. */
  visual: "inspection" | "monitoring";
  /** 概要 */
  overview: string;
  /** 解決した課題 */
  problem: string;
  /** システム構成図 */
  architecture: {
    caption?: string;
    stages: ArchStage[];
  };
  /** 使用技術 */
  tech: string[];
  /** 主な機能 */
  features: string[];
  /** 工夫したポイント */
  highlights: string[];
  github?: string;
  demo?: string;
};

/** Supported publishing platforms. */
export type Platform = "x" | "linkedin" | "note" | "github";

/** A published article / post on an external platform. */
export type Article = {
  platform: Platform;
  /** Content category, e.g. "技術解説". */
  category: string;
  title: string;
  excerpt?: string;
  /** ISO date string (YYYY-MM-DD). */
  date: string;
  tags: string[];
  url: string;
};

/** A social / publishing profile for the "follow" row. */
export type SocialProfile = {
  platform: Platform;
  handle: string;
  url: string;
};
