import type { ReactNode } from "react";
import { ArrowRight, CircleAlert, Lightbulb, TriangleAlert } from "lucide-react";
import type { Module } from "@/lib/content/modules";
import { services } from "@/lib/content/services";
import { bilanciaMock, flussoMock, polsoMock } from "@/lib/content/mock";
import { Container } from "@/components/ui/container";
import { LangText } from "@/components/ui/lang-text";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/animations/reveal";

import { cn } from "@/lib/utils";

/**
 * Modül sayfalarındaki "örnek ekran": kodla çizilmiş, temsilî verili
 * arayüz önizlemesi. Dekoratiftir; içerik figcaption ile özetlenir.
 */
export function DashboardPreview({ module: m }: { module: Module }) {
  const { modulePage } = services;
  const body =
    m.slug === "flusso" ? <FlussoBody /> : m.slug === "polso" ? <PolsoBody /> : m.slug === "bilancia" ? <BilanciaBody /> : null;
  if (!body) return null;
  const meta =
    m.slug === "flusso" ? flussoMock : m.slug === "polso" ? polsoMock : { title: bilanciaMock.title, period: bilanciaMock.product };

  return (
    <section className="relative py-24 sm:py-32" aria-labelledby="preview-title">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={modulePage.previewEyebrow} title={modulePage.previewTitle} id="preview-title" />
        </Reveal>
        <Reveal delay={0.1}>
          <figure className="mt-14">
            <div
              aria-hidden
              className="overflow-hidden rounded-card border border-line bg-surface"
            >
              <div className="flex items-center gap-4 border-b border-line-soft px-5 py-3.5">
                <span className="flex gap-1.5">
                  <span className="size-2.5 rounded-full bg-line" />
                  <span className="size-2.5 rounded-full bg-line" />
                  <span className="size-2.5 rounded-full bg-line" />
                </span>
                <span className="truncate text-sm text-fg">{meta.title}</span>
                <span className="eyebrow ml-auto hidden sm:block">{meta.period}</span>
              </div>
              <div className="p-4 sm:p-6 lg:p-8">{body}</div>
            </div>
            <figcaption className="mt-4 text-sm text-faint">{modulePage.previewNote}</figcaption>
          </figure>
        </Reveal>
      </Container>
    </section>
  );
}

function Panel({ title, children, className }: { title?: string; children: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-control border border-line-soft bg-bg p-4 sm:p-5", className)}>
      {title && <p className="eyebrow mb-4"><LangText text={title} /></p>}
      {children}
    </div>
  );
}

