"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { mainNav, servicesNav, ui } from "@/lib/content/nav";
import { modules } from "@/lib/content/modules";
import { site } from "@/lib/content/site";
import { ButtonLink } from "@/components/ui/button";
import { ModuleCode, SoonBadge } from "@/components/ui/module-mark";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

export function MobileMenu({
  open,
  pathname,
  onNavigate,
}: {
  open: boolean;
  pathname: string;
  onNavigate: () => void;
}) {
  const reduced = useReducedMotion();
  const firstLink = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (open) firstLink.current?.focus({ preventScroll: true });
  }, [open]);

  const item = (i: number) => ({
    initial: reduced ? { opacity: 0 } : { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease, delay: 0.05 + i * 0.03 } },
    exit: { opacity: 0, transition: { duration: 0.15 } },
  });

  return (
    <AnimatePresence>
      {open && (
        <m.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label={ui.mainNavLabel}
          className="fixed inset-0 -z-10 flex flex-col overflow-y-auto bg-bg pt-24 pb-10 lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0.12 : 0.3, ease: "easeOut" }}
        >
          <nav className="relative px-4 sm:px-6">
            <ul className="flex flex-col">
              {mainNav.map((link, i) => {
                const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                return (
                  <m.li key={link.href} {...item(i)} className="border-b border-line-soft">
                    <Link
                      ref={i === 0 ? firstLink : undefined}
                      href={link.href}
                      onClick={onNavigate}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-baseline justify-between py-4 font-display text-4xl font-medium tracking-[-0.035em] sm:text-5xl",
                        active ? "text-fg" : "text-muted",
                      )}
                    >
                      {link.label}
                      <span className="eyebrow">0{i + 1}</span>
                    </Link>
                    {link.href === servicesNav.href && (
                      <ul className="grid grid-cols-2 gap-2 pb-5">
                        {modules.map((m) => (
                          <li key={m.slug}>
                            <Link
                              href={`/hizmetler/${m.slug}`}
                              onClick={onNavigate}
                              className="flex flex-col gap-2 rounded-card border border-line bg-surface p-3"
                            >
                              <span className="flex items-center justify-between gap-1">
                                <ModuleCode module={m} short />
                                {m.status === "soon" && <SoonBadge label={ui.soon} />}
                              </span>
                              <span className="font-display text-xl font-medium tracking-[-0.02em]">{m.name}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </m.li>
                );
              })}
            </ul>
            <m.div {...item(mainNav.length)} className="mt-8">
              <ButtonLink href={site.demo.href} onClick={onNavigate} size="lg" arrow className="w-full">
                {site.demo.label}
              </ButtonLink>
            </m.div>
          </nav>
        </m.div>
      )}
    </AnimatePresence>
  );
}
