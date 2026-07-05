import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-[40vh] w-[40vh] -translate-x-1/2 rounded-full bg-accent/20 blur-[120px]"
      />
      <p className="font-mono text-sm tracking-[0.3em] text-accent-cyan">
        404
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
        ページが見つかりません
      </h1>
      <p className="mt-4 max-w-md text-pretty font-jp text-muted">
        お探しのページは移動または削除された可能性があります。
      </p>
      <Link href="/" className="mt-8">
        <Button variant="accent" size="lg">
          <ArrowLeft size={18} />
          トップへ戻る
        </Button>
      </Link>
    </main>
  );
}
