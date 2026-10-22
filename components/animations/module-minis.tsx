"use client";

import { Lock } from "lucide-react";
import { home } from "@/lib/content/home";
import { ui } from "@/lib/content/nav";
import { useSvgPlayback } from "./use-svg-playback";

/*
 * Modül kartlarının mini animasyonları. Hepsi 320×200 viewBox'lı SVG'dir,
 * SMIL ile oynar ve yalnızca görünüm alanındayken çalışır (useSvgPlayback).
 * Tek renk çizgi (nötr token) + tek aksan (--color-accent).
 */

const svgProps = {
  viewBox: "0 0 320 200",
  className: "h-full w-full overflow-visible",
  "aria-hidden": true,
} as const;

// --- Flusso: hero sahnesinin minyatürü -----------------------------------

const W = { x: 58, y: 112 };
const STORES = [
  { x: 168, y: 34, fill: 0.85 },
  { x: 250, y: 58, fill: 0.62 },
  { x: 282, y: 120, fill: 0.92 },
  { x: 236, y: 172, fill: 0.48 },
  { x: 150, y: 170, fill: 0.7 },
];

function curve(s: { x: number; y: number }) {
  const mx = (W.x + s.x) / 2;
  const my = (W.y + s.y) / 2;
  const dx = s.x - W.x;
  const dy = s.y - W.y;
  const len = Math.hypot(dx, dy);
  let nx = -dy / len;
  let ny = dx / len;
  if (ny > 0) {
    nx = -nx;
    ny = -ny;
  }
  return `M${W.x},${W.y} Q${(mx + nx * len * 0.22).toFixed(1)},${(my + ny * len * 0.22).toFixed(1)} ${s.x},${s.y}`;
}

export function FlussoMini() {
  const ref = useSvgPlayback<SVGSVGElement>(2.2);
  const ringLen = 2 * Math.PI * 9;
  return (
    <svg ref={ref} {...svgProps}>
      {STORES.map((s, i) => {
        const d = curve(s);
        return (
          <g key={i}>
            <path d={d} fill="none" stroke="var(--color-line-strong)" strokeWidth={1} />
            {[0, 1].map((k) => (
              <circle key={k} r={2.6} fill="var(--color-accent)" opacity={0}>
                <animateMotion
                  dur="2.4s"
                  begin={`${i * 0.32 + k * 1.2}s`}
                  repeatCount="indefinite"
                  path={d}
                  keyPoints="0;1"
                  keyTimes="0;1"
                  calcMode="spline"
                  keySplines="0.45 0 0.55 1"
                />
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  keyTimes="0;0.15;0.85;1"
                  dur="2.4s"
                  begin={`${i * 0.32 + k * 1.2}s`}
                  repeatCount="indefinite"
                />
              </circle>
            ))}
            <circle cx={s.x} cy={s.y} r={9} fill="none" stroke="var(--color-line)" strokeWidth={1.5} />
            <circle
              cx={s.x}
              cy={s.y}
              r={9}
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth={2}
              strokeLinecap="round"
              strokeDasharray={ringLen}
              transform={`rotate(-90 ${s.x} ${s.y})`}
            >
              <animate
                attributeName="stroke-dashoffset"
                values={`${ringLen};${ringLen * (1 - s.fill)};${ringLen * (1 - s.fill)};${ringLen}`}
                keyTimes="0;0.55;0.9;1"
                dur="6s"
                begin={`${i * 0.2}s`}
                repeatCount="indefinite"
              />
            </circle>
            <circle cx={s.x} cy={s.y} r={2.4} fill="var(--color-fg)" />
          </g>
        );
      })}
      <circle cx={W.x} cy={W.y} r={8} fill="none" stroke="var(--color-fg)" strokeWidth={1}>
        <animate attributeName="r" values="8;26" dur="2.2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;0" dur="2.2s" repeatCount="indefinite" />
      </circle>
      <circle cx={W.x} cy={W.y} r={8} fill="none" stroke="var(--color-fg)" strokeWidth={1} />
      <rect x={W.x - 4} y={W.y - 4} width={8} height={8} fill="var(--color-fg)" transform={`rotate(45 ${W.x} ${W.y})`} />
    </svg>
  );
}

