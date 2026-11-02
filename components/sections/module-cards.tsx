import Link from "next/link";
import type { ComponentType } from "react";
import { ArrowUpRight } from "lucide-react";
import { home } from "@/lib/content/home";
import { modules, type Module, type ModuleSlug } from "@/lib/content/modules";
import { ui } from "@/lib/content/nav";
import { ModuleCode, SoonBadge } from "@/components/ui/module-mark";
import { Reveal } from "@/components/animations/reveal";
import { BilanciaScale, FlussoMini, LenteLens, PolsoPulse, PortoShelves } from "@/components/animations/module-minis";
import { cn } from "@/lib/utils";

export const moduleMinis: Record<ModuleSlug, ComponentType> = {
  flusso: FlussoMini,
  polso: PolsoPulse,
  bilancia: BilanciaScale,
  lente: LenteLens,
  porto: PortoShelves,
};

/** Kartlar arasında 1px ayraç: dış kenarlıklı tek ızgara (referans dili). */
export function ModuleCards({
  items = modules,
  showCode = true,
  className,
}: {
  items?: Module[];
  /** Ana sayfada false: modül kodları yalnızca hizmet sayfalarında gösterilir. */
  showCode?: boolean;
  className?: string;
}) {
  return (
    <Reveal className={className}>
      <ul className="grid gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-2 lg:grid-cols-6">
        {items.map((m, i) => (
          <li key={m.slug} className={cn("bg-bg", spanClass(i, items.length))}>
            <ModuleCard module={m} showCode={showCode} />
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

/**
 * Masaüstünde 6 sütunlu ızgara: 5 kartta üst satırda 3 eşit kart (2'şer sütun),
 * alt satırda 2 geniş kart (3'er sütun). Tablette son tek kart tam genişlik alır.
 */
function spanClass(i: number, n: number) {
  if (n === 5) {
    return i < 3 ? "lg:col-span-2" : i === 4 ? "md:col-span-2 lg:col-span-3" : "lg:col-span-3";
  }
  return "lg:col-span-3";
}

export function ModuleCard({
  module: m,
  showCode = true,
  className,
}: {
  module: Module;
  showCode?: boolean;
  className?: string;
}) {
  const Mini = moduleMinis[m.slug];
  return (
    <Link
      href={`/hizmetler/${m.slug}`}
      className={cn("group flex h-full flex-col bg-bg transition-colors duration-200 hover:bg-surface", className)}
    >
      {showCode && (
        <div className="flex items-center justify-between gap-3 border-b border-line-soft px-6 py-4 sm:px-8">
          <ModuleCode module={m} />
          <CardMarks soon={m.status === "soon"} />
        </div>
      )}
      <div className="aspect-[16/9] px-8 pt-6 pb-2 sm:px-14">
        <Mini />
      </div>
      <div className="flex flex-1 flex-col gap-3 px-6 pt-4 pb-8 sm:px-8">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-3xl font-medium tracking-[-0.03em]">
            <span className="text-faint">AlloraOne </span>
            {m.name}
          </h3>
          {!showCode && <CardMarks soon={m.status === "soon"} className="mt-2" />}
        </div>
        <p className="max-w-md leading-relaxed text-muted">{m.summary}</p>
        <span className="sr-only">
          {home.modules.cardCta}: AlloraOne {m.name}
        </span>
      </div>
    </Link>
  );
}

function CardMarks({ soon, className }: { soon: boolean; className?: string }) {
  return (
    <span className={cn("flex shrink-0 items-center gap-2", className)}>
      {soon && <SoonBadge label={ui.soon} />}
      <ArrowUpRight
        aria-hidden
        strokeWidth={1.5}
        className="size-4 text-faint transition-colors duration-200 group-hover:text-fg"
      />
    </span>
  );
}
