import { ArrowUpRight, PenLine } from "lucide-react";
import { SectionHeading } from "@/components/motion/SectionHeading";
import { FadeIn } from "@/components/motion/FadeIn";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { platformMeta } from "@/components/articles/platformMeta";
import { articles, visibleSocialProfiles } from "@/content/articles";

export function Articles() {
  const hasArticles = articles.length > 0;
  const hasSocials = visibleSocialProfiles.length > 0;

  return (
    <section
      id="articles"
      className="relative mx-auto max-w-6xl scroll-mt-24 px-5 py-28 sm:px-8 md:py-36"
    >
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="03 — Articles"
          title={
            <>
              学び続け、
              <span className="text-gradient">発信し続ける。</span>
            </>
          }
          description="日々の開発で得た知見や、製造×開発の視点を各媒体で発信しています。"
        />

        {/* Follow row — hidden until profiles are configured */}
        {hasSocials && (
          <FadeIn className="flex flex-wrap gap-2.5">
            {visibleSocialProfiles.map((p) => {
              const meta = platformMeta[p.platform];
              const { Icon } = meta;
              return (
                <a
                  key={p.platform}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-3.5 py-2 text-sm text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:text-foreground"
                >
                  <Icon size={15} />
                  <span className="font-mono text-xs">{p.handle}</span>
                </a>
              );
            })}
          </FadeIn>
        )}
      </div>

      {hasArticles ? (
        <>
          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, i) => (
              <FadeIn
                key={article.url + i}
                delay={(i % 3) * 0.08}
                className="h-full"
              >
                <ArticleCard article={article} />
              </FadeIn>
            ))}
          </div>
          <FadeIn className="mt-10 flex items-center justify-center gap-2 text-sm text-subtle">
            <span>各媒体で最新の発信をチェックできます</span>
            <ArrowUpRight size={14} />
          </FadeIn>
        </>
      ) : (
        <FadeIn className="mt-14">
          <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-line bg-card/30 px-6 py-16 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-white/[0.03] text-accent-cyan">
              <PenLine size={20} strokeWidth={1.75} />
            </span>
            <h3 className="text-lg font-semibold tracking-tight text-foreground">
              記事を準備中です
            </h3>
            <p className="max-w-md text-pretty font-jp text-sm leading-relaxed text-muted">
              X・LinkedIn・note などで技術発信を予定しています。公開までいましばらくお待ちください。
            </p>
          </div>
        </FadeIn>
      )}
    </section>
  );
}
