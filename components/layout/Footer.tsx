import { ArrowUp } from "lucide-react";
import { site, nav } from "@/content/site";
import { socialProfiles } from "@/content/articles";
import { platformMeta } from "@/components/articles/platformMeta";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-10 border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="max-w-xs">
            <a
              href="#top"
              className="flex items-center gap-2.5 text-sm font-semibold tracking-tight"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-cyan text-[13px] font-bold text-white">
                {site.wordmark.trim().charAt(0)}
              </span>
              <span>{site.name}</span>
            </a>
            <p className="mt-4 text-pretty font-jp text-sm leading-relaxed text-muted">
              {site.tagline} で、製造業のDXと業務改善を支援するエンジニアです。
            </p>
          </div>

          {/* Nav + social */}
          <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
            <nav className="flex flex-col gap-3">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-subtle">
                Navigation
              </span>
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm text-muted transition-colors hover:text-foreground"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="flex flex-col gap-3">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-subtle">
                Connect
              </span>
              <div className="flex gap-2.5">
                {socialProfiles.map((p) => {
                  const meta = platformMeta[p.platform];
                  const { Icon } = meta;
                  return (
                    <a
                      key={p.platform}
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={meta.label}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-white/[0.03] text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:text-foreground"
                    >
                      <Icon size={15} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col-reverse items-center gap-4 border-t border-line pt-6 sm:flex-row sm:justify-between">
          <p className="font-mono text-xs text-subtle">
            © {year} {site.name}. All rights reserved.
          </p>
          <a
            href="#top"
            className="group inline-flex items-center gap-2 text-xs text-muted transition-colors hover:text-foreground"
          >
            ページ上部へ
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-line transition-transform duration-300 group-hover:-translate-y-0.5">
              <ArrowUp size={13} />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
