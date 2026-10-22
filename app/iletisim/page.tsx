import { Clock, Mail } from "lucide-react";
import { contact } from "@/lib/content/contact";
import { site } from "@/lib/content/site";
import { pageMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/ui/page-header";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/animations/reveal";
import { ContactForm } from "@/components/sections/contact-form";

export const metadata = pageMetadata({ ...contact.seo, path: "/iletisim" });

export default function ContactPage() {
  const { intro, info, form } = contact;
  const items = [
    { icon: Mail, label: info.email, value: site.contact.email, href: `mailto:${site.contact.email}` },
  ];

  return (
    <>
      <PageHeader eyebrow={intro.eyebrow} title={intro.title} lead={intro.lead} />

      <section id="form" className="scroll-mt-28 pb-24 sm:pb-32" aria-labelledby="form-title">
        <Container className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-8">
            <div className="rounded-card border border-line bg-surface p-6 sm:p-10">
              <h2 id="form-title" className="mb-8 font-display text-3xl font-medium tracking-[-0.03em]">
                {form.title}
              </h2>
              <ContactForm />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-4">
            <aside className="flex flex-col gap-5 lg:sticky lg:top-28" aria-label={info.title}>
              <div className="rounded-card border border-line bg-surface p-6 sm:p-8">
                <h2 className="eyebrow">{info.title}</h2>
                <ul className="mt-6 flex flex-col gap-5">
                  {items.map(({ icon: I, label, value, href }) => (
                    <li key={label} className="flex items-start gap-4">
                      <span className="grid size-10 shrink-0 place-items-center rounded-control border border-line bg-bg text-muted">
                        <I aria-hidden strokeWidth={1.25} className="size-[1.125rem]" />
                      </span>
                      <span className="flex flex-col">
                        <span className="eyebrow">{label}</span>
                        {href ? (
                          <a href={href} className="text-fg underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-fg">
                            {value}
                          </a>
                        ) : (
                          <span className="text-fg">{value}</span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-card border border-line-soft p-6 sm:p-8">
                <p className="flex items-center gap-2 text-fg">
                  <Clock aria-hidden strokeWidth={1.25} className="size-4 text-muted" />
                  {info.responseTitle}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{info.responseText}</p>
              </div>
            </aside>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
