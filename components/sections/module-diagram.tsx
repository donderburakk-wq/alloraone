import Link from "next/link";
import { Database } from "lucide-react";
import { modules, type ModuleSlug } from "@/lib/content/modules";
import { services } from "@/lib/content/services";
import { ui } from "@/lib/content/nav";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ModuleCode, SoonBadge } from "@/components/ui/module-mark";
import { Reveal } from "@/components/animations/reveal";
import { cn } from "@/lib/utils";

/**
 * Modüller arası ilişki. Üstte işletmenin veritabanı → Lente (temel katman);
 * Lente'den Flusso, Polso ve Bilancia'ya inen akış. Alt satırda
 * Flusso → Polso → Bilancia → Porto zinciri ve Bilancia'dan Flusso'ya dönen
 * geri besleme yayı. Akış çizgileri nötr ve CSS ile hareket eder
 * (globals.css: .flow-*). Mobilde tüm düğümler tek sütunda alt alta akar.
 */
const FEEDS_FROM_LENTE: ModuleSlug[] = ["flusso", "polso", "bilancia"];

export function ModuleDiagram() {
  const { diagram, source } = services;
  // Diyagramın okuma sırası: Lente en üstte, ardından karar modülleri ve Porto.
  const ordered = [...modules].sort((a, b) => rank(a.slug) - rank(b.slug));
  return (
    <section className="relative py-24 sm:py-32" aria-labelledby="diagram-title">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={diagram.eyebrow} title={diagram.title} lead={diagram.lead} id="diagram-title" />
        </Reveal>

        <Reveal delay={0.1} className="relative mt-16 lg:mt-20 lg:pb-20">
          <ol className="relative grid gap-10 lg:grid-cols-4">
            {/* Veri katmanı */}
            <li className="relative lg:col-span-3">
              <div className="flex h-full items-center gap-5 rounded-card border border-dashed border-line bg-surface p-6">
                <Database aria-hidden strokeWidth={1.25} className="size-7 shrink-0 text-muted" />
                <span className="flex flex-col gap-1.5">
                  <span className="eyebrow">{source.eyebrow}</span>
                  <span className="font-display text-2xl font-medium tracking-[-0.025em]">{source.title}</span>
                  <span className="text-muted">{source.text}</span>
                </span>
              </div>
              <span aria-hidden className="flow-y absolute top-full left-8 h-10 w-px lg:left-1/2" />
            </li>

            {ordered.map((m, i) => {
              const base = m.slug === "lente";
              const soon = m.status === "soon";
              const last = i === ordered.length - 1;
              return (
                <li key={m.slug} className={cn("relative", base && "lg:col-span-3", m.slug === "flusso" && "lg:col-start-1")}>
                  <Link
                    href={`/hizmetler/${m.slug}`}
                    className={cn(
                      "flex h-full flex-col gap-5 rounded-card border bg-surface p-6 transition-colors duration-200 hover:bg-surface-2",
                      soon ? "border-dashed border-line" : "border-line hover:border-line-strong",
                    )}
                  >
                    <span className="flex items-center justify-between gap-2">
                      <span className="eyebrow">{`0${modules.indexOf(m) + 1}`}</span>
                      {soon && <SoonBadge label={ui.soon} />}
                    </span>
                    <span className="font-display text-3xl font-medium tracking-[-0.03em]">
                      <span className="block text-faint">AlloraOne</span>
                      {m.name}
                    </span>
                    <span className="flex flex-col gap-1.5">
                      <ModuleCode module={m} />
                      <span className="text-fg">{m.role}</span>
                    </span>
                  </Link>

                  {/* Lente → Flusso, Polso, Bilancia (masaüstünde kartın üstüne) */}
                  {FEEDS_FROM_LENTE.includes(m.slug) && (
                    <span aria-hidden className="flow-y absolute bottom-full left-1/2 hidden h-10 w-px lg:block" />
                  )}
                  {/* Zincir: Flusso → Polso → Bilancia → Porto */}
                  {!base && !last && (
                    <span aria-hidden className="flow-x absolute top-1/2 left-full hidden h-px w-10 lg:block" />
                  )}
                  {/* Mobil: her düğümden bir sonrakine */}
                  {!last && <span aria-hidden className="flow-y absolute top-full left-8 h-10 w-px lg:hidden" />}
                </li>
              );
            })}
          </ol>

          {/* Geri besleme yayı: Bilancia → Flusso (yalnızca masaüstü, kartların altında) */}
          <div aria-hidden className="absolute right-0 bottom-0 left-0 hidden h-16 lg:block">
            <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="absolute inset-0 size-full overflow-visible">
              <path
                d="M62.5,0 C62.5,36 12.5,36 12.5,0"
                fill="none"
                stroke="var(--color-line-strong)"
                strokeWidth={1}
                vectorEffect="non-scaling-stroke"
                className="flow-dash"
              />
            </svg>
            <p className="eyebrow absolute bottom-0 left-[37.5%] -translate-x-1/2 translate-y-1/2 bg-bg px-3 whitespace-nowrap">
              {diagram.loopNote}
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function rank(slug: ModuleSlug) {
  return { lente: 0, flusso: 1, polso: 2, bilancia: 3, porto: 4 }[slug];
}
