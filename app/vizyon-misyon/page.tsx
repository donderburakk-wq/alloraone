import { vision } from "@/lib/content/vision";
import { pageMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/ui/page-header";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Divider } from "@/components/ui/divider";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/animations/reveal";
import { ScrollText } from "@/components/animations/scroll-text";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata = pageMetadata({ ...vision.seo, path: "/vizyon-misyon" });

export default function VisionPage() {
  const blocks = [vision.vision, vision.mission];
  return (
    <>
      <PageHeader eyebrow={vision.intro.eyebrow} title={vision.intro.title} lead={vision.intro.lead} />

      {blocks.map((b, i) => (
        <div key={b.label}>
          <Divider />
          <section aria-labelledby={`block-${i}`} className="py-24 sm:py-36">
            <Container className="grid gap-10 lg:grid-cols-12">
              <Reveal className="lg:col-span-3">
                <h2 id={`block-${i}`} className="eyebrow">
                  {b.index} <span aria-hidden>·</span> <span className="text-fg">{b.label}</span>
                </h2>
              </Reveal>
              <div className="lg:col-span-9">
                <ScrollText
                  text={b.text}
                  className="font-display text-[clamp(1.9rem,4.2vw,3.5rem)] leading-[1.12] font-medium tracking-[-0.035em]"
                />
              </div>
            </Container>
          </section>
        </div>
      ))}

      <Divider />
      <section className="py-24 sm:py-32" aria-labelledby="goals-title">
        <Container>
          <Reveal>
            <SectionHeading eyebrow={vision.goals.eyebrow} title={vision.goals.title} id="goals-title" />
          </Reveal>
          <Reveal className="mt-14">
            <ol className="grid gap-px overflow-hidden rounded-card border border-line bg-line lg:grid-cols-3">
              {vision.goals.items.map((g, i) => (
                <li key={g.title} className="bg-bg">
                  <article className="flex h-full flex-col gap-6 p-8">
                    <div className="flex items-center justify-between">
                      <span className="eyebrow">{`0${i + 1}`}</span>
                      <Icon name={g.icon} className="size-5 text-muted" />
                    </div>
                    <h3 className="font-display text-2xl font-medium tracking-[-0.025em]">{g.title}</h3>
                    <p className="leading-relaxed text-muted">{g.text}</p>
                  </article>
                </li>
              ))}
            </ol>
          </Reveal>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
