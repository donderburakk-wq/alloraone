export type ModuleSlug = "flusso" | "polso" | "bilancia" | "lente" | "porto";

/** components/ui/icon.tsx içindeki eşlemeyle birebir olmalı. */
export type IconName =
  | "boxes"
  | "route"
  | "cloud-sun"
  | "arrow-left-right"
  | "layout-dashboard"
  | "trophy"
  | "siren"
  | "lightbulb"
  | "activity"
  | "badge-percent"
  | "scan-search"
  | "package-check"
  | "layers"
  | "eye"
  | "shopping-basket"
  | "timer"
  | "database"
  | "brain"
  | "check-check"
  | "refresh-cw"
  | "target"
  | "puzzle"
  | "line-chart"
  | "shield-check"
  | "map-pin"
  | "sparkles"
  | "cable"
  | "file-text"
  | "sliders-horizontal"
  | "calendar-clock";

export type ModuleFeature = {
  /** İtalyanca isim */
  it: string;
  /** Türkçe karşılık */
  tr: string;
  description: string;
  icon: IconName;
  /** Ürünün ayırt edici özelliği; görsel olarak öne çıkarılır. */
  highlight?: boolean;
};

export type Module = {
  slug: ModuleSlug;
  name: string;
  code: string;
  /** Mono etikette koddan sonra gelen kısa kategori: "AFX · ALOKASYON" */
  label: string;
  /** İsmin Türkçe karşılığı: "Akış", "Nabız"… */
  meaning: string;
  status: "live" | "soon";
  /** Tek cümlelik değer önerisi */
  tagline: string;
  /** Kartlarda ve menüde kullanılan kısa açıklama */
  summary: string;
  /** Hizmetler diyagramında modülün rolü */
  role: string;
  features: ModuleFeature[];
  benefits: string[];
  seo: { title: string; description: string };
};

