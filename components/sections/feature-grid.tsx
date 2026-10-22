import type { Module, ModuleFeature } from "@/lib/content/modules";
import { services } from "@/lib/content/services";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/animations/reveal";
import { cn } from "@/lib/utils";

/** "İtalyanca isim · Türkçe karşılık" başlıklı, 01/02/03 numaralı özellikler. */
export function FeatureGrid({ module: m }: { module: Module }) {
  const { modulePage } = services;
  const regular = m.features.filter((f) => !f.highlight);
  const highlights = m.features.filter((f) => f.highlight);
  const cols = regular.length === 3 ? "lg:grid-cols-3" : "md:grid-cols-2";

  return (
    <section className="relative py-24 sm:py-32" aria-labelledby="features-title">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={modulePage.featuresEyebrow} title={modulePage.featuresTitle} id="features-title" />
        </Reveal>
        <Reveal className="mt-14">
          <ul className={cn("grid gap-px overflow-hidden rounded-card border border-line bg-line", cols)}>
            {regular.map((f, i) => (
              <li
                key={f.it}
                className={cn("bg-bg", regular.length % 2 === 1 && regular.length !== 3 && i === regular.length - 1 && "md:col-span-2")}
              >
                <FeatureCard feature={f} index={i} />
              </li>
            ))}
          </ul>
        </Reveal>
        {highlights.map((f) => (
          <Reveal key={f.it} className="mt-6">
            <HighlightCard feature={f} index={regular.length} />
          </Reveal>
        ))}
      </Container>
    </section>
  );
}

export function FeatureTitle({ feature: f, as: Tag = "h3" }: { feature: ModuleFeature; as?: "h3" | "h4" }) {
  return (
    <Tag className="flex flex-wrap items-baseline gap-x-2">
      <span className="font-display text-2xl font-medium tracking-[-0.025em] text-fg">{f.it}</span>
      <span aria-hidden className="text-faint">·</span>
      <span className="text-muted">{f.tr}</span>
    </Tag>
  );
}

function FeatureCard({ feature: f, index }: { feature: ModuleFeature; index: number }) {
  return (
    <article className="flex h-full flex-col gap-6 p-7 transition-colors duration-200 hover:bg-surface sm:p-8">
      <div className="flex items-center justify-between">
        <span className="eyebrow">{`0${index + 1}`}</span>
        <Icon name={f.icon} className="size-5 text-muted" />
      </div>
      <FeatureTitle feature={f} />
      <p className="leading-relaxed text-muted">{f.description}</p>
    </article>
  );
}

/** Ürünün ayırt edici özelliği (Meteo): geniş kart + çarpan görseli. */
function HighlightCard({ feature: f, index }: { feature: ModuleFeature; index: number }) {
  const { modulePage, meteoDemo } = services;
  const fmt = new Intl.NumberFormat("tr-TR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const max = 1.5;
  return (
    <article className="grid gap-10 rounded-card border border-line bg-surface p-7 sm:p-10 lg:grid-cols-2 lg:items-center">
      <div className="flex flex-col gap-5">
        <p className="eyebrow flex items-center gap-2">
          {`0${index + 1}`} <span aria-hidden>·</span>
          <span className="inline-flex items-center gap-1.5 text-fg">
            <span aria-hidden className="size-1.5 rounded-full bg-accent" />
            {modulePage.highlightLabel}
          </span>
        </p>
        <Icon name={f.icon} className="size-6 text-muted" />
        <FeatureTitle feature={f} />
        <p className="max-w-lg text-lg leading-relaxed text-muted">{f.description}</p>
      </div>

      <figure className="rounded-card border border-line bg-bg p-6">
        <figcaption className="flex items-center justify-between gap-3">
          <span className="text-sm text-fg">{meteoDemo.title}</span>
          <span className="eyebrow">{meteoDemo.caption}</span>
        </figcaption>
        <ul className="mt-6 flex flex-col gap-4">
          {meteoDemo.rows.map((r) => (
            <li key={r.product} className="grid grid-cols-[5.5rem_1fr_3rem] items-center gap-3 text-sm">
              <span className="text-muted">{r.product}</span>
              <span className="relative h-2.5">
                <span
                  className={cn("absolute inset-y-0 left-0 rounded-r-[3px]", r.factor > 1 ? "bg-accent" : "bg-line-strong")}
                  style={{ width: `${(r.factor / max) * 100}%` }}
                />
                {/* 1,0 = düzeltme yok */}
                <span aria-hidden className="absolute -inset-y-1.5 w-px bg-fg/50" style={{ left: `${(1 / max) * 100}%` }} />
              </span>
              <span className="text-right font-mono text-fg">×{fmt.format(r.factor)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-3 grid grid-cols-[5.5rem_1fr_3rem] gap-3 font-mono text-[0.65rem] text-faint">
          <span />
          <span className="relative h-3">
            <span className="absolute -translate-x-1/2" style={{ left: `${(1 / max) * 100}%` }}>
              ×1,0
            </span>
          </span>
          <span />
        </div>
      </figure>
    </article>
  );
}
