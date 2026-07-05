"use client";

import dynamic from "next/dynamic";
import { motion, type Variants } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/Magnetic";
import { AuroraBackground } from "@/components/background/AuroraBackground";
import { site, heroStack } from "@/content/site";

// Decorative canvas — load on the client after paint to keep initial JS lean.
const ParticleField = dynamic(
  () =>
    import("@/components/background/ParticleField").then((m) => m.ParticleField),
  { ssr: false },
);

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

// The headline is the LCP element — keep it opaque (transform-only entrance)
// so it paints on first render instead of waiting for JS to fade it in.
const headlineItem: Variants = {
  hidden: { y: 14 },
  show: {
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-5 pt-24 pb-20 sm:px-8"
    >
      <AuroraBackground />
      <ParticleField />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center"
      >
        {/* Eyebrow badge */}
        <motion.div variants={item}>
          <div className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-4 py-1.5 text-xs font-medium text-muted backdrop-blur-sm">
            {site.available ? (
              <>
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                案件のご相談を受付中
              </>
            ) : (
              <>
                <Sparkles size={13} className="text-accent-cyan" />
                {site.tagline}
              </>
            )}
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={headlineItem}
          className="mt-7 text-balance text-[clamp(2.6rem,8vw,5.25rem)] font-semibold leading-[1.02] tracking-[-0.03em]"
        >
          <span className="text-foreground">{site.headline.lead}</span>
          <br className="hidden sm:block" />
          <span className="text-gradient">{site.headline.highlight}</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={item}
          className="mt-7 max-w-xl text-pretty font-jp text-base leading-relaxed text-muted sm:text-lg"
        >
          {site.description}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={item}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Magnetic>
            <a href="#portfolio">
              <Button variant="accent" size="lg" className="min-w-[200px]">
                Portfolio を見る
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Button>
            </a>
          </Magnetic>
          <Magnetic strength={10}>
            <a href="#contact">
              <Button variant="outline" size="lg" className="min-w-[160px]">
                お問い合わせ
              </Button>
            </a>
          </Magnetic>
        </motion.div>

        {/* Tech marquee */}
        <motion.ul
          variants={item}
          className="mt-14 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium tracking-wide text-subtle"
        >
          {heroStack.map((tech) => (
            <li
              key={tech}
              className="font-mono uppercase transition-colors hover:text-muted"
            >
              {tech}
            </li>
          ))}
        </motion.ul>
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#profile"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-subtle"
      >
        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-line-strong pt-1.5">
          <span className="h-1.5 w-1 rounded-full bg-muted motion-safe:animate-[scroll-hint_1.8s_ease-in-out_infinite]" />
        </span>
      </motion.a>
    </section>
  );
}
