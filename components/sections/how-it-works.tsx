"use client";

import { useRef } from "react";
import { m, useScroll, useTransform, type MotionValue } from "motion/react";
import { useReducedProgress } from "@/components/animations/use-reduced-progress";
import { home } from "@/lib/content/home";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/animations/reveal";

/** Adımları bağlayan çizgi scroll ile ilerler; çizgi ulaştıkça adım yanar. */
export function HowItWorks() {
  const { steps } = home;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const progress = useReducedProgress(scrollYProgress);
  const n = steps.items.length;

  return (
    <section className="relative py-24 sm:py-32" aria-labelledby="steps-title">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={steps.eyebrow} title={steps.title} id="steps-title" />
        </Reveal>

        <div ref={ref} className="relative mt-20">
          {/* Masaüstü: yatay çizgi */}
          <div aria-hidden className="absolute top-6 right-[12.5%] left-[12.5%] hidden h-px bg-line lg:block">
            <m.div style={{ scaleX: progress }} className="h-full origin-left bg-accent" />
          </div>
          {/* Mobil: dikey çizgi */}
          <div aria-hidden className="absolute top-6 bottom-6 left-[1.45rem] w-px bg-line lg:hidden">
            <m.div style={{ scaleY: progress }} className="h-full w-full origin-top bg-accent" />
          </div>

          <ol className="relative grid gap-12 pl-17 lg:grid-cols-4 lg:gap-8 lg:pl-0">
            {steps.items.map((step, i) => (
              <Step key={step.title} step={step} index={i} progress={progress} at={i / Math.max(1, n - 1)} />
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

function Step({
  step,
  index,
  progress,
  at,
}: {
  step: (typeof home.steps.items)[number];
  index: number;
  progress: MotionValue<number>;
  at: number;
}) {
  // Yalnızca ikon halkası yanar; metin her zaman tam opak kalır (kontrast).
  const lit = useTransform(progress, [Math.max(0, at - 0.08), at], [0, 1]);
  return (
    <li className="relative lg:flex lg:flex-col lg:items-center lg:text-center">
      <div className="absolute top-0 -left-17 lg:static">
        <div className="relative grid size-12 place-items-center rounded-full border border-line bg-bg">
          <m.span
            aria-hidden
            style={{ opacity: lit }}
            className="absolute inset-0 rounded-full border border-accent"
          />
          <Icon name={step.icon} className="relative size-5 text-fg" />
        </div>
      </div>
      <div className="lg:mt-8 lg:max-w-[16rem]">
        <span className="eyebrow">{`0${index + 1}`}</span>
        <h3 className="mt-3 font-display text-2xl font-medium tracking-[-0.025em]">{step.title}</h3>
        <p className="mt-3 leading-relaxed text-muted">{step.text}</p>
      </div>
    </li>
  );
}
