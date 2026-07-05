import { SectionHeading } from "@/components/motion/SectionHeading";
import { ProjectShowcase } from "@/components/portfolio/ProjectShowcase";
import { projects } from "@/content/projects";

export function Portfolio() {
  return (
    <section
      id="portfolio"
      className="relative mx-auto max-w-6xl scroll-mt-24 px-5 py-28 sm:px-8 md:py-36"
    >
      <SectionHeading
        eyebrow="02 — Work"
        title={
          <>
            現場で動く、
            <span className="text-gradient">実装済みのシステム。</span>
          </>
        }
        description="プロトタイプではなく、製造現場での運用を見据えて設計・実装したプロジェクトです。"
      />

      <div className="mt-20 flex flex-col gap-28 md:gap-36">
        {projects.map((project) => (
          <ProjectShowcase key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
