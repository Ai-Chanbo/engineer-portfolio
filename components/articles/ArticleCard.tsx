import { ArrowUpRight } from "lucide-react";
import type { Article } from "@/types";
import { Badge } from "@/components/ui/badge";
import { platformMeta, formatDate } from "@/components/articles/platformMeta";

/**
 * A single article card linking out to the original post. Fully presentational
 * and data-driven — adding entries to content/articles.ts is all that's needed.
 */
export function ArticleCard({ article }: { article: Article }) {
  const meta = platformMeta[article.platform];
  const { Icon } = meta;

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card/40 p-6 transition-all duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:border-line-strong hover:bg-card/70"
    >
      {/* hover glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: meta.glow }}
      />

      {/* Top row: platform + category */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-white/[0.03] text-foreground">
            <Icon size={16} />
          </span>
          <span className="text-sm font-medium text-foreground">
            {meta.label}
          </span>
        </div>
        <span className="rounded-full border border-line bg-white/[0.03] px-2.5 py-1 text-[11px] text-muted">
          {article.category}
        </span>
      </div>

      {/* Title */}
      <h3 className="mt-5 text-pretty font-jp text-base font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-white">
        {article.title}
      </h3>

      {/* Excerpt */}
      {article.excerpt && (
        <p className="mt-2.5 line-clamp-3 text-pretty font-jp text-sm leading-relaxed text-muted">
          {article.excerpt}
        </p>
      )}

      {/* Tags */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {article.tags.map((tag) => (
          <Badge key={tag} className="text-[10px]">
            #{tag}
          </Badge>
        ))}
      </div>

      {/* Footer: date + link affordance */}
      <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
        <time
          dateTime={article.date}
          className="font-mono text-xs text-subtle"
        >
          {formatDate(article.date)}
        </time>
        <span className="flex items-center gap-1 text-xs text-muted transition-colors group-hover:text-accent-cyan">
          記事を読む
          <ArrowUpRight
            size={14}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </div>
    </a>
  );
}
