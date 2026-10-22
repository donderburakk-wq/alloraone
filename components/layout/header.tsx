"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { useLenis } from "lenis/react";
import { mainNav, servicesNav, ui } from "@/lib/content/nav";
import { modules } from "@/lib/content/modules";
import { site } from "@/lib/content/site";
import { Logo } from "@/components/ui/logo";
import { ButtonLink } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ModuleCode, SoonBadge } from "@/components/ui/module-mark";
import { MobileMenu } from "./mobile-menu";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  // Menüler açıldıkları yola bağlanır; sayfa değişince kendiliğinden kapanır.
  const [servicesOpenAt, setServicesOpenAt] = useState<string | null>(null);
  const [mobileOpenAt, setMobileOpenAt] = useState<string | null>(null);
  const servicesOpen = servicesOpenAt === pathname;
  const mobileOpen = mobileOpenAt === pathname;

  const servicesRef = useRef<HTMLDivElement>(null);
  const servicesButtonRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const lenis = useLenis();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobil menü açıkken sayfa kaydırılamaz ve arkadaki içerik odak/ekran
  // okuyucu için devre dışıdır (inert): Tab menünün dışına çıkmaz.
  useEffect(() => {
    if (!mobileOpen) return;
    const root = document.documentElement;
    const behind = [document.getElementById("icerik"), document.getElementById("site-footer")];
    root.style.overflow = "hidden";
    behind.forEach((el) => el && (el.inert = true));
    lenis?.stop();
    return () => {
      root.style.overflow = "";
      behind.forEach((el) => el && (el.inert = false));
      lenis?.start();
    };
  }, [mobileOpen, lenis]);

  useEffect(() => {
    if (!servicesOpen && !mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      // Kapanan menünün açıcısına odağı geri ver.
      (mobileOpen ? menuButtonRef : servicesButtonRef).current?.focus();
      setServicesOpenAt(null);
      setMobileOpenAt(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [servicesOpen, mobileOpen]);

  const compact = scrolled || mobileOpen;

  return (
    <header style={{ viewTransitionName: "site-header" }} className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "transition-[background-color,border-color] duration-300",
          compact && !mobileOpen ? "border-b border-line-soft bg-bg/95" : "border-b border-transparent",
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 transition-[height] duration-500 ease-out-expo sm:px-6 lg:px-10",
            compact ? "h-16" : "h-20 lg:h-24",
          )}
        >
          <Link href="/" className="relative z-10 shrink-0 text-fg" aria-label={`${site.name}, ${ui.backHome}`}>
            <Logo className={cn("transition-[height] duration-500 ease-out-expo", compact ? "h-6" : "h-7")} />
          </Link>

          <nav aria-label={ui.mainNavLabel} className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {mainNav.map((item) => {
                const active = isActive(pathname, item.href);
                if (item.href !== servicesNav.href) {
                  return (
                    <li key={item.href}>
                      <NavLink href={item.href} active={active}>
                        {item.label}
                      </NavLink>
                    </li>
                  );
                }
                return (
                  <li key={item.href}>
                    <div
                      ref={servicesRef}
                      className="relative"
                      onMouseEnter={() => setServicesOpenAt(pathname)}
                      onMouseLeave={() => setServicesOpenAt(null)}
                      onBlur={(e) => {
                        if (!servicesRef.current?.contains(e.relatedTarget as Node | null)) setServicesOpenAt(null);
                      }}
                    >
                      <div className="flex items-center">
                        <NavLink href={item.href} active={active} className="pr-1">
                          {item.label}
                        </NavLink>
                        <button
                          ref={servicesButtonRef}
                          type="button"
                          aria-expanded={servicesOpen}
                          aria-controls={panelId}
                          aria-label={`${item.label} alt menüsü`}
                          onClick={() => setServicesOpenAt(servicesOpen ? null : pathname)}
                          className="grid size-7 place-items-center rounded-full text-muted transition-colors hover:text-fg"
                        >
                          <ChevronDown
                            aria-hidden
                            className={cn("size-3.5 transition-transform duration-300", servicesOpen && "rotate-180")}
                          />
                        </button>
                      </div>
                      <div
                        id={panelId}
                        hidden={!servicesOpen}
                        className="absolute top-full left-1/2 w-[34rem] -translate-x-1/2 pt-3"
                      >
                        <div className="overflow-hidden rounded-card border border-line bg-surface">
                          <ul className="grid grid-cols-2 gap-px bg-line-soft">
                            {modules.map((m) => (
                              <li key={m.slug} className="bg-surface">
                                <Link
                                  href={`/hizmetler/${m.slug}`}
                                  className="flex h-full flex-col gap-3 p-5 transition-colors hover:bg-surface-2"
                                >
                                  <span className="flex items-center justify-between gap-2">
                                    <ModuleCode module={m} />
                                    {m.status === "soon" && <SoonBadge label={ui.soon} />}
                                  </span>
                                  <span className="font-display text-xl font-medium tracking-[-0.02em] text-fg">
                                    AlloraOne {m.name}
                                  </span>
                                  <span className="text-sm leading-snug text-muted">{m.summary}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                          <Link
                            href={servicesNav.href}
                            className="flex items-center justify-between border-t border-line-soft px-5 py-3.5 text-sm text-muted transition-colors hover:bg-surface-2 hover:text-fg"
                          >
                            {servicesNav.overview}
                            <span aria-hidden>→</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="relative z-10 flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <div className="hidden sm:block">
              <ButtonLink href={site.demo.href} size="sm">
                {site.demo.label}
              </ButtonLink>
            </div>
            <button
              ref={menuButtonRef}
              type="button"
              className="grid size-10 place-items-center rounded-full border border-line text-fg lg:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? ui.closeMenu : ui.openMenu}
              onClick={() => setMobileOpenAt(mobileOpen ? null : pathname)}
            >
              {mobileOpen ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      <MobileMenu open={mobileOpen} pathname={pathname} onNavigate={() => setMobileOpenAt(null)} />
    </header>
  );
}

function NavLink({
  href,
  active,
  className,
  children,
}: {
  href: string;
  active: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative inline-flex h-9 items-center px-3.5 text-sm transition-colors",
        active ? "text-fg" : "text-muted hover:text-fg",
        className,
      )}
    >
      {children}
      {active && <span aria-hidden className="absolute inset-x-3.5 -bottom-0.5 h-px bg-accent" />}
    </Link>
  );
}
