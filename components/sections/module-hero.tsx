import type { ReactNode } from "react";
import type { Module } from "@/lib/content/modules";
import { services } from "@/lib/content/services";
import { site } from "@/lib/content/site";
import { ui } from "@/lib/content/nav";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { ModuleCode, ModuleWordmark, SoonBadge } from "@/components/ui/module-mark";
import { moduleMinis } from "./module-cards";

export function ModuleHero({ module: m, children }: { module: Module; children?: ReactNode }) {
  const Mini = moduleMinis[m.slug];
  const soon = m.status === "soon";
  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-24">
      <Container className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <div className="flex items-center gap-3">
            <ModuleCode module={m} />
            {soon && <SoonBadge label={ui.soon} />}
          </div>
          <h1 className="mt-8">
            <ModuleWordmark name={m.name} size="xl" />
          </h1>
          <p className="mt-8 max-w-xl text-xl leading-relaxed text-muted sm:text-2xl">{m.tagline}</p>
          {children}
          {!soon && (
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href={site.demo.href} size="lg" arrow>
                {services.modulePage.primaryCta}
              </ButtonLink>
              <ButtonLink href="/hizmetler" size="lg" variant="secondary">
                {services.modulePage.secondaryCta}
              </ButtonLink>
            </div>
          )}
        </div>

        <div className="lg:col-span-6">
          <div className="overflow-hidden rounded-card border border-line bg-surface">
            <div className="flex items-center justify-between border-b border-line-soft px-5 py-3">
              <ModuleCode module={m} short />
              <span className="eyebrow">{soon ? services.portoPage.lockedLabel : services.modulePage.liveLabel}</span>
            </div>
            <div className="aspect-[16/11] p-8 sm:p-12">
              <Mini />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
