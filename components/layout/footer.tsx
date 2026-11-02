import { Fragment } from "react";
import Link from "next/link";
import { footerNav, mainNav, ui } from "@/lib/content/nav";
import { modules } from "@/lib/content/modules";
import { site } from "@/lib/content/site";
import { contact } from "@/lib/content/contact";
import { Logo } from "@/components/ui/logo";
import { Container } from "@/components/ui/container";
import { ModuleCode, SoonBadge } from "@/components/ui/module-mark";

export function Footer() {
  return (
    <footer id="site-footer" className="relative z-[1] mt-auto border-t border-line-soft bg-bg">
      <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo className="h-7 text-fg" />
          <p className="mt-6 max-w-xs leading-relaxed text-muted">{site.statement}</p>
        </div>

        <FooterColumn title={footerNav.pagesTitle} className="lg:col-span-2">
          {mainNav.map((item) => (
            <Fragment key={item.href}>
              <li>
                <FooterLink href={item.href}>{item.label}</FooterLink>
              </li>
              {item.href === "/hakkimizda" && (
                <li>
                  <FooterLink href={footerNav.vision.href}>{footerNav.vision.label}</FooterLink>
                </li>
              )}
            </Fragment>
          ))}
        </FooterColumn>

        <FooterColumn title={footerNav.modulesTitle} className="lg:col-span-3">
          {modules.map((m) => (
            <li key={m.slug}>
              <Link
                href={`/hizmetler/${m.slug}`}
                className="group inline-flex items-center gap-3 text-muted transition-colors hover:text-fg"
              >
                <ModuleCode module={m} short className="w-8" />
                <span>AlloraOne {m.name}</span>
                {m.status === "soon" && <SoonBadge label={ui.soon} />}
              </Link>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title={footerNav.contactTitle} className="lg:col-span-3">
          <li>
            <span className="sr-only">{contact.info.email}: </span>
            <a href={`mailto:${site.contact.email}`} className="text-muted transition-colors hover:text-fg">
              {site.contact.email}
            </a>
          </li>
        </FooterColumn>
      </Container>

      <div className="border-t border-line-soft">
        <Container className="flex flex-col gap-3 py-6 text-sm text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>{site.copyright}</p>
          <ul className="flex gap-6">
            {footerNav.legal.map((l) => (
              <li key={l.href}>
                <FooterLink href={l.href}>{l.label}</FooterLink>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <h2 className="eyebrow mb-5">{title}</h2>
      <ul className="flex flex-col gap-3 text-[0.95rem]">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-muted transition-colors hover:text-fg">
      {children}
    </Link>
  );
}
