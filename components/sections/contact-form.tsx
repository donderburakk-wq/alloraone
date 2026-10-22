"use client";

import Link from "next/link";
import { startTransition, useActionState, useEffect, useId, useReducer, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, m } from "motion/react";
import { Check, ChevronDown, LoaderCircle } from "lucide-react";
import { contact } from "@/lib/content/contact";
import { modules } from "@/lib/content/modules";
import { contactAction } from "@/app/actions/contact";
import type { ContactState } from "@/lib/validation/contact";
import { Button } from "@/components/ui/button";
import { ModuleCode } from "@/components/ui/module-mark";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;
const initial: ContactState = { status: "idle" };

/** Başarıdan sonra "Yeni mesaj gönder" formu sıfırdan bağlar. */
export function ContactForm() {
  const [round, setRound] = useReducer((r: number) => r + 1, 0);
  return <ContactFormInner key={round} onReset={setRound} />;
}

function ContactFormInner({ onReset }: { onReset: () => void }) {
  const [state, formAction, pending] = useActionState(contactAction, initial);
  const formRef = useRef<HTMLFormElement>(null);
  const t = contact.form;
  const errors = state.status === "error" ? state.fieldErrors : {};

  // Hata sonrası odağı ilk hatalı alana taşı.
  useEffect(() => {
    if (state.status !== "error") return;
    formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
  }, [state]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      {state.status === "success" ? (
        <m.div
          key="success"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          role="status"
          className="flex min-h-[28rem] flex-col items-start justify-center gap-6"
        >
          <SuccessMark />
          <h2 className="font-display text-4xl">{t.success.title}</h2>
          <p className="max-w-md text-lg leading-relaxed text-muted">{t.success.text}</p>
          <Button variant="secondary" onClick={onReset}>
            {t.success.again}
          </Button>
        </m.div>
      ) : (
        <m.form
          key="form"
          ref={formRef}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.4, ease }}
          // `action` yerine onSubmit: React 19 `action` ile gönderilen formu hata
          // sonrasında da sıfırlar; böylece kullanıcının girdiği değerler korunur.
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            startTransition(() => formAction(data));
          }}
          noValidate
          className="flex flex-col gap-6"
        >
          <AnimatePresence initial={false}>
            {state.status === "error" && (
              <m.p
                key={state.message}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                role="alert"
                className="overflow-hidden rounded-control border border-danger/50 px-4 py-3 text-sm text-fg"
              >
                {state.message}
              </m.p>
            )}
          </AnimatePresence>

          <div className="grid gap-5 sm:grid-cols-2">
            <TextField name="name" field={t.fields.name} required autoComplete="name" error={errors.name} />
            <TextField name="company" field={t.fields.company} required autoComplete="organization" error={errors.company} />
            <TextField name="title" field={t.fields.title} optional={t.optional} autoComplete="organization-title" error={errors.title} />
            <TextField name="email" type="email" inputMode="email" field={t.fields.email} required autoComplete="email" error={errors.email} />
            <TextField name="phone" type="tel" inputMode="tel" field={t.fields.phone} optional={t.optional} autoComplete="tel" error={errors.phone} />
            <SelectField error={errors.storeCount} />
          </div>

          <ModulesField />

          <Field label={t.fields.message.label} optional={t.optional} error={errors.message}>
            {(p) => (
              <textarea
                {...p}
                name="message"
                rows={5}
                maxLength={2000}
                placeholder={t.fields.message.placeholder}
                className={cn(inputClass(!!errors.message), "h-auto resize-y py-3")}
              />
            )}
          </Field>

          {/* Honeypot: ekran dışında, klavye ve ekran okuyucudan gizli */}
          <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
            <label>
              Web sitesi
              <input type="text" name="website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>

          <KvkkField error={errors.kvkk} />

          <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-faint">{t.requiredNote}</p>
            <Button type="submit" size="lg" disabled={pending} className="min-w-44">
              {pending ? (
                <>
                  <LoaderCircle aria-hidden className="size-4 animate-spin" />
                  {t.submitting}
                </>
              ) : (
                t.submit
              )}
            </Button>
          </div>
        </m.form>
      )}
    </AnimatePresence>
  );
}

// --- Alanlar -------------------------------------------------------------------

const inputClass = (invalid: boolean) =>
  cn(
    "h-12 w-full rounded-control border bg-bg px-4 text-fg transition-colors placeholder:text-faint hover:border-line-strong focus-visible:border-fg/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
    invalid ? "border-danger" : "border-line",
  );

type ControlProps = { id: string; "aria-invalid"?: true; "aria-describedby"?: string; "aria-required"?: true };

