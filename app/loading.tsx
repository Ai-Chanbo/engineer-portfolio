export default function Loading() {
  return (
    <div className="flex min-h-dvh items-center justify-center" aria-busy>
      <span className="sr-only">読み込み中</span>
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-accent-cyan" />
    </div>
  );
}
