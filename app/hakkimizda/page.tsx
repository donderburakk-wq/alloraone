import { UserRound } from "lucide-react";
import { about } from "@/lib/content/about";
import { pageMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/ui/page-header";
import { Container } from "@/components/ui/container";
import { SectionHeading, TwoTone } from "@/components/ui/section-heading";
import { Divider } from "@/components/ui/divider";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/animations/reveal";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata = pageMetadata({ ...about.seo, path: "/hakkimizda" });

export default function AboutPage() {
  const { intro, story, problem, values, team } = about;
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

      {/* Alokasyon neden kritik? */}
      <section className="py-24 sm:py-36" aria-labelledby="problem-title">
        <Container>
          <Reveal className="max-w-5xl">
            <p className="eyebrow">{problem.eyebrow}</p>
            <h2
              id="problem-title"
              className="mt-8 font-display text-[clamp(2.5rem,6.5vw,5.5rem)] leading-[0.98] font-medium tracking-[-0.045em]"
            >
              <TwoTone text={problem.question} />
            </h2>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">{problem.lead}</p>
          </Reveal>

          <Reveal delay={0.1} className="mt-16">
            <ul className="grid gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-3">
              {problem.sectors.map((s, i) => (
                <li key={s.name} className="bg-bg">
                  <article className="flex h-full flex-col gap-6 p-7 sm:p-8">
                    <div className="flex items-center justify-between">
                      <span className="eyebrow">{`0${i + 1}`}</span>
                      <Icon name={s.icon} className="size-5 text-muted" />
                    </div>
                    <h3 className="font-display text-2xl font-medium tracking-[-0.025em]">{s.name}</h3>
                    <p className="leading-relaxed text-muted">{s.text}</p>
                  </article>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="mt-10">
            <p className="flex items-center gap-3 text-lg text-fg">
              <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-accent" />
              {problem.closing}
            </p>
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
