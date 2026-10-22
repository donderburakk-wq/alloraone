"use server";

import { contact } from "@/lib/content/contact";
import { modules } from "@/lib/content/modules";
import { sendMail } from "@/lib/mail";
import { clientIp, rateLimit, singleLine } from "@/lib/rate-limit";
import { contactSchema, type ContactField, type ContactState } from "@/lib/validation/contact";

const str = (fd: FormData, key: string) => String(fd.get(key) ?? "");
const line = (fd: FormData, key: string) => singleLine(str(fd, key));

export async function contactAction(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Aynı IP'den 10 dakikada en fazla 5 gönderim.
  if (!rateLimit(`contact:${await clientIp()}`, 5, 10 * 60_000)) {
    return { status: "error", message: contact.form.rateLimited, fieldErrors: {} };
  }

  const parsed = contactSchema.safeParse({
    name: line(formData, "name"),
    company: line(formData, "company"),
    title: line(formData, "title"),
    email: line(formData, "email"),
    phone: line(formData, "phone"),
    storeCount: str(formData, "storeCount"),
    modules: formData.getAll("modules").map(String),
    message: str(formData, "message"),
    kvkk: formData.get("kvkk") ? "on" : "",
    website: str(formData, "website"),
  });

  if (!parsed.success) {
    const fieldErrors: Partial<Record<ContactField, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as ContactField;
      if (key === "website") return { status: "success" }; // bot: sessizce yut
      fieldErrors[key] ??= issue.message;
    }
    return { status: "error", message: contact.form.errorBanner, fieldErrors };
  }

  const d = parsed.data;
  const f = contact.form.fields;
  const moduleNames = d.modules.map((s) => `AlloraOne ${modules.find((m) => m.slug === s)?.name ?? s}`).join(", ") || "—";
  const text = [
    `${f.name.label}: ${d.name}`,
    `${f.company.label}: ${d.company}`,
    `${f.title.label}: ${d.title || "—"}`,
    `${f.email.label}: ${d.email}`,
    `${f.phone.label}: ${d.phone || "—"}`,
    `${f.storeCount.label}: ${d.storeCount}`,
    `${f.modules.label}: ${moduleNames}`,
    "",
    `${f.message.label}:`,
    d.message || "—",
    "",
    "KVKK aydınlatma metni onaylandı.",
  ].join("\n");

  const { ok } = await sendMail({ subject: `İletişim formu · ${d.company}`, text, replyTo: d.email });

  return ok ? { status: "success" } : { status: "error", message: contact.form.error, fieldErrors: {} };
}
