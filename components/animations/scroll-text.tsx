"use client";

import { useRef } from "react";
import { m, useScroll, useTransform, type MotionValue } from "motion/react";
import { useReducedProgress } from "./use-reduced-progress";
import { cn } from "@/lib/utils";

/**
 * Scroll ilerledikçe kelimeleri sırayla aydınlatan büyük metin. Metin
 * baştan DOM'dadır (erişilebilir ve aranabilir); yalnızca opaklık değişir.
 */
export function ScrollText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 50%"] });
  const progress = useReducedProgress(scrollYProgress);
  const words = text.split(" ");
  return (
    <p ref={ref} className={cn("flex flex-wrap", className)}>
      {words.map((w, i) => (
        <Word key={i} progress={progress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </Word>
      ))}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  // 0,5 taban: henüz aydınlanmamış kelimeler de büyük metin kontrastını (≥3:1) iki temada geçer.
  const opacity = useTransform(progress, range, [0.5, 1]);
  return (
    <m.span style={{ opacity }} className="mr-[0.25em]">
      {children}
    </m.span>
  );
}
