import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { GitHubIcon } from "@/components/icons/brand";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TiltCard } from "@/components/portfolio/TiltCard";
import { ProjectVisual } from "@/components/portfolio/ProjectVisual";
import { ArchitectureDiagram } from "@/components/portfolio/ArchitectureDiagram";

/** Small mono section label used inside a showcase. */
function BlockLabel({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-subtle">
      {children}
    </h3>
  );
}

export function ProjectShowcase({ project }: { project: Project }) {
  return (
    <article className="relative">
      {/* Header */}
      <FadeIn className="flex flex-col gap-3">
        <div className="flex items-center gap-3 font-mono text-xs text-subtle">
          <span className="text-accent-cyan">{project.index}</span>
          <span className="h-px w-8 bg-line-strong" />
          {project.year && <span>{project.year}</span>}
        </div>
        <h2 className="text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">
          {project.title}
        </h2>
        <p className="max-w-2xl text-pretty font-jp text-base text-muted sm:text-lg">
          {project.subtitle}
        </p>
      </FadeIn>

      {/* 1. メイン画像 */}
      <FadeIn y={28} className="mt-10">
        <div className="relative">
          <div className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.12),transparent_70%)] blur-2xl" />
          <TiltCard className="rounded-xl">
            <div className="overflow-hidden rounded-xl shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] ring-1 ring-line [transform:translateZ(0)]">
              <ProjectVisual variant={project.visual} title={project.title} />
            </div>
          </TiltCard>
        </div>
      </FadeIn>

      {/* 2. 概要 */}
      <FadeIn className="mt-14 max-w-3xl">
        <BlockLabel>概要</BlockLabel>
        <p className="text-pretty font-jp text-base leading-relaxed text-foreground/90">
          {project.overview}
        </p>
      </FadeIn>

      {/* 3. 解決した課題 */}
      <FadeIn className="mt-10 max-w-3xl">
        <BlockLabel>解決した課題</BlockLabel>
        <div className="rounded-2xl border border-line bg-card/40 p-6">
          <p className="text-pretty font-jp text-sm leading-relaxed text-muted">
            {project.problem}
          </p>
        </div>
      </FadeIn>

      {/* 4. システム構成図 */}
      <FadeIn className="mt-10">
        <BlockLabel>システム構成図</BlockLabel>
        <ArchitectureDiagram
          stages={project.architecture.stages}
          caption={project.architecture.caption}
        />
      </FadeIn>

      {/* 5. 使用技術 */}
      <FadeIn className="mt-10">
        <BlockLabel>使用技術</BlockLabel>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <Badge key={t} className="px-3 py-1.5 text-xs">
              {t}
            </Badge>
          ))}
        </div>
      </FadeIn>

      {/* 6. 主な機能 / 7. 工夫したポイント */}
      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
        <FadeIn>
          <BlockLabel>主な機能</BlockLabel>
          <FeatureList items={project.features} variant="feature" />
        </FadeIn>
        <FadeIn delay={0.08}>
          <BlockLabel>工夫したポイント</BlockLabel>
          <FeatureList items={project.highlights} variant="highlight" />
        </FadeIn>
      </div>

      {/* 8. GitHub / 9. 詳細を見る */}
      <FadeIn className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link href={`/work/${project.slug}`}>
          <Button variant="accent" size="md" className="w-full sm:w-auto">
            詳細を見る
            <ArrowUpRight size={16} />
          </Button>
        </Link>
        {project.github && (
          <a href={project.github} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="md" className="w-full sm:w-auto">
              <GitHubIcon size={16} />
              GitHub
            </Button>
          </a>
        )}
      </FadeIn>
    </article>
  );
}

function FeatureList({
  items,
  variant,
}: {
  items: string[];
  variant: "feature" | "highlight";
}) {
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-3 rounded-xl border border-line bg-card/30 px-4 py-3"
        >
          <span
            className={cn(
              "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full",
              variant === "feature"
                ? "bg-accent/15 text-accent-soft"
                : "bg-accent-cyan/15 text-accent-cyan",
            )}
          >
            <Check size={11} strokeWidth={3} />
          </span>
          <span className="text-pretty font-jp text-sm leading-relaxed text-muted">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}
