"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";

/** Global Lenis örneği. Azaltılmış hareket tercihinde hiç başlatılmaz. */
export function SmoothScroll() {
  const reduced = useReducedMotion();
  if (reduced !== false) return null;
  return (
    <ReactLenis
      root
      options={{ lerp: 0.11, anchors: { offset: -96 }, stopInertiaOnNavigate: true, autoRaf: true }}
    />
  );
}
