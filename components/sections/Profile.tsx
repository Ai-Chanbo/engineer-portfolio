import { Award } from "lucide-react";
import { SectionHeading } from "@/components/motion/SectionHeading";
import { FadeIn } from "@/components/motion/FadeIn";
import { TimelineItem } from "@/components/timeline/TimelineItem";
import { SkillBar } from "@/components/profile/SkillBar";
import {
  profileIntro,
  timeline,
  strengths,
  skillCategories,
  certifications,
} from "@/content/profile";

export function Profile() {
  return (
    <section
      id="profile"
      className="relative mx-auto max-w-6xl scroll-mt-24 px-5 py-28 sm:px-8 md:py-36"
    >
      <SectionHeading
        eyebrow="01 — Profile"
        title={
          <>
            現場を知るエンジニアが、
            <br className="hidden sm:block" />
            <span className="text-gradient">DXを実装する。</span>
          </>
        }
        description={profileIntro}
      />

      {/* Strengths */}
      <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {strengths.map((s, i) => (
          <FadeIn
            key={s.title}
            delay={i * 0.08}
            className="group relative overflow-hidden rounded-2xl border border-line bg-card/40 p-6 transition-colors duration-300 hover:border-line-strong"
          >
            {/* hover glow */}
            <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
            <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-white/[0.03] text-accent-cyan">
              <s.icon size={20} strokeWidth={1.75} />
            </span>
            <h3 className="mt-5 text-base font-semibold tracking-tight text-foreground">
              {s.title}
            </h3>
            <p className="mt-2 text-pretty font-jp text-sm leading-relaxed text-muted">
              {s.description}
            </p>
          </FadeIn>
        ))}
      </div>

      {/* Career + Skills two-column */}
      <div className="mt-20 grid grid-cols-1 gap-x-16 gap-y-16 lg:grid-cols-[1.1fr_1fr]">
        {/* Career timeline */}
        <div>
          <h3 className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-subtle">
            Career
          </h3>
          <ol className="relative">
            {timeline.map((entry, i) => (
              <TimelineItem
                key={entry.title}
                entry={entry}
                index={i}
                isLast={i === timeline.length - 1}
              />
            ))}
          </ol>
        </div>

        {/* Skills + Certifications */}
        <div className="flex flex-col gap-12">
          <div>
            <h3 className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-subtle">
              Skills
            </h3>
            <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2">
              {skillCategories.map((cat) => (
                <FadeIn key={cat.name}>
                  <h4 className="mb-4 text-sm font-medium text-foreground">
                    {cat.name}
                  </h4>
                  <div className="flex flex-col gap-3.5">
                    {cat.skills.map((skill, i) => (
                      <SkillBar key={skill.name} skill={skill} index={i} />
                    ))}
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-subtle">
              Certifications
            </h3>
            <div className="flex flex-col gap-2.5">
              {certifications.map((cert, i) => (
                <FadeIn
                  key={`${cert.name}-${i}`}
                  delay={i * 0.06}
                  className="flex items-center gap-3 rounded-xl border border-line bg-card/40 px-4 py-3"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.03] text-accent-cyan">
                    <Award size={16} strokeWidth={1.75} />
                  </span>
                  <span className="text-sm text-foreground">{cert.name}</span>
                  {cert.year && cert.year !== "—" && (
                    <span className="ml-auto font-mono text-xs text-subtle">
                      {cert.year}
                    </span>
                  )}
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
