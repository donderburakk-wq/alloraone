export const services = {
  seo: {
    title: "Hizmetlerimiz",
    description:
      "AlloraOne Flusso, Polso, Bilancia, Lente ve Porto: stok alokasyonu, KPI takibi, fiyat optimizasyonu, veritabanından raporlama ve depo yönetimi için birbirini besleyen beş modül.",
  },
  intro: {
    eyebrow: "Hizmetlerimiz",
    title: "Stoktan fiyata, mağazadan depoya.",
    lead: "AlloraOne beş modülden oluşur. Her biri tek başına değer üretir; birlikte kullanıldığında birbirinin verisini besler.",
  },
  diagram: {
    eyebrow: "Modüller nasıl birlikte çalışır?",
    title: "Bir temel katman, bir döngü.",
    lead: "Lente, işletmenizin veri katmanını okuyan temel katmandır. Flusso'nun dağıttığı stoğu Polso ölçer, Polso'nun gördüğünü Bilancia fiyata yansıtır. Porto ise bu döngünün başladığı yeri, deponun kendisini yönetir.",
    loopNote: "Sonuçlar bir sonraki dağıtım kararına geri döner.",
  },
  source: {
    eyebrow: "Veri katmanı",
    title: "Mevcut veritabanınız",
    text: "Verinin zaten bulunduğu yer",
  },
  cards: {
    eyebrow: "Modüller",
    title: "Her modül, bir karar alanı.",
  },
  modulePage: {
    liveLabel: "Canlı",
    primaryCta: "Bize Ulaşın",
    secondaryCta: "Tüm modüller",
    featuresEyebrow: "Özellikler",
    featuresTitle: "Neler yapar?",
    highlightLabel: "Ayırt edici özellik",
    previewEyebrow: "Örnek ekran",
    previewTitle: "Kararlar ve raporlar, gerekçeleriyle tek ekranda.",
    previewNote: "Temsilî verilerle hazırlanmış arayüz önizlemesidir; gerçek müşteri verisi içermez.",
    benefitsEyebrow: "Faydalar",
    benefitsTitle: "Ekibinize ne kazandırır?",
    ctaTitle: "Bu modülü kendi verilerinizle görün.",
    ctaText: "Mağaza ağınızın verisiyle hazırlanmış bir demo için ekibimizle görüşün.",
    otherModules: "Diğer modüller",
  },
  meteoDemo: {
    title: "Örnek: sıcak geçen bir sonbahar haftası",
    caption: "Dağıtım çarpanı",
    rows: [
      { product: "Mont", factor: 0.4 },
      { product: "Trençkot", factor: 0.8 },
      { product: "Tişört", factor: 1.3 },
    ],
  },
  portoPage: {
    lockedLabel: "Geliştiriliyor",
    featuresTitle: "Planlanan özellikler",
  },
} as const;