export const modules: Module[] = [
  {
    slug: "flusso",
    name: "Flusso",
    code: "AFX",
    label: "Alokasyon",
    meaning: "Akış",
    status: "live",
    tagline:
      "Her ürünü, doğru miktarda, talebin olduğu mağazaya ve doğru zamanda ulaştırır.",
    summary:
      "Mağaza bazlı anlık stok görünürlüğü ve yapay zekâ ile mağaza ve ürün/varyant kırılımında alokasyon önerisi.",
    role: "Stoğu dağıtır",
    features: [
      {
        it: "Scorta",
        tr: "Stok Takibi",
        description:
          "Her mağazanın her ürün ve varyantındaki stoğunu anlık olarak tek ekranda görün. Eksik ve fazla stok, oluştuğu anda görünür hale gelir.",
        icon: "boxes",
      },
      {
        it: "Rotta",
        tr: "Alokasyon Önerisi",
        description:
          "Geçmiş satış ve stok verisinden öğrenen yapay zekâ, her mağaza ve ürün/varyant için dağıtım miktarı önerir. Mağazanın m² kapasitesi ile mağazaya özgü talep profilleri hesaba katılır.",
        icon: "route",
      },
      {
        it: "Meteo",
        tr: "Hava Durumu Etkisi",
        description:
          "Hava tahmini verisi, sezonsal ürünlerin dağıtımını bir düzeltme çarpanıyla ayarlar. Sıcak bir haftada mont, yağmurlu bir haftada sandalet mağazaya gitmez.",
        icon: "cloud-sun",
        highlight: true,
      },
      {
        it: "Ponte",
        tr: "Depo ve Mağazalar Arası Transfer",
        description:
          "Stoğu en doğru kaynaktan hareket ettirir: depolardan mağazalara ikmal ya da bir mağazada bekleyen fazla stoğun, aynı ürüne ihtiyaç duyan mağazaya transferi için öneriler üretir.",
        icon: "arrow-left-right",
      },
    ],
    benefits: [
      "Yanlış mağazada bekleyen stok azalır, raf alanı satan ürüne kalır.",
      "Varyant kırılımında daha az kayıp satış yaşanır.",
      "Sezon dışı ürün sevkiyatının önüne geçilir.",
      "Planlama ekibi hesaplamaya değil, önerileri değerlendirmeye zaman ayırır.",
    ],
    seo: {
      title: "AlloraOne Flusso · Stok takibi ve yapay zekâ ile mağaza alokasyonu",
      description:
        "AlloraOne Flusso; anlık stok görünürlüğü, yapay zekâ destekli mağaza ve ürün/varyant bazlı alokasyon önerisi, hava durumu etkisi ve depodan mağazaya ya da mağazalar arası transfer önerileri sunar.",
    },
  },
  {
    slug: "polso",
    name: "Polso",
    code: "APL",
    label: "Performans",
    meaning: "Nabız",
    status: "live",
    tagline:
      "Perakendeden üretime, işletmenizin performansının nabzını tutar; nerede aksiyon almanız gerektiğini gösterir.",
    summary:
      "Sektörden bağımsız KPI takibi ve performans ölçümü: satış, stok, üretim ve operasyon metrikleri, erken uyarılar ve geliştirme önerileri.",
    role: "Performansı ölçer",
    features: [
      {
        it: "Quadro",
        tr: "KPI Panosu",
        description:
          "Perakendede sell-through ve stok devir hızı, üretimde verimlilik, kapasite kullanımı ve fire oranı… İşletmenize özel temel metrikleri birim, hat, mağaza veya ürün kırılımında tek panoda izleyin.",
        icon: "layout-dashboard",
      },
      {
        it: "Classifica",
        tr: "Performans Sıralaması",
        description:
          "Mağazaları, üretim hatlarını, tesisleri ya da ürünleri seçtiğiniz metriğe göre sıralayın; en güçlü ve en zayıf performansı saniyeler içinde bulun.",
        icon: "trophy",
      },
      {
        it: "Segnale",
        tr: "Erken Uyarı",
        description:
          "Hedeften sapan her metrik için sorun büyümeden sinyal üretir: tükenmek üzere olan stok, yavaşlayan satış, düşen hat verimliliği ya da artan fire.",
        icon: "siren",
      },
      {
        it: "Consiglio",
        tr: "Geliştirme Önerileri",
        description:
          "Verilerden çıkarılan somut aksiyonlar: hangi üründe, hangi mağazada ya da hangi üretim hattında neyin iyileştirilmesi gerektiği ve neden.",
        icon: "lightbulb",
      },
    ],
    benefits: [
      "Perakende, üretim ya da operasyon; tüm birimlerin performansı tek bir ortak dilde ölçülür.",
      "Sorunlar raporda değil, oluşurken fark edilir.",
      "Toplantılar tartışmayla değil, veriyle başlar.",
      "Her uyarı, yanında uygulanabilir bir öneriyle gelir.",
    ],
    seo: {
      title: "AlloraOne Polso · KPI takibi ve performans ölçümü",
      description:
        "AlloraOne Polso; perakendeden üretime her sektörde KPI takibi, performans sıralaması, erken uyarılar ve geliştirme önerilerini tek panoda toplar.",
    },
  },
  {
    slug: "bilancia",
    name: "Bilancia",
    code: "ABL",
    label: "Fiyatlama",
    meaning: "Terazi",
    status: "live",
    tagline: "Fiyat ile satış hızı arasındaki dengeyi yapay zekâ ile kurar.",
    summary:
      "Ürün bazlı fiyat esnekliği, indirim zamanı ve oranı için öneriler, pazardaki fiyat konumunuz.",
    role: "Fiyatı optimize eder",
    features: [
      {
        it: "Elastico",
        tr: "Fiyat Esnekliği",
        description:
          "Her ürünün talebinin fiyat değişimine ne kadar duyarlı olduğunu geçmiş satış verisinden ölçer.",
        icon: "activity",
      },
      {
        it: "Sconto",
        tr: "İndirim Optimizasyonu",
        description:
          "Sezon sonu stoğunu eritirken marjı koruyan indirim zamanını ve oranını önerir.",
        icon: "badge-percent",
      },
      {
        it: "Specchio",
        tr: "Rakip Fiyat Karşılaştırması",
        description:
          "Benzer ürünlerde pazardaki fiyat konumunuzu gösterir; fiyatınızın nerede durduğunu bilerek karar verin.",
        icon: "scan-search",
      },
    ],
    benefits: [
      "İndirimler sezgiyle değil, ölçülmüş talep duyarlılığıyla planlanır.",
      "Gereksiz erken indirimle eriyen marj korunur.",
      "Sezon sonuna kalan stok azalır.",
      "Fiyat kararlarının gerekçesi her zaman görünürdür.",
    ],
    seo: {
      title: "AlloraOne Bilancia · Yapay zekâ destekli fiyatlandırma ve indirim",
      description:
        "AlloraOne Bilancia; ürün bazlı fiyat esnekliği analizi, optimum indirim zamanı ve oranı önerileri ve pazardaki fiyat konumlandırmasını sunar.",
    },
  },
  {
    slug: "lente",
    name: "Lente",
    code: "ALN",
    label: "Raporlama",
    meaning: "Mercek",
    status: "live",
    tagline: "Veriniz zaten var. Lente onu okunur, paylaşılır raporlara dönüştürür.",
    summary:
      "Kendi veritabanınıza bağlanarak satış, stok, mağaza ve ürün verinizi raporlar ve analizlere dönüştürür.",
    role: "Veriyi okur",
    features: [
      {
        it: "Fonte",
        tr: "Veri Bağlantısı",
        description:
          "İşletmenin mevcut veritabanına (ERP, POS, satış sistemleri) bağlanır; veriyi taşımadan, yerinde çalışır. [DOĞRULANACAK: desteklenen veritabanı türleri ve erişim modeli]",
        icon: "cable",
      },
      {
        it: "Rapporto",
        tr: "Hazır Raporlar",
        description: "Satış, stok, mağaza ve ürün performansı için hazır rapor şablonları.",
        icon: "file-text",
      },
      {
        it: "Misura",
        tr: "Özel Raporlar",
        description: "İşletmeye özel metrik ve kırılımlarla kişiselleştirilmiş raporlar.",
        icon: "sliders-horizontal",
      },
      {
        it: "Calendario",
        tr: "Zamanlanmış Raporlar",
        description:
          "Raporların belirlenen sıklıkta ilgili ekiplere otomatik iletilmesi. [DOĞRULANACAK: iletim kanalları ve dışa aktarım formatları]",
        icon: "calendar-clock",
      },
    ],
    benefits: [
      "Mevcut verinizden, ekiplerin kolayca okuyabileceği raporlar üretilir.",
      "Aynı rapor herkese aynı rakamı gösterir; toplantılar veriyi yorumlamakla geçer.",
      "Satış, stok, mağaza ve ürün performansı tek yerden izlenir.",
      "Raporlar hazırlanmayı beklemez; belirlenen sıklıkta ekiplere kendiliğinden ulaşır.",
    ],
    seo: {
      title: "AlloraOne Lente · Veritabanınızdan raporlama ve analiz",
      description:
        "AlloraOne Lente; işletmenizin mevcut veritabanına bağlanarak satış, stok, mağaza ve ürün performansı için hazır ve özel raporlar sunar, raporları zamanlanmış olarak ekiplerinize iletir.",
    },
  },
  {
    slug: "porto",
    name: "Porto",
    code: "APT",
    label: "Depo",
    meaning: "Liman",
    status: "soon",
    tagline: "Deponuzun kendisini yönetecek WMS modülümüz yolda.",
    summary:
      "Mal kabulden sipariş toplamaya, depo operasyonunu uçtan uca yöneten depo yönetim sistemi.",
    role: "Depoyu yönetir",
    features: [
      {
        it: "Arrivo",
        tr: "Mal Kabul",
        description: "Gelen sevkiyatların hızlı, kontrollü ve hatasız kabulü.",
        icon: "package-check",
      },
      {
        it: "Scaffale",
        tr: "Raflama ve Lokasyon Atama",
        description: "Her ürün için en uygun raf lokasyonunun atanması.",
        icon: "layers",
      },
      {
        it: "Vetrina",
        tr: "Raf İçeriği Görüntüleme",
        description: "Hangi rafta ne olduğunu anlık olarak görme.",
        icon: "eye",
      },
      {
        it: "Raccolta",
        tr: "Sipariş Toplama",
        description: "Kısa ve verimli toplama rotalarıyla sipariş hazırlama.",
        icon: "shopping-basket",
      },
      {
        it: "Tempo",
        tr: "Toplayıcı Süre ve Performans Raporları",
        description: "Toplayıcı bazında süre ve verimlilik raporları.",
        icon: "timer",
      },
    ],
    benefits: [],
    seo: {
      title: "AlloraOne Porto · Depo yönetim sistemi (Yakında)",
      description:
        "AlloraOne Porto; mal kabul, raflama, raf içeriği görüntüleme, sipariş toplama ve toplayıcı performans raporlarını kapsayan depo yönetim sistemidir. Geliştirme aşamasında.",
    },
  },
];

