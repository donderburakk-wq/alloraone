import { services } from "@/lib/content/services";
import { pageMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/ui/page-header";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Divider } from "@/components/ui/divider";
import { Reveal } from "@/components/animations/reveal";
import { ModuleDiagram } from "@/components/sections/module-diagram";
import { ModuleCards } from "@/components/sections/module-cards";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata = pageMetadata({ ...services.seo, path: "/hizmetler" });

export default function ServicesPage() {
  return (
    <>
      <PageHeader eyebrow={services.intro.eyebrow} title={services.intro.title} lead={services.intro.lead} />
      <Divider />
      <ModuleDiagram />
      <Divider />
      <section className="py-24 sm:py-32" aria-labelledby="cards-title">
        <Container>
          <Reveal>
            <SectionHeading eyebrow={services.cards.eyebrow} title={services.cards.title} id="cards-title" />
          </Reveal>
          <ModuleCards className="mt-14" />
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
