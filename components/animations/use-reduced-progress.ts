"use client";

import { useEffect } from "react";
import { useMotionValue, useTransform, type MotionValue } from "motion/react";

/**
 * Scroll ilerlemesini döndürür; azaltılmış hareket tercihinde ilerleme 1'e
 * sabitlenir (son durum). Tercih mount sonrası okunur, böylece sunucu ve
 * istemcinin ilk render'ı aynı kalır (hidrasyon uyuşmazlığı olmaz).
 */
export function useReducedProgress(source: MotionValue<number>) {
  const floor = useMotionValue(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) floor.set(1);
  }, [floor]);
  return useTransform(() => Math.max(source.get(), floor.get()));
}
