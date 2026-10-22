"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import type { ReactNode } from "react";

/**
 * - LazyMotion + domAnimation: yalnızca kullandığımız özellikler (animasyon,
 *   exit, görünürlük/hover jestleri) yüklenir. Bileşenlerde `motion.*` yerine
 *   `m.*` kullanılır; `strict` bunu zorunlu kılar.
 * - reducedMotion="user": azaltılmış hareket tercihinde konum/ölçek
 *   animasyonları anında tamamlanır.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
