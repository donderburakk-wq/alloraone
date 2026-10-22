import { z } from "zod";
import { contact } from "@/lib/content/contact";
import { modules, type ModuleSlug } from "@/lib/content/modules";

const e = contact.form.errors;
const moduleSlugs = modules.map((m) => m.slug) as [ModuleSlug, ...ModuleSlug[]];

export const contactSchema = z.object({
  name: z.string().trim().min(2, { error: e.name }).max(120, { error: e.name }),
  company: z.string().trim().min(2, { error: e.company }).max(160, { error: e.company }),
  title: z.string().trim().max(120),
  email: z.email({ error: e.email }).max(200, { error: e.email }),
  phone: z
    .string()
    .trim()
    .max(30, { error: e.phone })
    .refine((v) => v === "" || /^[+()\d\s-]{7,}$/.test(v), { error: e.phone }),
  storeCount: z.enum(contact.form.storeRanges, { error: e.storeCount }),
  modules: z.array(z.enum(moduleSlugs)),
  message: z.string().trim().max(2000, { error: e.message }),
  kvkk: z.literal("on", { error: e.kvkk }),
  /** Honeypot: görünmez alan; doluysa gönderim bot kabul edilir. */
  website: z.string().max(0),
});

export type ContactField = keyof z.infer<typeof contactSchema>;

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string; fieldErrors: Partial<Record<ContactField, string>> };
