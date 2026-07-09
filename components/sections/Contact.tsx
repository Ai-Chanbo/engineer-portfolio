"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "motion/react";
import { Mail, MapPin, Check, Loader2, ArrowRight } from "lucide-react";
import { contactSchema, type ContactInput } from "@/lib/validation";
import { cn } from "@/lib/utils";
import { site } from "@/content/site";
import { visibleSocialProfiles } from "@/content/articles";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/motion/SectionHeading";
import { FadeIn } from "@/components/motion/FadeIn";
import { platformMeta } from "@/components/articles/platformMeta";

type Status = "idle" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [done, setDone] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  const onSubmit: SubmitHandler<ContactInput> = async (values, event) => {
    setStatus("idle");
    setErrorMsg("");
    // Read the honeypot from the submitted form (empty for real users).
    const form = event?.target as HTMLFormElement | undefined;
    const honeypot =
      (form?.elements.namedItem("website") as HTMLInputElement | null)?.value ??
      "";
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: honeypot }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) {
        setStatus("error");
        setErrorMsg(json.error ?? "送信に失敗しました。時間をおいて再度お試しください。");
        return;
      }
      reset();
      setDone(true);
    } catch {
      setStatus("error");
      setErrorMsg("ネットワークエラーが発生しました。接続をご確認ください。");
    }
  }

  return (
    <section
      id="contact"
      className="relative mx-auto max-w-6xl scroll-mt-24 px-5 py-28 sm:px-8 md:py-36"
    >
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        {/* Left: intro + details */}
        <div>
          <SectionHeading
            eyebrow="04 — Contact"
            title={
              <>
                一緒に、
                <span className="text-gradient">現場の課題を解決しませんか。</span>
              </>
            }
            description="案件のご相談・お見積り・技術的なお問い合わせなど、お気軽にご連絡ください。通常2営業日以内にご返信します。"
          />

          <FadeIn className="mt-10 flex flex-col gap-4">
            {site.email && (
              <a
                href={`mailto:${site.email}`}
                className="group flex items-center gap-3 text-sm text-muted transition-colors hover:text-foreground"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-white/[0.03] text-accent-cyan">
                  <Mail size={17} strokeWidth={1.75} />
                </span>
                <span className="font-mono">{site.email}</span>
              </a>
            )}
            <div className="flex items-center gap-3 text-sm text-muted">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-white/[0.03] text-accent-cyan">
                <MapPin size={17} strokeWidth={1.75} />
              </span>
              <span>{site.location}・リモート対応可</span>
            </div>
          </FadeIn>

          {visibleSocialProfiles.length > 0 && (
            <FadeIn className="mt-8 flex flex-wrap gap-2.5">
              {visibleSocialProfiles.map((p) => {
                const meta = platformMeta[p.platform];
                const { Icon } = meta;
                return (
                  <a
                    key={p.platform}
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={p.label ?? meta.label}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-white/[0.03] text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:text-foreground"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </FadeIn>
          )}
        </div>

        {/* Right: form / success */}
        <FadeIn y={28}>
          <div className="glass relative overflow-hidden rounded-3xl p-6 sm:p-9">
            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/15 blur-3xl" />

            <AnimatePresence mode="wait">
              {done ? (
                <SuccessScreen key="success" onReset={() => setDone(false)} />
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  className="relative flex flex-col gap-5"
                >
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Field label="お名前" required error={errors.name?.message}>
                      <input
                        {...register("name")}
                        type="text"
                        autoComplete="name"
                        placeholder="山田 太郎"
                        className={inputCls(!!errors.name)}
                      />
                    </Field>
                    <Field
                      label="メールアドレス"
                      required
                      error={errors.email?.message}
                    >
                      <input
                        {...register("email")}
                        type="email"
                        autoComplete="email"
                        placeholder="you@company.com"
                        className={inputCls(!!errors.email)}
                      />
                    </Field>
                  </div>

                  <Field label="会社名" error={errors.company?.message}>
                    <input
                      {...register("company")}
                      type="text"
                      autoComplete="organization"
                      placeholder="株式会社〇〇（任意）"
                      className={inputCls(!!errors.company)}
                    />
                  </Field>

                  <Field
                    label="お問い合わせ内容"
                    required
                    error={errors.message?.message}
                  >
                    <textarea
                      {...register("message")}
                      rows={5}
                      placeholder="ご相談内容をご記入ください。"
                      className={cn(inputCls(!!errors.message), "resize-none")}
                    />
                  </Field>

                  {/* Honeypot (hidden from users) */}
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden
                    className="absolute left-[-9999px] h-0 w-0 opacity-0"
                  />

                  {status === "error" && (
                    <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                      {errorMsg}
                    </p>
                  )}

                  <Button
                    type="submit"
                    variant="accent"
                    size="lg"
                    disabled={isSubmitting}
                    className="mt-1 w-full"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        送信中…
                      </>
                    ) : (
                      <>
                        送信する
                        <ArrowRight size={18} />
                      </>
                    )}
                  </Button>
                  <p className="text-center text-xs text-subtle">
                    送信いただいた内容は案件対応の目的のみに利用します。
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function SuccessScreen({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col items-center py-10 text-center"
    >
      <motion.span
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 220, damping: 16 }}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-cyan text-white shadow-[0_10px_40px_-8px_rgba(34,211,238,0.6)]"
      >
        <Check size={30} strokeWidth={2.5} />
      </motion.span>
      <h3 className="mt-6 text-2xl font-semibold tracking-tight">
        送信が完了しました
      </h3>
      <p className="mt-3 max-w-sm text-pretty font-jp text-sm leading-relaxed text-muted">
        お問い合わせありがとうございます。内容を確認のうえ、通常2営業日以内にご返信いたします。
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-8 text-sm text-accent-cyan underline-offset-4 transition hover:underline"
      >
        別のお問い合わせを送る
      </button>
    </motion.div>
  );
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="ml-1 text-accent-cyan">*</span>}
      </span>
      {children}
      {error && <span className="text-xs text-red-400">{error}</span>}
    </label>
  );
}

function inputCls(hasError: boolean) {
  return cn(
    "w-full rounded-xl border bg-white/[0.02] px-4 py-3 text-sm text-foreground placeholder:text-subtle transition-colors duration-200 outline-none focus:border-accent/60 focus:bg-white/[0.04] focus:ring-2 focus:ring-accent/20",
    hasError ? "border-red-500/50" : "border-line",
  );
}
