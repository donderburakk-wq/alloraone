import type { ModuleSlug } from "./modules";

export const home = {
  seo: {
    title: "AlloraOne · Veriden karara, tek platformda.",
    description:
      "AlloraOne; alokasyon, performans, fiyatlama ve depo kararlarınızı yapay zekâ ile veriye dayandıran karar destek platformudur. Perakende, hazır giyim, FMCG ve üretim için.",
  },

  hero: {
    eyebrow: "Yapay zekâ destekli karar destek platformu",
    title: ["Veriden karara,", "tek platformda."],
    subtitle:
      "AlloraOne; alokasyon, performans, fiyatlama ve depo kararlarınızı yapay zekâ ile veriye dayandırır. Ekipleriniz aynı veriden, aynı doğru karara ulaşır.",
    primaryCta: { label: "Bize Ulaşın", href: "/iletisim#form" },
    secondaryCta: { label: "Modülleri Keşfet", href: "/hizmetler" },
    sectorsLabel: "Sektörler",
    sectors: ["Perakende", "Hazır giyim", "FMCG", "Üretim"],
  },

  problems: {
    eyebrow: "Problem → Çözüm",
    title: "Perakendede kayıp, çoğu zaman yanlış kararla başlar.",
    problemLabel: "Sorun",
    solutionLabel: "AlloraOne'ın çözümü",
    items: [
      {
        problem: "Yanlış mağazada bekleyen stok",
        problemText:
          "Bir mağazada raflar dolu, diğerinde aynı ürün tükenmiş. Kayıp satış ve indirim baskısı aynı anda büyür.",
        solution: "Talebe göre alokasyon",
        solutionText:
          "Flusso, her mağaza ve beden için dağıtım miktarını talep tahminine göre önerir; fazlayı ihtiyaç olan mağazaya transfer eder.",
        module: "flusso" as ModuleSlug,
      },
      {
        problem: "Sezon dışı ürün sevkiyatı",
        problemText:
          "Takvim sonbaharı gösterirken hava hâlâ sıcaksa, mağazaya gönderilen mont depoda kalmaktan farksızdır.",
        solution: "Hava durumuna duyarlı dağıtım",
        solutionText:
          "Meteo, hava tahmini verisiyle sezonsal ürünlerin dağıtımını düzeltir; doğru ürün doğru haftada rafta olur.",
        module: "flusso" as ModuleSlug,
      },
      {
        problem: "Sezgiye dayalı fiyat kararları",
        problemText:
          "İndirim zamanı ve oranı yalnızca deneyimle belirlendiğinde ya marj gereksiz yere erir ya da stok sezon sonuna kalır.",
        solution: "Esnekliğe dayalı fiyatlama",
        solutionText:
          "Bilancia, ürün bazlı fiyat esnekliğini ölçer; indirimin ne zaman ve hangi oranda yapılacağını önerir.",
        module: "bilancia" as ModuleSlug,
      },
    ],
  },

  modules: {
    eyebrow: "Modüller",
    title: "Tek platform, birbirini besleyen dört modül.",
    lead: "İhtiyacınız olan modülle başlayın; diğerleri aynı veri altyapısı üzerine eklenir.",
    cardCta: "İncele",
    /** Kart animasyonlarındaki küçük, dekoratif etiketler */
    mini: {
      polso: { kpi: "Sell-through", value: "%68" },
      bilancia: { left: "Fiyat", right: "Satış hızı" },
    },
  },

  steps: {
    eyebrow: "Nasıl çalışır?",
    title: "Verinizden onaylanmış karara, dört adımda.",
    items: [
      {
        title: "Veri entegrasyonu",
        text: "Satış, stok, mağaza ve ürün verileriniz mevcut sistemlerinizden (ERP, POS, WMS) güvenli şekilde aktarılır.",
        icon: "database",
      },
      {
        title: "Model eğitimi",
        text: "Modeller sizin mağaza ağınızın geçmiş verisiyle eğitilir ve geriye dönük olarak test edilir.",
        icon: "brain",
      },
      {
        title: "Öneri ve onay",
        text: "Her öneri gerekçesiyle birlikte sunulur; ekibiniz inceler, düzenler ve onaylar.",
        icon: "check-check",
      },
      {
        title: "Sürekli öğrenme",
        text: "Gerçekleşen sonuçlar modele geri beslenir; öneriler her dönem daha isabetli hale gelir.",
        icon: "refresh-cw",
      },
    ],
  },

  cta: {
    eyebrow: "Demo",
    title: "Mağazalarınız için ne kadar doğru dağıtım yapılabileceğini görün.",
    text: "Verilerinizle hazırlanmış bir demo için ekibimizle görüşün.",
    secondary: { label: "Modülleri Keşfet", href: "/hizmetler" },
    button: "Bize Ulaşın",
    href: "/iletisim#form",
  },
} as const;
