import Link from "next/link";
import { modules } from "@/lib/content/modules";
import { services } from "@/lib/content/services";
import { ui } from "@/lib/content/nav";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ModuleCode, SoonBadge } from "@/components/ui/module-mark";
import { Reveal } from "@/components/animations/reveal";
import { cn } from "@/lib/utils";

/**
 * Modüller arası ilişki: Flusso → Polso → Bilancia → Porto zinciri,
 * Bilancia'dan Flusso'ya dönen geri besleme yayı. Akış çizgileri nötr ve CSS
 * ile hareket eder (globals.css: .flow-*).
 */
export function ModuleDiagram() {
  const { diagram } = services;
  return (
    <section className="relative py-24 sm:py-32" aria-labelledby="diagram-title">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={diagram.eyebrow} title={diagram.title} lead={diagram.lead} id="diagram-title" />
        </Reveal>

        <Reveal delay={0.1} className="relative mt-16 lg:mt-28">
          {/* Geri besleme yayı: Bilancia → Flusso (yalnızca masaüstü) */}
          <div aria-hidden className="absolute -top-16 right-0 left-0 hidden h-16 lg:block">
            <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="absolute inset-0 size-full overflow-visible">
              <path
                d="M62.5,40 C62.5,4 12.5,4 12.5,40"
                fill="none"
                stroke="var(--color-line-strong)"
                strokeWidth={1}
                vectorEffect="non-scaling-stroke"
                className="flow-dash"
              />
            </svg>
            <p className="eyebrow absolute top-0 left-[37.5%] -translate-x-1/2 -translate-y-1/2 bg-bg px-3 whitespace-nowrap">
              {diagram.loopNote}
            </p>
          </div>

          <ol className="relative grid gap-10 lg:grid-cols-4">
            {modules.map((m, i) => {
              const last = i === modules.length - 1;
              const soon = m.status === "soon";
              return (
                <li key={m.slug} className="relative">
                  <Link
                    href={`/hizmetler/${m.slug}`}
                    className={cn(
                      "flex h-full flex-col gap-5 rounded-card border bg-surface p-6 transition-colors duration-200 hover:bg-surface-2",
                      soon ? "border-dashed border-line" : "border-line hover:border-line-strong",
                    )}
                  >
                    <span className="flex items-center justify-between gap-2">
                      <span className="eyebrow">{`0${i + 1}`}</span>
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

                  {!last && (
                    <>
                      <span aria-hidden className="flow-x absolute top-1/2 left-full hidden h-px w-10 lg:block" />
                      <span aria-hidden className="flow-y absolute top-full left-8 h-10 w-px lg:hidden" />
                    </>
                  )}
                </li>
              );
            })}
          </ol>
        </Reveal>
      </Container>
    </section>
  );
}
