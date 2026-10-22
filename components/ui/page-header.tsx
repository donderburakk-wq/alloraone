import type { ReactNode } from "react";
import { Container } from "./container";
import { SectionHeading } from "./section-heading";

export function PageHeader({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: string;
  lead?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative pt-36 pb-20 sm:pt-44 sm:pb-24">
      <Container>
        <SectionHeading as="h1" eyebrow={eyebrow} title={title} lead={lead} />
        {children}
      </Container>
    </section>
  );
}
