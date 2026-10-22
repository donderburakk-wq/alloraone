import { z } from "zod";
import { porto } from "@/lib/content/modules";

export const notifySchema = z.object({
  email: z.email({ error: porto.notify.invalidEmail }).max(200),
  /** Honeypot: insanlar bu alanı görmez; doluysa gönderim bot kabul edilir. */
  website: z.string().max(0).optional().or(z.literal("")),
});

export type NotifyState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string; field?: "email" };
