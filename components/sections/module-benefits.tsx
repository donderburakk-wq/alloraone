import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { modules, type Module } from "@/lib/content/modules";
import { services } from "@/lib/content/services";
import { ui } from "@/lib/content/nav";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/animations/reveal";
import { ModuleCode, SoonBadge } from "@/components/ui/module-mark";

export function ModuleBenefits({ module: m }: { module: Module }) {
  const { modulePage } = services;
  return (
    <section className="relative py-24 sm:py-32" aria-labelledby="benefits-title">
      <Container className="grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <SectionHeading eyebrow={modulePage.benefitsEyebrow} title={modulePage.benefitsTitle} id="benefits-title" />
        </Reveal>
        <ol className="flex flex-col border-t border-line-soft lg:col-span-7">
          {m.benefits.map((b, i) => (
            <li key={b}>
              <Reveal delay={i * 0.04} className="grid grid-cols-[3rem_1fr] items-baseline gap-4 border-b border-line-soft py-6">
                <span className="eyebrow">{`0${i + 1}`}</span>
                <span className="text-lg leading-relaxed text-fg">{b}</span>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

export function OtherModules({ current }: { current: Module }) {
  const others = modules.filter((m) => m.slug !== current.slug);
  return (
    <nav aria-labelledby="other-modules" className="pb-12">
      <Container>
        <h2 id="other-modules" className="eyebrow mb-6">
          {services.modulePage.otherModules}
        </h2>
        <ul className="grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-3">
          {others.map((m) => (
            <li key={m.slug} className="bg-bg">
              <Link
                href={`/hizmetler/${m.slug}`}
                className="group flex h-full items-center justify-between gap-3 px-5 py-5 transition-colors duration-200 hover:bg-surface"
              >
                <span className="flex flex-col gap-1.5">
                  <ModuleCode module={m} />
                  <span className="font-display text-xl font-medium tracking-[-0.02em]">AlloraOne {m.name}</span>
                </span>
                <span className="flex items-center gap-2">
                  {m.status === "soon" && <SoonBadge label={ui.soon} />}
                  <ArrowUpRight aria-hidden strokeWidth={1.5} className="size-4 text-faint group-hover:text-fg" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </nav>
  );
}
