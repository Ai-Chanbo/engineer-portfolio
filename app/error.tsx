"use client";

import { useEffect } from "react";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-sm tracking-[0.3em] text-accent-cyan">
        ERROR
      </p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
        問題が発生しました
      </h1>
      <p className="mt-4 max-w-md text-pretty font-jp text-muted">
        予期しないエラーが発生しました。お手数ですが、再度お試しください。
      </p>
      <Button onClick={reset} variant="accent" size="lg" className="mt-8">
        <RotateCcw size={18} />
        再読み込み
      </Button>
    </main>
  );
}
