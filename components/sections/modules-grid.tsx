import { home } from "@/lib/content/home";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/animations/reveal";
import { ModuleCards } from "./module-cards";

export function ModulesGrid() {
  const section = home.modules;
  return (
    <section className="relative py-24 sm:py-32" aria-labelledby="modules-title">
      <Container>
        <Reveal className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading eyebrow={section.eyebrow} title={section.title} id="modules-title" />
          <p className="max-w-sm leading-relaxed text-muted lg:pb-1">{section.lead}</p>
        </Reveal>
        <ModuleCards className="mt-14" showCode={false} />
      </Container>
    </section>
  );
}