function Field({
  label,
  required,
  optional,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  optional?: string;
  error?: string;
  children: (props: ControlProps) => ReactNode;
}) {
  const id = useId();
  const errId = `${id}-err`;
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="flex items-baseline justify-between gap-2 text-sm text-fg">
        <span>
          {label}
          {required && (
            <span aria-hidden className="text-accent">
              {" "}
              *
            </span>
          )}
        </span>
        {optional && <span className="text-xs text-faint">{optional}</span>}
      </label>
      {children({
        id,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": error ? errId : undefined,
        "aria-required": required ? true : undefined,
      })}
      <FieldError id={errId} error={error} />
    </div>
  );
}

function FieldError({ id, error }: { id: string; error?: string }) {
  return (
    <AnimatePresence initial={false}>
      {error && (
        <m.p
          id={id}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="text-sm text-danger"
        >
          {error}
        </m.p>
      )}
    </AnimatePresence>
  );
}

function TextField({
  name,
  field,
  type = "text",
  inputMode,
  required,
  optional,
  autoComplete,
  error,
}: {
  name: string;
  field: { label: string; placeholder: string };
  type?: string;
  inputMode?: "email" | "tel" | "text";
  required?: boolean;
  optional?: string;
  autoComplete?: string;
  error?: string;
}) {
  return (
    <Field label={field.label} required={required} optional={optional} error={error}>
      {(p) => (
        <input
          {...p}
          name={name}
          type={type}
          inputMode={inputMode}
          autoComplete={autoComplete}
          placeholder={field.placeholder}
          className={inputClass(!!error)}
        />
      )}
    </Field>
  );
}

/** Seçim yapılana kadar yer tutucu soluk görünsün diye değer state'te tutulur. */
function SelectField({ error }: { error?: string }) {
  const f = contact.form.fields.storeCount;
  const [value, setValue] = useState("");
  return (
    <Field label={f.label} required error={error}>
      {(p) => (
        <div className="relative">
          <select
            {...p}
            name="storeCount"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={cn(inputClass(!!error), "appearance-none pr-10", value === "" && "text-faint!")}
          >
            <option value="" disabled>
              {f.placeholder}
            </option>
            {contact.form.storeRanges.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          <ChevronDown aria-hidden className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted" />
        </div>
      )}
    </Field>
  );
}

function ModulesField() {
  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="mb-3 flex w-full items-baseline justify-between text-sm text-fg">
        {contact.form.fields.modules.label}
        <span className="text-xs text-faint">{contact.form.optional}</span>
      </legend>
      <div className="flex flex-wrap gap-2">
        {modules.map((m) => (
          <label
            key={m.slug}
            className="group relative inline-flex cursor-pointer items-center gap-2.5 rounded-full border border-line px-4 py-2.5 text-sm text-muted transition-colors select-none hover:border-line-strong has-checked:border-fg/60 has-checked:bg-surface-2 has-checked:text-fg has-focus-visible:ring-2 has-focus-visible:ring-accent/50"
          >
            <input type="checkbox" name="modules" value={m.slug} className="peer sr-only" />
            <span aria-hidden className="size-2 rounded-full border border-line-strong peer-checked:border-accent peer-checked:bg-accent" />
            AlloraOne {m.name}
            <ModuleCode module={m} short className="text-[0.625rem]!" />
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function KvkkField({ error }: { error?: string }) {
  const id = useId();
  const k = contact.form.fields.kvkk;
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-start gap-3">
        <span className="relative mt-0.5 grid size-5 shrink-0">
          <input
            id={id}
            type="checkbox"
            name="kvkk"
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${id}-err` : undefined}
            aria-required
            className={cn(
              "peer size-5 cursor-pointer appearance-none rounded-[4px] border bg-bg transition-colors checked:border-fg checked:bg-fg",
              error ? "border-danger/70" : "border-line",
            )}
          />
          <Check
            aria-hidden
            strokeWidth={3}
            className="pointer-events-none absolute inset-0 m-auto size-3.5 text-bg opacity-0 transition-opacity peer-checked:opacity-100"
          />
        </span>
        <label htmlFor={id} className="text-sm leading-relaxed text-muted">
          {k.before}
          <Link href="/kvkk" target="_blank" rel="noopener" className="text-fg underline decoration-line underline-offset-4 hover:decoration-fg">
            {k.link}
          </Link>
          {k.after}
          <span aria-hidden className="text-accent">
            {" "}
            *
          </span>
        </label>
      </div>
      <FieldError id={`${id}-err`} error={error} />
    </div>
  );
}

/** Başarı işareti: daire ve onay çizgisi çizilerek belirir. */
function SuccessMark() {
  return (
    <svg viewBox="0 0 64 64" className="size-16 text-accent" aria-hidden>
      <m.circle
        cx="32"
        cy="32"
        r="29"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, ease }}
      />
      <m.path
        d="M20 33 L28 41 L45 23"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, ease, delay: 0.5 }}
      />
    </svg>
  );
}
