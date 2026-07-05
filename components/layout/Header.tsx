"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { nav, site } from "@/content/site";
import { Button } from "@/components/ui/button";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "relative z-50 mx-auto flex h-16 max-w-6xl items-center justify-between px-5 transition-all duration-500 ease-[var(--ease-out-expo)] sm:px-8",
          scrolled &&
            "mt-3 h-14 max-w-5xl rounded-full border border-line bg-background/60 px-4 shadow-[0_8px_40px_-16px_rgba(0,0,0,0.8)] backdrop-blur-xl sm:px-6",
        )}
      >
        {/* Wordmark */}
        <a
          href="#top"
          className="group flex items-center gap-2.5 text-sm font-semibold tracking-tight"
        >
          <span className="relative flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-cyan text-[13px] font-bold text-white shadow-[0_2px_12px_-2px_rgba(59,130,246,0.6)]">
            {site.wordmark.trim().charAt(0)}
          </span>
          <span className="text-foreground transition-colors group-hover:text-white">
            {site.name}
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-2 text-sm text-muted transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a href="#contact">
            <Button variant="outline" size="sm">
              お問い合わせ
            </Button>
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-foreground md:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-0 z-40 flex flex-col bg-background/95 px-6 pt-24 backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col gap-1">
              {nav.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i + 0.1, duration: 0.4 }}
                  className="border-b border-line py-5 text-2xl font-medium tracking-tight text-foreground"
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
            <a href="#contact" onClick={() => setOpen(false)} className="mt-8">
              <Button variant="accent" size="lg" className="w-full">
                お問い合わせ
              </Button>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