const fmt1 = new Intl.NumberFormat("tr-TR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

// --- Flusso ------------------------------------------------------------------

function FlussoBody() {
  const d = flussoMock;
  return (
    <div className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-3">
        {d.kpis.map((k) => (
          <Panel key={k.label}>
            <p className="eyebrow"><LangText text={k.label} /></p>
            <p className="mt-2 text-3xl font-medium tracking-[-0.03em] text-fg">
              {k.value} <span className="text-base font-normal text-muted">{k.unit}</span>
            </p>
          </Panel>
        ))}
      </div>
      <Panel className="overflow-x-auto p-0 sm:p-0">
        <table className="w-full min-w-[34rem] text-left text-sm">
          <thead>
            <tr className="eyebrow border-b border-line-soft">
              {d.columns.map((c, i) => (
                <th key={c} className={cn("px-4 py-3 font-normal sm:px-5", i >= 2 && "text-right")}>
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="tabular-nums">
            {d.rows.map((r) => (
              <tr key={r.store + r.item} className="border-b border-line-soft last:border-0">
                <td className="px-4 py-3 text-fg sm:px-5">{r.store}</td>
                <td className="px-4 py-3 text-muted sm:px-5">{r.item}</td>
                <td className="px-4 py-3 text-right font-mono text-muted sm:px-5">{r.stock}</td>
                <td className="px-4 py-3 text-right font-mono text-fg sm:px-5">
                  {r.suggest > 0 ? `+${r.suggest}` : "0"}
                </td>
                <td className="px-4 py-3 text-right sm:px-5">
                  <span
                    className={cn(
                      "rounded-full border px-2 py-0.5 font-mono text-xs",
                      r.meteo !== 1 ? "border-line-strong text-fg" : "border-line text-muted",
                    )}
                  >
                    ×{fmt1.format(r.meteo)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Panel className="flex-1">
          <p className="eyebrow"><LangText text={d.transfer.label} /></p>
          <p className="mt-2 flex flex-wrap items-center gap-2 text-fg">
            {d.transfer.text}
            <span className="text-muted">· {d.transfer.qty}</span>
          </p>
        </Panel>
        <span className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-fg px-5 text-xs font-medium tracking-[0.08em] text-bg uppercase">
          {d.approve}
          <ArrowRight className="size-4" />
        </span>
      </div>
    </div>
  );
}

// --- Polso -------------------------------------------------------------------

function PolsoBody() {
  const d = polsoMock;
  const maxRank = Math.max(...d.ranking.rows.map((r) => r.value));
  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {d.kpis.map((k) => (
          <Panel key={k.label}>
            <p className="eyebrow"><LangText text={k.label} /></p>
            <p className="mt-2 text-2xl font-medium tracking-[-0.03em] text-fg sm:text-3xl">{k.value}</p>
            <p className="mt-1 text-xs text-muted">
              {/* Ok yönü değişimin işaretini, renk iyi/kötü olduğunu gösterir */}
              <span className={k.up ? "text-success" : "text-danger"}>{k.delta.startsWith("−") ? "▼" : "▲"}</span>{" "}
              {k.delta}
            </p>
          </Panel>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-5">
        <Panel title={d.trendLabel} className="lg:col-span-3">
          <Sparkline values={d.trend} />
        </Panel>
        <Panel title={d.ranking.title} className="lg:col-span-2">
          <ul className="flex flex-col gap-3">
            {d.ranking.rows.map((r) => (
              <li key={r.name} className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1.5 text-sm">
                <span className="truncate text-fg">{r.name}</span>
                <span className="font-mono text-muted">%{r.value}</span>
                <span className="col-span-2 h-2 rounded-r-[4px] bg-line-soft">
                  <span className="block h-full rounded-r-[4px] bg-accent" style={{ width: `${(r.value / maxRank) * 100}%` }} />
                </span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title={d.alerts.title}>
          <ul className="flex flex-col gap-3">
            {d.alerts.items.map((a) => {
              const AlertIcon = a.level === "critical" ? CircleAlert : TriangleAlert;
              return (
                <li key={a.text} className="flex items-start gap-3 text-sm">
                  <AlertIcon
                    className={cn("mt-0.5 size-4 shrink-0", a.level === "critical" ? "text-danger" : "text-warning")}
                    strokeWidth={1.75}
                  />
                  <span>
                    <span className="text-fg">{a.label}</span>
                    <span className="text-muted"> · {a.text}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </Panel>
        <Panel title={d.advice.label}>
          <p className="flex items-start gap-3 text-sm text-fg">
            <Lightbulb className="mt-0.5 size-4 shrink-0 text-muted" strokeWidth={1.5} />
            {d.advice.text}
          </p>
        </Panel>
      </div>
    </div>
  );
}

/** Tek seri çizgi: 2px çizgi, %10 alan dolgusu, uçta halkalı işaret ve değer. */
function Sparkline({ values }: { values: number[] }) {
  const w = 600;
  const h = 180;
  const pad = { l: 8, r: 64, t: 16, b: 16 };
  const min = Math.floor(Math.min(...values) - 2);
  const max = Math.ceil(Math.max(...values) + 2);
  const x = (i: number) => pad.l + (i / (values.length - 1)) * (w - pad.l - pad.r);
  const y = (v: number) => pad.t + (1 - (v - min) / (max - min)) * (h - pad.t - pad.b);
  const line = values.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  const area = `${line} L${x(values.length - 1)},${h - pad.b} L${x(0)},${h - pad.b} Z`;
  const last = values.length - 1;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-auto w-full">
      {[0.25, 0.5, 0.75].map((f) => (
        <line key={f} x1={pad.l} x2={w - pad.r} y1={pad.t + f * (h - pad.t - pad.b)} y2={pad.t + f * (h - pad.t - pad.b)} stroke="var(--color-line-soft)" strokeWidth={1} />
      ))}
      <line x1={pad.l} x2={w - pad.r} y1={h - pad.b} y2={h - pad.b} stroke="var(--color-line)" strokeWidth={1} />
      <path d={area} fill="var(--color-accent)" fillOpacity={0.1} />
      <path d={line} fill="none" stroke="var(--color-accent)" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={x(last)} cy={y(values[last])} r={5} fill="var(--color-accent)" stroke="var(--color-bg)" strokeWidth={2} />
      <text x={x(last) + 12} y={y(values[last]) + 5} fill="var(--color-fg)" fontSize={16} fontFamily="var(--font-mono)">
        %{fmt1.format(values[last])}
      </text>
    </svg>
  );
}

// --- Bilancia ----------------------------------------------------------------

function BilanciaBody() {
  const d = bilanciaMock;
  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <Panel className="lg:col-span-3">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-sm">
          <span className="text-fg">{d.product}</span>
          <span className="flex gap-2">
            <span className="rounded-full border border-line px-2.5 py-0.5 font-mono text-xs text-muted">
              {d.elasticity.label} {d.elasticity.value}
            </span>
          </span>
        </div>
        <ElasticityChart />
        <p className="mt-4 text-sm text-muted">
          <span className="eyebrow"><LangText text={d.market.label} /></span>
          <span className="text-fg"> · {d.market.value}</span>
        </p>
      </Panel>
      <Panel title={d.table.title} className="overflow-x-auto lg:col-span-2">
        <table className="w-full min-w-[22rem] text-left text-sm">
          <thead>
            <tr className="eyebrow border-b border-line-soft">
              {d.table.columns.map((c, i) => (
                <th key={c} className={cn("py-2 pr-3 font-normal", i > 0 && "text-right")}>
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="tabular-nums">
            {d.table.rows.map((r) => (
              <tr key={r.product} className="border-b border-line-soft last:border-0">
                <td className="py-3 pr-3 text-fg">{r.product}</td>
                <td className="py-3 pr-3 text-right font-mono text-muted">{r.price}</td>
                <td className="py-3 pr-3 text-right font-mono text-fg">{r.discount}</td>
                <td className="py-3 pr-3 text-right text-muted">{r.when}</td>
                <td className="py-3 text-right font-mono text-fg">{r.uplift}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </div>
  );
}

function ElasticityChart() {
  const d = bilanciaMock;
  const w = 600;
  const h = 260;
  const pad = { l: 48, r: 24, t: 16, b: 56 };
  const prices = d.curve.map((p) => p.price);
  const minX = Math.min(...prices);
  const maxX = Math.max(...prices);
  const maxY = 200;
  const x = (p: number) => pad.l + ((p - minX) / (maxX - minX)) * (w - pad.l - pad.r);
  const y = (v: number) => pad.t + (1 - v / maxY) * (h - pad.t - pad.b);
  const path = d.curve.map((p, i) => `${i ? "L" : "M"}${x(p.price).toFixed(1)},${y(p.demand).toFixed(1)}`).join(" ");
  const at = (price: number) => d.curve.find((p) => p.price === price)!;
  const cur = at(d.current.price);
  const sug = at(d.suggested.price);
  const thousands = new Intl.NumberFormat("tr-TR");

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-auto w-full" fontFamily="var(--font-mono)">
      {[50, 100, 150, 200].map((v) => (
        <g key={v}>
          <line x1={pad.l} x2={w - pad.r} y1={y(v)} y2={y(v)} stroke="var(--color-line-soft)" strokeWidth={1} />
          <text x={pad.l - 10} y={y(v) + 4} fontSize={12} fill="var(--color-faint)" textAnchor="end">
            {v}
          </text>
        </g>
      ))}
      <line x1={pad.l} x2={w - pad.r} y1={y(0)} y2={y(0)} stroke="var(--color-line)" strokeWidth={1} />
      {d.curve.map((p, i) => (
        <text
          key={p.price}
          x={x(p.price)}
          y={h - pad.b + 22}
          fontSize={12}
          fill="var(--color-faint)"
          textAnchor={i === d.curve.length - 1 ? "end" : i === 0 ? "start" : "middle"}
        >
          {thousands.format(p.price)}
        </text>
      ))}
      <text x={w - pad.r} y={h - 6} fontSize={11} fill="var(--color-muted)" textAnchor="end">
        {d.xLabel}
      </text>
      <path d={path} fill="none" stroke="var(--color-accent)" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
      {/* Mevcut → önerilen fiyat */}
      <line x1={x(cur.price)} x2={x(cur.price)} y1={y(cur.demand)} y2={y(0)} stroke="var(--color-muted)" strokeWidth={1} />
      <line x1={x(sug.price)} x2={x(sug.price)} y1={y(sug.demand)} y2={y(0)} stroke="var(--color-accent)" strokeWidth={1} />
      <circle cx={x(cur.price)} cy={y(cur.demand)} r={5} fill="var(--color-muted)" stroke="var(--color-bg)" strokeWidth={2} />
      <circle cx={x(sug.price)} cy={y(sug.demand)} r={6} fill="var(--color-accent)" stroke="var(--color-bg)" strokeWidth={2} />
      <text x={x(cur.price) + 10} y={y(cur.demand) - 10} fontSize={12} fill="var(--color-muted)">
        {d.current.label} · {cur.demand}
      </text>
      <text x={x(sug.price) + 4} y={y(sug.demand) + 26} fontSize={12} fill="var(--color-fg)" textAnchor="start">
        {d.suggested.label} · {sug.demand}
      </text>
    </svg>
  );
}
