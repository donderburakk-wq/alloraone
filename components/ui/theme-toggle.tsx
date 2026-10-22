"use client";

import { useLayoutEffect, useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { ui } from "@/lib/content/nav";
import { THEME_KEY, type Theme } from "@/lib/theme";
import { cn } from "@/lib/utils";

function readStored(): Theme | null {
  try {
    const t = localStorage.getItem(THEME_KEY);
    return t === "light" || t === "dark" ? t : null;
  } catch {
    return null;
  }
}

// Kaynak gerçek: <html data-theme>. Satır içi script onu ilk boyamadan önce ayarlar.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}
const getTheme = (): Theme => (document.documentElement.dataset.theme === "light" ? "light" : "dark");
const getServerTheme = (): Theme => "dark";

export function ThemeToggle({ className }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);

  // Geliştirme modunda Strict Mode <html> niteliklerini sıfırlar; yeniden uygula.
  useLayoutEffect(() => {
    const stored = readStored();
    if (stored) document.documentElement.dataset.theme = stored;
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {}
  }

  const label = theme === "dark" ? ui.themeToLight : ui.themeToDark;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={cn(
        "relative grid size-9 place-items-center rounded-full border border-line text-muted transition-colors hover:border-fg/30 hover:text-fg",
        className,
      )}
    >
      <Sun aria-hidden strokeWidth={1.5} className="size-4 scale-0 rotate-90 transition-transform duration-500 ease-out-expo light:scale-100 light:rotate-0" />
      <Moon aria-hidden strokeWidth={1.5} className="absolute size-4 scale-100 transition-transform duration-500 ease-out-expo light:scale-0 light:-rotate-90" />
    </button>
  );
}
