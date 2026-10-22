import { headers } from "next/headers";

/**
 * Basit, bellek içi kayan pencere hız sınırı. Aynı IP'den belirli sürede
 * en fazla `limit` gönderime izin verir.
 *
 * Not: Bellek her sunucu örneğine özeldir; sunucusuz ortamda (Vercel) örnekler
 * arasında paylaşılmaz. Temel bir ilk savunma hattıdır; yoğun saldırıya karşı
 * Vercel Firewall hız kuralı ya da paylaşımlı bir depo (Upstash) önerilir.
 */
const buckets = new Map<string, number[]>();
const MAX_KEYS = 5000;

export async function clientIp() {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
}

export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const recent = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    buckets.set(key, recent);
    return false;
  }
  recent.push(now);
  buckets.set(key, recent);
  // Bellek şişmesin: en eski anahtarları at.
  if (buckets.size > MAX_KEYS) {
    const oldest = buckets.keys().next().value;
    if (oldest !== undefined) buckets.delete(oldest);
  }
  return true;
}

/** Tek satırlık alanlar için: satır sonu ve kontrol karakterlerini boşluğa çevirir. */
export function singleLine(value: string) {
  return value.replace(/[\u0000-\u001f\u007f]+/g, " ").trim();
}
