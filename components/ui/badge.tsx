import { cn } from "@/lib/utils";

/**
 * Small pill used for tech tags and keywords.
 */
export function Badge({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-line bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] tracking-wide text-muted transition-colors hover:border-line-strong hover:text-foreground",
        className,
      )}
      {...props}
    />
  );
}
