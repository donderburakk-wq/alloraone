import { cn } from "@/lib/utils";

/**
 * Tipografik kelime markası (Google Sans, sıkı harf aralığı). Sondaki
 * aksan rengindeki nokta marka vurgusudur; metnin parçası
 * olduğu için her fontta harfe bitişik kalır.
 */
export function Logo({ className, title = "AlloraOne" }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 138 32"
      role="img"
      aria-label={title}
      className={cn("h-7 w-auto overflow-visible", className)}
    >
      <text
        x="0"
        y="24"
        fill="currentColor"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 28,
          fontWeight: 500,
          letterSpacing: "-0.04em",
        }}
      >
        AlloraOne<tspan fill="var(--color-accent)">.</tspan>
      </text>
    </svg>
  );
}
