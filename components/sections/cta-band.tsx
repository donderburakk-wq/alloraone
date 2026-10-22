import { home } from "@/lib/content/home";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { TwoTone } from "@/components/ui/section-heading";
import { Reveal } from "@/components/animations/reveal";

export function CtaBand({
  title = home.cta.title,
  text = home.cta.text,
}: {
  title?: string;
  text?: string;
}) {
  const { cta } = home;
  return (
    <section className="relative py-24 sm:py-32" aria-labelledby="cta-title">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-card border border-line bg-surface">
            <div aria-hidden className="hatch h-8 border-b border-line-soft" />
            <div className="grid gap-10 px-6 py-14 sm:px-12 sm:py-16 lg:grid-cols-12 lg:items-end lg:px-14">
              <div className="lg:col-span-8">
                <p className="eyebrow mb-6">{cta.eyebrow}</p>
                <h2
                  id="cta-title"
                  className="max-w-3xl font-display text-4xl leading-[1] font-medium tracking-[-0.035em] sm:text-5xl"
                >
                  <TwoTone text={title} />
                </h2>
                <p className="mt-6 max-w-xl text-lg text-muted">{text}</p>
              </div>
              <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
                <ButtonLink href={cta.href} size="lg" arrow>
                  {cta.button}
                </ButtonLink>
                <ButtonLink href={cta.secondary.href} size="lg" variant="secondary">
                  {cta.secondary.label}
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
