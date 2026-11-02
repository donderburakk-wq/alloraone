export const about = {
  seo: {
    title: "Hakkımızda",
    description:
      "AlloraOne, 2023'te e-ticaretle başlayan yolculuğumuzda sektörün problemlerine çözüm üretme amacıyla endüstri mühendisleri tarafından geliştirilen karar destek platformudur.",
  },

  intro: {
    eyebrow: "Hakkımızda",
    title: "Sahada yaşadık, sahaya çözüm ürettik.",
    lead: "AlloraOne, sektörün içinde her gün karşılaştığımız tek bir sorunun cevabı olarak doğdu: doğru ürün, doğru mağazaya, doğru miktarda nasıl ulaşır?",
  },

  story: {
    eyebrow: "Hikâyemiz",
    title: "Her şey 2023'te, bir problemle başladı.",
    paragraphs: [
      "Hikâyemiz 2023'te, e-ticaret üzerinden başladı. Gün geçtikçe sektörün içindeki problemleri daha yakından anladık ve her birine bir çözüm yolu üretmek için yola çıktık. Bir yerde raflar dolup taşarken, başka bir noktada aynı ürün çoktan tükenmişti.",
      "Bu tablonun arkasında tek bir kritik karar vardı: alokasyon. Hangi ürünün, nereye ve ne miktarda gönderileceği; satışı, stok maliyetini ve sezon sonu indirimlerini doğrudan belirliyordu. Bu yüzden işe alokasyonla başladık.",
      "AlloraOne, bu probleme kalıcı bir çözüm üretmek için endüstri mühendisleri tarafından geliştirildi. Sahada edindiğimiz tecrübeyi veri ve yöntemle birleştirerek alokasyon kararını sezginin ve el yordamının dışına taşıdık; ölçülebilir, tekrarlanabilir ve gerekçesi her zaman görünür hale getirdik.",
      "Alokasyonla başlayan yolculuğumuz bugün bir bütüne dönüştü. Flusso dağıtımı, Polso nabzı, Bilancia dengeyi, Lente de görmeyi üstleniyor. Tıpkı bir vücudun organları gibi, tek bir sistemde birbirini besleyerek çalışıyor.",
    ],
    closing: "Tek bir karardan, bütün vücut gibi çalışan bir sisteme.",
  },

  /** /vizyon-misyon sayfasından taşındı; bölüm id'si: vizyon-misyon */
  vision: {
    eyebrow: "Vizyon & Misyon",
    title: "Her kararın arkasında veri.",
    vision: {
      index: "01",
      label: "Vizyon",
      text: "Türkiye'den başlayarak perakende sektörünün her stok, fiyat ve operasyon kararını veriyle veren lider karar destek platformu olmak.",
    },
    mission: {
      index: "02",
      label: "Misyon",
      text: "Perakendecilerin elindeki veriyi anlaşılır, uygulanabilir önerilere dönüştürerek stok israfını azaltmak, satışları artırmak ve ekiplerin zamanını değer yaratan işlere ayırmasını sağlamak.",
    },
    goals: {
      eyebrow: "Stratejik hedefler",
      title: "Bu yolda üç ilkeye bağlıyız.",
      items: [
        {
          title: "Sahada doğrulanmış modeller",
          text: "Her modeli gerçek mağaza verisiyle test eder, yalnızca ölçülebilir fark yaratanları ürüne alırız.",
          icon: "shield-check",
        },
        {
          title: "Modüler büyüme",
          text: "Tek modülle başlayın; ihtiyacınız büyüdükçe diğerlerini aynı veri altyapısı üzerine ekleyin.",
          icon: "puzzle",
        },
        {
          title: "Ölçülebilir etki",
          text: "Başarıyı hit rate, kapsama ve satış oranı gibi somut metriklerle, sizinle birlikte ölçeriz.",
          icon: "target",
        },
      ],
    },
  },

  /** İsmin anlamı: platform adı ve modüller (modül anlamları modules.ts'den gelir) */
  names: {
    eyebrow: "İsmin anlamı",
    title: "Adlarımızın arkasında ne var?",
    lead: "Modüllerimizin adları İtalyancadan gelir. Her biri, işi yaptığı yeri tek kelimeyle anlatır.",
    platform: {
      name: "AlloraOne",
      text: "[DOĞRULANACAK: AlloraOne adının kökeni ve anlamı]",
    },
    /** "Lente: mercek." kısmı modules.ts'deki ad ve anlamdan üretilir; buradaki cümle devamıdır. */
    moduleTexts: {
      flusso: "Stoğun depodan mağazaya doğru ve zamanında akışı.",
      polso: "İşletmenizin performansını canlı tutan ölçüm.",
      bilancia: "Fiyat ile satış hızı arasındaki denge.",
      lente: "Verinize yakından bakmanın aracı.",
      porto: "Ürünün yola çıktığı ve geri döndüğü yer: depo.",
    },
  },

  values: {
    eyebrow: "Değerlerimiz",
    title: "Nasıl çalışıyoruz?",
    items: [
      {
        title: "Veriye dayalılık",
        text: "Her öneri, ölçülmüş veriye ve test edilmiş modellere dayanır. Varsayımlar değil, sonuçlar konuşur.",
        icon: "line-chart",
      },
      {
        title: "Şeffaflık",
        text: "Önerilerin gerekçesi her zaman görünürdür. Ekibiniz neden o kararın önerildiğini bilir.",
        icon: "eye",
      },
      {
        title: "Sahaya yakınlık",
        text: "Mağaza kapasitesinden mağazaya özgü talep profillerine, sahadaki gerçek kısıtları modelin içine alırız.",
        icon: "map-pin",
      },
      {
        title: "Sürekli gelişim",
        text: "Gerçekleşen her sonuç modele geri döner. AlloraOne, kullanıldıkça daha isabetli hale gelir.",
        icon: "refresh-cw",
      },
    ],
  },
} as const;
