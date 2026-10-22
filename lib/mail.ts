import { Resend } from "resend";
import { site } from "@/lib/content/site";

type MailInput = { subject: string; text: string; replyTo?: string };

/**
 * Site formlarından gelen bildirimleri destek@alloraone.com adresine gönderir
 * (CONTACT_TO_EMAIL ile değiştirilebilir). RESEND_API_KEY yoksa geliştirme
 * ortamında içeriği konsola yazar ve başarılı sayar; üretimde hata döner.
 */
export async function sendMail({ subject, text, replyTo }: MailInput): Promise<{ ok: boolean }> {
  const apiKey = process.env.RESEND_API_KEY;
  // Varsayılan alıcı sitenin destek adresi; ortam değişkeniyle değiştirilebilir.
  const to = process.env.CONTACT_TO_EMAIL || site.contact.email;
  const from = process.env.CONTACT_FROM_EMAIL || "AlloraOne <onboarding@resend.dev>";

  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[mail:dev] → ${to}\n${subject}\n${text}`);
      return { ok: true };
    }
    console.error("[mail] RESEND_API_KEY tanımlı değil");
    return { ok: false };
  }

  const { error } = await new Resend(apiKey).emails.send({ from, to, subject, text, replyTo });
  if (error) {
    console.error("[mail] Resend hatası:", error);
    return { ok: false };
  }
  return { ok: true };
}
