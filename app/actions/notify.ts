"use server";

import { porto } from "@/lib/content/modules";
import { sendMail } from "@/lib/mail";
import { clientIp, rateLimit, singleLine } from "@/lib/rate-limit";
import { notifySchema, type NotifyState } from "@/lib/validation/notify";

export async function notifyAction(_prev: NotifyState, formData: FormData): Promise<NotifyState> {
  // Aynı IP'den 10 dakikada en fazla 3 kayıt.
  if (!rateLimit(`notify:${await clientIp()}`, 3, 10 * 60_000)) {
    return { status: "error", message: porto.notify.rateLimited };
  }

  const parsed = notifySchema.safeParse({
    email: singleLine(String(formData.get("email") ?? "")),
    website: String(formData.get("website") ?? ""),
  });

  if (!parsed.success) {
    // Honeypot doluysa bota başarı gibi görün, hiçbir şey gönderme.
    if (parsed.error.issues.some((i) => i.path[0] === "website")) return { status: "success" };
    return { status: "error", message: porto.notify.invalidEmail, field: "email" };
  }

  const { ok } = await sendMail({
    subject: "AlloraOne Porto · yayın bildirimi kaydı",
    text: `AlloraOne Porto yayına girdiğinde haber verilmesini isteyen yeni kayıt:\n\nE-posta: ${parsed.data.email}`,
    replyTo: parsed.data.email,
  });

  return ok ? { status: "success" } : { status: "error", message: porto.notify.error };
}
