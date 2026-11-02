import { UserRound } from "lucide-react";
import { modules } from "@/lib/content/modules";
import { about } from "@/lib/content/about";
import { pageMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/ui/page-header";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Divider } from "@/components/ui/divider";
import { Icon } from "@/components/ui/icon";
import { ModuleCode } from "@/components/ui/module-mark";
import { Reveal } from "@/components/animations/reveal";
import { ScrollText } from "@/components/animations/scroll-text";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata = pageMetadata({ ...about.seo, path: "/hakkimizda" });

export default function AboutPage() {
  const { intro, story, vision, names, values, team } = about;
  return (
    <>
      <PageHeader eyebrow={intro.eyebrow} title={intro.title} lead={intro.lead} />
      <Divider />

      {/* Hikâye */}
      <section className="py-24 sm:py-32" aria-labelledby="story-title">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <SectionHeading eyebrow={story.eyebrow} title={story.title} id="story-title" />
            </Reveal>
            <div className="flex flex-col gap-6 text-lg leading-relaxed text-muted lg:col-span-7">
              {story.paragraphs.map((p, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <p className={i === 0 ? "text-xl text-fg" : undefined}>{p}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>
      <Divider />

      {/* Vizyon & Misyon (eski /vizyon-misyon sayfası) */}
      <section id="vizyon-misyon" className="scroll-mt-24" aria-labelledby="vision-title">
        <Container className="pt-24 sm:pt-32">
          <Reveal>
            <SectionHeading eyebrow={vision.eyebrow} title={vision.title} id="vision-title" />
          </Reveal>
        </Container>
        {[vision.vision, vision.mission].map((b, i) => (
          <div key={b.label}>
            {i > 0 && <Divider />}
            <div role="group" aria-labelledby={`block-${i}`} className="py-16 sm:py-24">
              <Container className="grid gap-10 lg:grid-cols-12">
                <Reveal className="lg:col-span-3">
                  <h3 id={`block-${i}`} className="eyebrow">
                    {b.index} <span aria-hidden>·</span> <span className="text-fg">{b.label}</span>
                  </h3>
                </Reveal>
                <div className="lg:col-span-9">
                  <ScrollText
                    text={b.text}
                    className="font-display text-[clamp(1.9rem,4.2vw,3.5rem)] leading-[1.12] font-medium tracking-[-0.035em]"
                  />
                </div>
              </Container>
            </div>
          </div>
        ))}
        <Container className="pb-24 sm:pb-32">
          <Reveal>
            <p className="eyebrow mb-6">{vision.goals.eyebrow}</p>
            <h3 className="font-display text-3xl leading-[1] font-medium tracking-[-0.035em] sm:text-4xl">
              {vision.goals.title}
            </h3>
          </Reveal>
          <Reveal className="mt-12">
            <ol className="grid gap-px overflow-hidden rounded-card border border-line bg-line lg:grid-cols-3">
              {vision.goals.items.map((g, i) => (
                <li key={g.title} className="bg-bg">
                  <article className="flex h-full flex-col gap-6 p-8">
                    <div className="flex items-center justify-between">
                      <span className="eyebrow">{`0${i + 1}`}</span>
                      <Icon name={g.icon} className="size-5 text-muted" />
                    </div>
                    <h4 className="font-display text-2xl font-medium tracking-[-0.025em]">{g.title}</h4>
                    <p className="leading-relaxed text-muted">{g.text}</p>
                  </article>
                </li>
              ))}
            </ol>
          </Reveal>
        </Container>
      </section>
      <Divider />

      {/* İsmin anlamı */}
      <section className="py-24 sm:py-32" aria-labelledby="names-title">
        <Container>
          <Reveal className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading eyebrow={names.eyebrow} title={names.title} id="names-title" />
            <p className="max-w-sm leading-relaxed text-muted lg:pb-1">{names.lead}</p>
          </Reveal>
          <Reveal className="mt-14">
            <ul className="grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
              <li className="bg-bg">
                <article className="flex h-full flex-col gap-6 p-7">
                  <span className="eyebrow">Platform</span>
                  <h3 className="font-display text-2xl font-medium tracking-[-0.025em]">{names.platform.name}</h3>
                  <p className="leading-relaxed text-muted">{names.platform.text}</p>
                </article>
              </li>
              {modules.map((m) => (
                <li key={m.slug} className="bg-bg">
                  <article className="flex h-full flex-col gap-6 p-7">
                    <ModuleCode module={m} short />
                    <h3 className="font-display text-2xl font-medium tracking-[-0.025em]">{m.name}</h3>
                    <p className="leading-relaxed text-muted">
                      {m.name}: {m.meaning.toLocaleLowerCase("tr")}. {names.moduleTexts[m.slug]}
                    </p>
                  </article>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>
      <Divider />

      {/* Değerler */}
      <section className="py-24 sm:py-32" aria-labelledby="values-title">
        <Container>
          <Reveal>
            <SectionHeading eyebrow={values.eyebrow} title={values.title} id="values-title" />
          </Reveal>
          <Reveal className="mt-14">
            <ul className="grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
              {values.items.map((v, i) => (
                <li key={v.title} className="bg-bg">
                  <article className="flex h-full flex-col gap-6 p-7">
                    <div className="flex items-center justify-between">
                      <span className="eyebrow">{`0${i + 1}`}</span>
                      <Icon name={v.icon} className="size-5 text-muted" />
                    </div>
                    <h3 className="font-display text-2xl font-medium tracking-[-0.025em]">{v.title}</h3>
                    <p className="leading-relaxed text-muted">{v.text}</p>
                  </article>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      {/* Ekip */}
      <section className="py-24 sm:py-32" aria-labelledby="team-title">
        <Container>
          <Reveal className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading eyebrow={team.eyebrow} title={team.title} id="team-title" />
            <p className="max-w-sm leading-relaxed text-muted lg:pb-1">{team.lead}</p>
          </Reveal>
          <Reveal className="mt-14">
            <ul className="grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
              {team.members.map((member, i) => (
                <li key={i} className="bg-bg">
                  <article>
                    <div className="hatch grid aspect-[4/5] place-items-center border-b border-line-soft">
                      <span className="grid size-16 place-items-center rounded-full border border-line bg-bg text-faint">
                        <UserRound aria-hidden strokeWidth={1.25} className="size-7" />
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-xl font-medium tracking-[-0.02em]">{member.name}</h3>
                      <p className="eyebrow mt-2">{member.title}</p>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
