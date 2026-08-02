import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { GitHubIcon } from "@/components/icons/brand";
import { projects, getProject } from "@/content/projects";
import { site } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProjectVisual } from "@/components/portfolio/ProjectVisual";
import { ArchitectureDiagram } from "@/components/portfolio/ArchitectureDiagram";
import { ContactCTAButton } from "@/components/cta/ContactCTAButton";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.overview,
    openGraph: {
      title: `${project.title} — ${site.name}`,
      description: project.subtitle,
    },
  };
}

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12">
      <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-subtle">
        {label}
      </h2>
      {children}
    </section>
  );
}

export default async function WorkDetailPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <main className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-24">
      <Link
        href="/#portfolio"
        className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
      >
        <ArrowLeft size={16} />
        Work 一覧へ戻る
      </Link>

      {/* Header */}
      <header className="mt-8 flex flex-col gap-3">
        <div className="flex items-center gap-3 font-mono text-xs text-subtle">
          <span className="text-accent-cyan">{project.index}</span>
          <span className="h-px w-8 bg-line-strong" />
          {project.year && <span>{project.year}</span>}
        </div>
        <h1 className="text-4xl font-semibold tracking-[-0.02em] sm:text-5xl">
          {project.title}
        </h1>
        <p className="text-pretty font-jp text-lg text-muted">
          {project.subtitle}
        </p>
      </header>

      {/* Main visual */}
      <div className="mt-10">
        <ProjectVisual variant={project.visual} title={project.title} />
      </div>

      <Section label="概要">
        <p className="text-pretty font-jp leading-relaxed text-foreground/90">
          {project.overview}
        </p>
      </Section>

      <Section label="解決した課題">
        <div className="rounded-2xl border border-line bg-card/40 p-6">
          <p className="text-pretty font-jp text-sm leading-relaxed text-muted">
            {project.problem}
          </p>
        </div>
      </Section>

      <Section label="システム構成図">
        <ArchitectureDiagram
          stages={project.architecture.stages}
          caption={project.architecture.caption}
        />
      </Section>

      <Section label="使用技術">
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <Badge key={t} className="px-3 py-1.5 text-xs">
              {t}
            </Badge>
          ))}
        </div>
      </Section>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Section label="主な機能">
          <DetailList items={project.features} />
        </Section>
        <Section label="工夫したポイント">
          <DetailList items={project.highlights} />
        </Section>
      </div>

      {project.github && (
        <div className="mt-14">
          <a href={project.github} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="md">
              <GitHubIcon size={16} />
              GitHub でコードを見る
            </Button>
          </a>
        </div>
      )}

      {/* 相談CTA — 詳細を読み終えた訪問者を Contact へ誘導（consultPrompt がある作品のみ） */}
      {project.consultPrompt && (
        <aside className="mt-16 rounded-2xl border border-line bg-card/40 p-6 sm:p-8">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-subtle">
            このような課題をご相談ください
          </h2>
          <p className="mt-4 text-pretty font-jp text-sm leading-relaxed text-foreground/90">
            {project.consultPrompt}
          </p>
          <p className="mt-3 text-pretty font-jp text-sm leading-relaxed text-muted">
            要件が固まっていない段階でも、現場課題の整理からご相談いただけます。
          </p>
          <div className="mt-6">
            <ContactCTAButton
              href="/#contact"
              variant="accent"
              size="md"
              className="w-full sm:w-auto"
            >
              類似システムについて相談する
              <ArrowRight size={16} />
            </ContactCTAButton>
          </div>
        </aside>
      )}
    </main>
  );
}

function DetailList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-3 rounded-xl border border-line bg-card/30 px-4 py-3"
        >
          <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent-cyan/15 text-accent-cyan">
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
