import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * İki tonlu başlık: ilk kısım birincil, ikinci kısım soluk renkte.
 * Metin ilk ". " ya da ", " noktasından ikiye bölünür ("Bir döngü, / dört rol.");
 * bölünecek yer yoksa başlık tek tondur.
 */
export function TwoTone({ text }: { text: string }) {
  const m = /^(.+?[.,])\s+(.+)$/.exec(text);
  if (!m) return <>{text}</>;
  return (
    <>
      <span className="block">{m[1]}</span>
      <span className="block text-faint">{m[2]}</span>
    </>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  as: Tag = "h2",
  id,
  className,
}: {
  eyebrow?: string;
  /** Metin verilirse iki tona bölünür; ReactNode olduğu gibi basılır. */
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  id?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <p className="eyebrow mb-6">{eyebrow}</p>}
      <Tag
        id={id}
        className={cn(
          "font-display font-medium tracking-[-0.035em] text-fg",
          Tag === "h1" ? "text-5xl leading-[0.98] sm:text-6xl lg:text-7xl" : "text-4xl leading-[1] sm:text-5xl",
        )}
      >
        {typeof title === "string" ? <TwoTone text={title} /> : title}
      </Tag>
      {lead && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{lead}</p>}
    </div>
  );
}