// --- Polso: EKG nabız çizgisi KPI grafiğine dönüşür -------------------------

const XS = Array.from({ length: 13 }, (_, i) => 24 + i * 23);
const EKG = [118, 118, 118, 112, 124, 52, 160, 108, 118, 118, 118, 114, 118];
const KPI = [158, 150, 152, 140, 136, 126, 128, 112, 104, 106, 90, 82, 66];
const toPath = (ys: number[]) => `M${XS.map((x, i) => `${x},${ys[i]}`).join(" L")}`;

export function PolsoPulse() {
  const ref = useSvgPlayback<SVGSVGElement>(3.6);
  const ekg = toPath(EKG);
  const kpi = toPath(KPI);
  const timing = { dur: "7s", repeatCount: "indefinite", keyTimes: "0;0.18;0.42;0.82;1" } as const;
  return (
    <svg ref={ref} {...svgProps}>
      {[60, 100, 140, 180].map((y) => (
        <line key={y} x1={20} x2={300} y1={y} y2={y} stroke="var(--color-line-soft)" strokeWidth={1} />
      ))}
      {XS.filter((_, i) => i % 2 === 0).map((x, i) => {
        const h = 180 - KPI[i * 2] + 6;
        return (
          <rect key={x} x={x - 6} y={180 - h} width={12} height={h} rx={2} fill="var(--color-line)" opacity={0}>
            <animate attributeName="opacity" values="0;0;1;1;0" {...timing} />
          </rect>
        );
      })}
      <path
        d={ekg}
        fill="none"
        stroke="var(--color-fg)"
        strokeWidth={1.5}
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <animate attributeName="d" values={`${ekg};${ekg};${kpi};${kpi};${ekg}`} calcMode="spline" keySplines="0 0 1 1;0.6 0 0.2 1;0 0 1 1;0.6 0 0.2 1" {...timing} />
      </path>
      <circle r={4} fill="var(--color-accent)" stroke="var(--color-bg)" strokeWidth={2} cx={XS[12]} cy={EKG[12]}>
        <animate attributeName="cy" values={`${EKG[12]};${EKG[12]};${KPI[12]};${KPI[12]};${EKG[12]}`} calcMode="spline" keySplines="0 0 1 1;0.6 0 0.2 1;0 0 1 1;0.6 0 0.2 1" {...timing} />
      </circle>
      <g opacity={0} fontFamily="var(--font-mono)">
        <animate attributeName="opacity" values="0;0;1;1;0" {...timing} />
        <text x={24} y={34} fontSize={11} fill="var(--color-muted)" letterSpacing="0.08em">
          {home.modules.mini.polso.kpi.toUpperCase()}
        </text>
        <text x={300} y={36} fontSize={20} fill="var(--color-fg)" textAnchor="end">
          {home.modules.mini.polso.value}
        </text>
      </g>
    </svg>
  );
}

// --- Bilancia: sallanıp dengeye oturan terazi -----------------------------

const PIVOT = { x: 160, y: 62 };
const ARM = 96;
const ANGLES = [-13, 9, -5.5, 3, -1.4, 0.6, 0, 0];
const ANGLE_TIMES = "0;0.12;0.24;0.36;0.48;0.58;0.68;1";

function panTranslate(side: -1 | 1) {
  return ANGLES.map((deg) => {
    const r = (deg * Math.PI) / 180;
    return `${(PIVOT.x + side * ARM * Math.cos(r)).toFixed(2)},${(PIVOT.y + side * ARM * Math.sin(r)).toFixed(2)}`;
  }).join(";");
}

