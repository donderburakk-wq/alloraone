import type { Module } from "@/lib/content/modules";
import { cn } from "@/lib/utils";

/**
 * Modüller renkle değil, mono kod etiketi ve tipografiyle ayrışır.
 * Kullanım: <ModuleCode module={m} /> → "AFX · ALOKASYON"
 */
export function ModuleCode({
  module: m,
  short,
  className,
}: {
  module: Pick<Module, "code" | "label">;
  /** Yalnızca kod: "AFX" */
  short?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("eyebrow inline-flex items-center gap-2 whitespace-nowrap text-muted", className)}>
      <span className="text-fg">{m.code}</span>
      {!short && (
        <>
          <span aria-hidden>·</span>
          {m.label}
        </>
      )}
    </span>
  );
}

/** "AlloraOne" küçük, modül adı büyük. */
export function ModuleWordmark({
  name,
  className,
  size = "md",
}: {
  name: string;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}) {
  const sizes = {
    sm: "text-xl",
    md: "text-3xl",
    lg: "text-5xl sm:text-6xl",
    xl: "text-6xl sm:text-7xl lg:text-8xl",
  } as const;
  return (
    <span className={cn("inline-flex flex-col leading-none", className)}>
      <span className="eyebrow mb-[0.6em]">AlloraOne</span>
      <span className={cn("font-display font-medium tracking-[-0.035em]", sizes[size])}>{name}</span>
    </span>
  );
}

export function SoonBadge({ label, className }: { label: string; className?: string }) {
  return (
    <span
      className={cn(
        "eyebrow inline-flex items-center gap-1.5 rounded-full border border-line px-2 py-0.5 text-[0.625rem]! text-muted",
        className,
      )}
    >
      <span aria-hidden className="size-1 rounded-full bg-faint" />
      {label}
    </span>
  );
}
