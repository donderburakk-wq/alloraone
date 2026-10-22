"use client";

import { useEffect, useRef } from "react";

/**
 * SVG içindeki SMIL animasyonlarını yalnızca görünüm alanındayken oynatır.
 * Azaltılmış hareket tercihinde animasyon `restAt` saniyesindeki karede durur.
 */
export function useSvgPlayback<T extends SVGSVGElement>(restAt = 0) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      svg.pauseAnimations();
      svg.setCurrentTime(restAt);
      return;
    }
    svg.pauseAnimations();
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) svg.unpauseAnimations();
      else svg.pauseAnimations();
    });
    io.observe(svg);
    return () => io.disconnect();
  }, [restAt]);

  return ref;
}