function Pan({ side, label }: { side: -1 | 1; label: string }) {
  const [x, y] = [PIVOT.x + side * ARM, PIVOT.y];
  return (
    <g transform={`translate(${x} ${y})`}>
      <animateTransform
        attributeName="transform"
        type="translate"
        values={panTranslate(side)}
        keyTimes={ANGLE_TIMES}
        dur="5.5s"
        repeatCount="indefinite"
      />
      <path d="M0,0 L-24,44 M0,0 L24,44" stroke="var(--color-muted)" strokeWidth={1} opacity={0.6} />
      <path d="M-30,44 Q0,62 30,44 Z" fill="none" stroke="var(--color-fg)" strokeWidth={1.25} />
      <text y={82} textAnchor="middle" fontSize={11} fontFamily="var(--font-mono)" fill="var(--color-muted)" letterSpacing="0.06em">
        {label}
      </text>
    </g>
  );
}

export function BilanciaScale() {
  const ref = useSvgPlayback<SVGSVGElement>(5);
  const { left, right } = home.modules.mini.bilancia;
  return (
    <svg ref={ref} {...svgProps}>
      <path d={`M${PIVOT.x},${PIVOT.y} L${PIVOT.x},176`} stroke="var(--color-line)" strokeWidth={2} />
      <path d={`M${PIVOT.x - 34},178 L${PIVOT.x + 34},178`} stroke="var(--color-line)" strokeWidth={2} strokeLinecap="round" />
      <g>
        <animateTransform
          attributeName="transform"
          type="rotate"
          values={ANGLES.map((a) => `${a} ${PIVOT.x} ${PIVOT.y}`).join(";")}
          keyTimes={ANGLE_TIMES}
          dur="5.5s"
          repeatCount="indefinite"
        />
        <line
          x1={PIVOT.x - ARM}
          x2={PIVOT.x + ARM}
          y1={PIVOT.y}
          y2={PIVOT.y}
          stroke="var(--color-fg)"
          strokeWidth={2}
          strokeLinecap="round"
        />
      </g>
      <Pan side={-1} label={left} />
      <Pan side={1} label={right} />
      <circle cx={PIVOT.x} cy={PIVOT.y} r={5} fill="var(--color-accent)" stroke="var(--color-bg)" strokeWidth={2} />
    </svg>
  );
}

// --- Porto: bulanık raf ızgarası + "Yakında" ----------------------------------

export function PortoShelves() {
  const ref = useSvgPlayback<SVGSVGElement>(0);
  const racks = [0, 1, 2];
  const levels = [0, 1, 2, 3];
  return (
    <div className="relative h-full w-full">
      <svg ref={ref} {...svgProps} className="h-full w-full overflow-hidden">
        <defs>
          <linearGradient id="porto-scan" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="var(--color-fg)" stopOpacity={0} />
            <stop offset="0.5" stopColor="var(--color-fg)" stopOpacity={0.12} />
            <stop offset="1" stopColor="var(--color-fg)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <g style={{ filter: "blur(1.6px)" }} opacity={0.55}>
          {racks.map((r) => {
            const x0 = 30 + r * 92;
            return (
              <g key={r}>
                <rect x={x0} y={22} width={76} height={160} fill="none" stroke="var(--color-muted)" strokeWidth={1.5} />
                {levels.map((l) => (
                  <g key={l}>
                    <line x1={x0} x2={x0 + 76} y1={62 + l * 40} y2={62 + l * 40} stroke="var(--color-muted)" strokeWidth={1.5} />
                    {[0, 1, 2].map((b) =>
                      (r + l + b) % 4 === 0 ? null : (
                        <rect
                          key={b}
                          x={x0 + 6 + b * 23}
                          y={62 + l * 40 - 14 - ((r * 3 + b + l) % 3) * 4}
                          width={18}
                          height={14 + ((r * 3 + b + l) % 3) * 4}
                          rx={2}
                          fill="var(--color-line-strong)"
                        />
                      ),
                    )}
                  </g>
                ))}
              </g>
            );
          })}
        </g>
        <rect x={-80} y={14} width={80} height={176} fill="url(#porto-scan)">
          <animate attributeName="x" values="-80;320" dur="4.5s" repeatCount="indefinite" />
        </rect>
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <span className="eyebrow inline-flex items-center gap-2 rounded-full border border-line bg-bg px-3 py-1.5 text-muted!">
          <Lock aria-hidden className="size-3.5" strokeWidth={1.75} />
          {ui.soon}
        </span>
      </div>
    </div>
  );
}
