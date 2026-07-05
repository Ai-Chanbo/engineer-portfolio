import type { Platform } from "@/types";
import {
  GitHubIcon,
  XIcon,
  LinkedInIcon,
  NoteIcon,
} from "@/components/icons/brand";

type PlatformMeta = {
  label: string;
  Icon: (props: { size?: number; className?: string }) => React.ReactElement;
  /** Accent used for the icon chip glow. */
  glow: string;
};

export const platformMeta: Record<Platform, PlatformMeta> = {
  x: { label: "X", Icon: XIcon, glow: "rgba(255,255,255,0.18)" },
  linkedin: {
    label: "LinkedIn",
    Icon: LinkedInIcon,
    glow: "rgba(56,132,232,0.35)",
  },
  note: { label: "note", Icon: NoteIcon, glow: "rgba(46,204,113,0.30)" },
  github: { label: "GitHub", Icon: GitHubIcon, glow: "rgba(255,255,255,0.16)" },
};

/** Format an ISO date (YYYY-MM-DD) to YYYY.MM.DD without timezone drift. */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${y}.${m}.${d}`;
}
