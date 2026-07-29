"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  /** 遷移先。同一ページ内は "#contact"、他ページからは "/#contact"。既定 "/#contact"。 */
  href?: string;
  children: React.ReactNode;
  className?: string;
} & VariantProps<typeof buttonVariants>;

/**
 * Contactセクションへの遷移を共通化するCTAボタン。
 *
 * ・同一ページではスムーズスクロール（reduced-motion を尊重）
 * ・クロスページではブラウザ標準のアンカー遷移
 */
export function ContactCTAButton({
  href = "/#contact",
  variant = "accent",
  size = "md",
  className,
  children,
}: Props) {
  const pathname = usePathname();

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    // 新規タブ等の修飾クリック・非左クリック・既に抑止済みは本来の動作へ任せる
    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey
    ) {
      return;
    }

    const hashIndex = href.indexOf("#");
    if (hashIndex < 0) return; // ハッシュ無し → 通常の Link 遷移に任せる

    const hash = href.slice(hashIndex + 1);
    const rawPath = href.slice(0, hashIndex);
    const targetPath = rawPath === "" ? pathname : rawPath;
    const isSamePage = targetPath === pathname;

    if (isSamePage) {
      const el = document.getElementById(hash);
      if (!el) return; // 対象が無ければ通常の Link 挙動へフォールバック
      e.preventDefault();
      const prefersReduced =
        window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
      el.scrollIntoView({
        behavior: prefersReduced ? "auto" : "smooth",
        block: "start",
      });
      history.pushState(null, "", `#${hash}`);
    } else {
      // クロスページ：フルページ遷移でブラウザ標準のハッシュスクロールへ委譲
      e.preventDefault();
      navigateToTarget(href);
    }
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={cn(buttonVariants({ variant, size }), className)}
    >
      {children}
    </Link>
  );
}

/**
 * クロスページ遷移の実処理。将来 Analytics イベント送信などを差し込みやすいよう分離。
 */
function navigateToTarget(targetHref: string) {
  window.location.assign(targetHref);
}
