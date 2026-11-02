import { cn } from "@/lib/utils";

/**
 * Bölüm ayracı: içerik sütunu genişliğinde ince taralı şerit, kenarlarında
 * sayfa çerçevesiyle kesiştiği noktalarda "+" işaretleri.
 */
export function Divider({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("relative mx-auto h-10 max-w-[120rem] border-y border-line-soft", className)}>
      <div className="hatch absolute inset-0" />
      <Cross className="-top-[5px] -left-[5px]" />
      <Cross className="-top-[5px] -right-[5px]" />
      <Cross className="-bottom-[5px] -left-[5px]" />
      <Cross className="-right-[5px] -bottom-[5px]" />
    </div>
  );
}

function Cross({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 9 9" className={cn("absolute hidden size-[9px] text-line-strong md:block", className)}>
      <path d="M4.5 0v9M0 4.5h9" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
