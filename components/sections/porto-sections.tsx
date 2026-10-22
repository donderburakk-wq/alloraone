import { Lock } from "lucide-react";
import { porto, type Module } from "@/lib/content/modules";
import { services } from "@/lib/content/services";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/animations/reveal";
import { FeatureTitle } from "./feature-grid";
import { NotifyForm } from "./notify-form";

/** Porto hero'sunun altındaki durum metni + "haber ver" formu. */
export function PortoStatus() {
  return (
    <div className="mt-10 max-w-xl rounded-card border border-line bg-surface p-6 sm:p-8">
      <p className="eyebrow flex items-center gap-2">
        <span aria-hidden className="size-1.5 rounded-full bg-faint" />
        {porto.status}
      </p>
      <p className="mt-4 leading-relaxed text-fg">{porto.text}</p>
      <h2 className="mt-8 font-display text-2xl font-medium tracking-[-0.025em]">{porto.notify.title}</h2>
      <div className="mt-4">
        <NotifyForm />
      </div>
    </div>
  );
}

/** Planlanan alt özellikler: soluk, kilitli kartlar. */
export function PortoLockedFeatures({ module: m }: { module: Module }) {
  return (
    <section className="relative py-24 sm:py-32" aria-labelledby="porto-features">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={services.modulePage.featuresEyebrow}
            title={services.portoPage.featuresTitle}
            id="porto-features"
          />
        </Reveal>
        <Reveal className="mt-14">
          <ul className="grid gap-px overflow-hidden rounded-card border border-dashed border-line bg-line-soft md:grid-cols-2 lg:grid-cols-3">
            {m.features.map((f, i) => (
              <li key={f.it} className="bg-bg">
                <article className="flex h-full flex-col gap-6 p-7 sm:p-8">
                  <div className="flex items-center justify-between">
                    <span className="eyebrow">{`0${i + 1}`}</span>
                    <span className="eyebrow inline-flex items-center gap-1.5">
                      <Lock aria-hidden className="size-3" strokeWidth={1.5} />
                      {services.portoPage.lockedLabel}
                    </span>
                  </div>
                  <Icon name={f.icon} className="size-5 text-faint" />
                  <div>
                    <FeatureTitle feature={f} />
                    <p className="mt-3 leading-relaxed text-muted">{f.description}</p>
                  </div>
                </article>
              </li>
            ))}
            <li aria-hidden className="hatch hidden bg-bg lg:block" />
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
