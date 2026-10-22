export const site = {
  name: "AlloraOne",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "tr_TR",
  title: "AlloraOne · Yapay zekâ destekli karar destek platformu",
  description:
    "AlloraOne, çok mağazalı perakende zincirleri için stok, satış ve fiyat kararlarını yapay zekâ ile veriye dayandıran karar destek platformudur.",
  statement:
    "Stok, satış ve fiyat kararlarınızı sahada doğrulanmış modellerle veriye dayandırıyoruz.",
  contact: {
    email: "destek@alloraone.com",
    whatsapp: "[WHATSAPP_NUMARASI]",
  },
  demo: { label: "Bize Ulaşın", href: "/iletisim#form" },
  copyright: "© 2026 AlloraOne. Tüm hakları saklıdır.",
} as const;

export type SiteContent = typeof site;
