"use client";

import { startTransition, useActionState, useId } from "react";
import { AnimatePresence, m } from "motion/react";
import { Check, LoaderCircle } from "lucide-react";
import { porto } from "@/lib/content/modules";
import { notifyAction } from "@/app/actions/notify";
import type { NotifyState } from "@/lib/validation/notify";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const initial: NotifyState = { status: "idle" };

export function NotifyForm() {
  const [state, formAction, pending] = useActionState(notifyAction, initial);
  const id = useId();
  const t = porto.notify;
  const error = state.status === "error" ? state.message : null;
  // Azaltılmış harekette MotionProvider kaymayı atlar, yalnızca solma kalır.
  const motionProps = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -12 } };

  return (
    <div className="relative min-h-[8.5rem]">
      <AnimatePresence mode="wait" initial={false}>
        {state.status === "success" ? (
          <m.div
            key="success"
            {...motionProps}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            role="status"
            className="flex items-start gap-4"
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line-strong text-accent">
              <Check aria-hidden className="size-5" />
            </span>
            <p className="text-lg leading-relaxed text-fg">{t.success}</p>
          </m.div>
        ) : (
          <m.form
            key="form"
            {...motionProps}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            // `action` yerine onSubmit: React 19 hatalı gönderimden sonra da formu
            // sıfırlar; kullanıcının yazdığı adres kaybolmasın.
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              startTransition(() => formAction(data));
            }}
            noValidate
            className="flex flex-col gap-3"
          >
            <label htmlFor={`${id}-email`} className="text-sm text-muted">
              {t.label}
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                id={`${id}-email`}
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                placeholder={t.placeholder}
                aria-invalid={error ? true : undefined}
                aria-describedby={`${id}-msg`}
                className={cn(
                  "h-12 flex-1 rounded-control border bg-bg px-4 text-fg placeholder:text-faint focus-visible:border-fg/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                  error ? "border-danger" : "border-line",
                )}
              />
              {/* Honeypot: ekran dışında, klavye ve ekran okuyucudan gizli */}
              <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
                <label>
                  Web sitesi
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                </label>
              </div>
              <Button type="submit" size="lg" disabled={pending} className="h-12">
                {pending ? (
                  <>
                    <LoaderCircle aria-hidden className="size-4 animate-spin" />
                    {t.sending}
                  </>
                ) : (
                  t.submit
                )}
              </Button>
            </div>
            <p id={`${id}-msg`} aria-live="polite" className={cn("text-sm", error ? "text-danger" : "text-faint")}>
              {error ?? t.privacy}
            </p>
          </m.form>
        )}
      </AnimatePresence>
    </div>
  );
}
