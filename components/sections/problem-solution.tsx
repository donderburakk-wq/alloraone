"use client";

import Link from "next/link";
import { useRef } from "react";
import { m, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import { home } from "@/lib/content/home";
import { getModule, type ModuleSlug } from "@/lib/content/modules";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/animations/reveal";
import { useReducedProgress } from "@/components/animations/use-reduced-progress";

type Item = (typeof home.problems.items)[number];

export function ProblemSolution() {
  const { problems } = home;
  return (
    <section className="relative py-24 sm:py-32" aria-labelledby="problem-title">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={problems.eyebrow} title={problems.title} id="problem-title" />
        </Reveal>
        <ol className="mt-16 flex flex-col border-t border-line-soft sm:mt-20">
          {problems.items.map((item, i) => (
            <ProblemRow key={item.problem} item={item} index={i} />
          ))}
        </ol>
      </Container>
    </section>
  );
}

/**
 * Her satır, scroll ilerledikçe sorundan çözüme dönüşür: sorun soluklaşıp
 * üstü çizilir, bağlantı çizgisi uzar, çözüm kartı belirir.
 */
function ProblemRow({ item, index }: { item: Item; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "center 45%"] });

  const p = useReducedProgress(scrollYProgress);
  // Yalnızca büyük başlık soluklaşır; 0,55'te bile büyük metin kontrastını (≥3) korur.
  const problemOpacity = useTransform(p, [0.3, 0.75], [1, 0.55]);
  const strike = useTransform(p, [0.3, 0.7], [0, 1]);
  const connector = useTransform(p, [0.35, 0.7], [0, 1]);
  const solutionOpacity = useTransform(p, [0.5, 0.95], [0, 1]);
  const solutionY = useTransform(p, [0.5, 0.95], [12, 0]);

  const mod = getModule(item.module as ModuleSlug)!;

  return (
    <li ref={ref} className="grid items-center gap-6 border-b border-line-soft py-10 md:grid-cols-[1fr_4rem_1fr] md:gap-0 md:py-14">
      <div className="md:pr-8">
        <p className="eyebrow">
          {`0${index + 1}`} <span aria-hidden>·</span> {home.problems.problemLabel}
        </p>
        <m.h3
          style={{ opacity: problemOpacity }}
          className="relative mt-4 inline-block font-display text-3xl leading-tight font-medium tracking-[-0.03em] sm:text-4xl"
        >
          {item.problem}
          <m.span
            aria-hidden
            style={{ scaleX: strike }}
            className="absolute top-[55%] left-0 h-px w-full origin-left bg-fg/60"
          />
        </m.h3>
        <p className="mt-4 max-w-md leading-relaxed text-muted">{item.problemText}</p>
      </div>

      <div aria-hidden className="relative hidden h-px md:block">
        <m.span style={{ scaleX: connector }} className="absolute inset-0 origin-left bg-line-strong" />
        <m.span
          style={{ opacity: connector }}
          className="absolute top-1/2 right-0 size-1.5 translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
        />
      </div>

      <m.div
        style={{ opacity: solutionOpacity, y: solutionY }}
        className="rounded-card border border-line bg-surface p-7 sm:p-8"
      >
        <span className="eyebrow">{home.problems.solutionLabel}</span>
        <h3 className="mt-6 font-display text-2xl leading-tight font-medium tracking-[-0.025em] sm:text-3xl">
          {item.solution}
        </h3>
        <p className="mt-3 leading-relaxed text-muted">{item.solutionText}</p>
        <Link
          href={`/hizmetler/${mod.slug}`}
          className="group mt-6 inline-flex items-center gap-2 text-xs font-medium tracking-[0.08em] text-fg uppercase"
        >
          AlloraOne {mod.name}
          <ArrowRight aria-hidden strokeWidth={1.75} className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </m.div>
    </li>
  );
}