/** Flusso sayfasının açılış sahnesi: merkez depodan mağazalara akıllı dağıtım. */
export const flussoHero = {
  title: ["Doğru ürün.", "Doğru mağaza.", "Doğru zaman."],
  subtitle: "Her ürünü, doğru miktarda, talebin olduğu mağazaya ve doğru zamanda ulaştırır.",
  primaryCta: { label: "Bize Ulaşın", href: "/iletisim#form" },
  secondaryCta: { label: "Tüm modüller", href: "/hizmetler" },
  warehouseLabel: "Merkez depo",
  meteoSun: "31°",
  meteoRain: "Yağış",
  legend: {
    standard: "Talebe göre sevkiyat",
    meteo: "Meteo · hava düzeltmesi",
  },
  sceneLabel:
    "Merkez depodan Türkiye genelindeki mağazalara, talebe ve hava durumuna göre farklı miktarlarda ürün dağıtımını gösteren animasyon.",
} as const;

export const porto = {
  badge: "Yakında",
  status: "Geliştirme aşamasında",
  text: "AlloraOne Porto üzerindeki geliştirmelerimiz devam ediyor. Tamamlandığında siz değerli iş ortaklarımızın hizmetine sunacağız.",
  notify: {
    title: "Yayına girdiğinde haber verelim",
    label: "E-posta adresiniz",
    placeholder: "ad.soyad@sirket.com",
    submit: "Haber ver",
    sending: "Kaydediliyor…",
    success: "Teşekkürler. AlloraOne Porto yayına girdiğinde size ilk biz haber vereceğiz.",
    error: "Kaydınızı alamadık. Lütfen birazdan tekrar deneyin.",
    invalidEmail: "Lütfen geçerli bir e-posta adresi yazın.",
    rateLimited: "Kısa sürede çok fazla kayıt yapıldı. Lütfen birkaç dakika sonra tekrar deneyin.",
    privacy: "E-posta adresiniz yalnızca bu bildirim için kullanılır.",
  },
} as const;

export function getModule(slug: string): Module | undefined {
  return modules.find((m) => m.slug === slug);
}
