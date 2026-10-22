"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { CloudRain, Sun } from "lucide-react";
import type { SceneLayout } from "@/lib/geo/turkey-scene";
import type { LabelSide } from "@/lib/geo/cities";
import { createDistributionEngine, TIMELINE } from "./distribution-engine";
import { cn } from "@/lib/utils";

export type SceneLabels = {
  warehouse: string;
  meteoSun: string;
  meteoRain: string;
  legend?: { standard: string; meteo: string };
};

const sideTransform: Record<LabelSide, string> = {
  n: "translate(-50%, calc(-100% - 12px))",
  s: "translate(-50%, 12px)",
  e: "translate(16px, -50%)",
  w: "translate(calc(-100% - 16px), -50%)",
  ne: "translate(9px, calc(-100% - 7px))",
  nw: "translate(calc(-100% - 9px), calc(-100% - 7px))",
  se: "translate(9px, 7px)",
  sw: "translate(calc(-100% - 9px), 7px)",
};

const pos = (layout: SceneLayout, x: number, y: number): CSSProperties => ({
  left: `${(x / layout.width) * 100}%`,
  top: `${(y / layout.height) * 100}%`,
});

export function DistributionScene({
  layout,
  variant,
  labels,
  className,
}: {
  layout: SceneLayout;
  variant: "desktop" | "mobile";
  labels: SceneLabels;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contourRef = useRef<SVGPathElement>(null);
  const T = TIMELINE[variant];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const engine = createDistributionEngine({
      canvas,
      layout,
      variant,
      reduced,
      clockEl: contourRef.current,
    });
    return () => engine.destroy();
  }, [layout, variant]);

  // Etiketler, motorun düğümleri belirttiği sırayla (depoya uzaklık) belirir.
  const order = new Map(
    [...layout.cities]
      .sort(
        (a, b) =>
          Math.hypot(a.x - layout.warehouse.x, a.y - layout.warehouse.y) -
          Math.hypot(b.x - layout.warehouse.x, b.y - layout.warehouse.y),
      )
      .map((c, i) => [c.id, i]),
  );
  const compact = variant === "mobile";

  return (
    <div
      className={cn("hero-scene relative select-none", className)}
      style={{ aspectRatio: `${layout.width} / ${layout.height}` }}
      aria-hidden
    >
      <svg
        viewBox={`0 0 ${layout.width} ${layout.height}`}
        className="absolute inset-0 size-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          ref={contourRef}
          d={layout.path}
          pathLength={1}
          className="hero-contour"
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <canvas ref={canvasRef} className="absolute inset-0 size-full" />

      <div className="pointer-events-none absolute inset-0">
        <span
          className="hero-pop eyebrow absolute text-[0.625rem]! whitespace-nowrap text-fg!"
          style={{
            ...pos(layout, layout.warehouse.x, layout.warehouse.y),
            transform: sideTransform[layout.warehouse.label],
            animationDelay: `${T.cities - 0.2}s`,
          }}
        >
          {labels.warehouse}
        </span>

        {layout.cities.map((c) => (
          <span
            key={c.id}
            className={cn(
              "hero-pop absolute whitespace-nowrap text-faint",
              compact ? "text-[0.6875rem]" : "text-xs",
            )}
            style={{
              ...pos(layout, c.x, c.y),
              transform: sideTransform[c.label],
              animationDelay: `${T.cities + 0.15 + (order.get(c.id) ?? 0) * 0.05}s`,
            }}
          >
            {c.name}
          </span>
        ))}

        {layout.cities
          .filter((c) => c.meteo)
          .map((c) => {
            const sun = c.meteo === "sun";
            const Icon = sun ? Sun : CloudRain;
            return (
              <span
                key={`meteo-${c.id}`}
                className="hero-pop eyebrow absolute inline-flex items-center gap-1.5 rounded-full border border-line bg-bg px-2 py-0.5 text-[0.625rem]! whitespace-nowrap text-fg!"
                style={{
                  ...pos(layout, c.x, c.y),
                  transform: sideTransform[c.meteoSide ?? "ne"],
                  animationDelay: `${T.meteo}s`,
                }}
              >
                <Icon aria-hidden strokeWidth={1.25} className="size-3.5" />
                {sun ? labels.meteoSun : labels.meteoRain}
              </span>
            );
          })}
      </div>

      {labels.legend && (
        <ul
          className="hero-pop eyebrow absolute right-2 bottom-0 flex flex-col gap-2"
          style={{ animationDelay: `${T.meteo + 0.2}s` }}
        >
          <LegendItem color="bg-accent" label={labels.legend.standard} />
          <LegendItem color="bg-fg" label={labels.legend.meteo} />
        </ul>
      )}
    </div>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <li className="flex items-center justify-end gap-2">
      {label}
      <span aria-hidden className={cn("size-1.5 rounded-full", color)} />
    </li>
  );
}
