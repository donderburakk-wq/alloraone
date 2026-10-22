export const about = {
  seo: {
    title: "Hakkımızda",
    description:
      "AlloraOne, 2023'te hazır giyim perakendesinde yaşadığımız alokasyon problemine çözüm olarak endüstri mühendisleri tarafından geliştirilen karar destek platformudur.",
  },

  intro: {
    eyebrow: "Hakkımızda",
    title: "Sahada yaşadık, sahaya çözüm ürettik.",
    lead: "AlloraOne, hazır giyim perakendesinde her gün karşılaştığımız tek bir sorunun cevabı olarak doğdu: doğru ürün, doğru mağazaya, doğru miktarda nasıl ulaşır?",
  },

  story: {
    eyebrow: "Hikâyemiz",
    title: "Her şey 2023'te, bir problemle başladı.",
    paragraphs: [
      "Hikâyemiz 2023'te, hazır giyim perakendesinin tam içinde başladı. Sezonları planlayan, sevkiyatları takip eden ve mağaza raflarının nabzını tutan bir ekip olarak her hafta aynı tabloyla karşılaştık: bir mağazada raflar dolup taşarken, birkaç kilometre ötedeki mağazada aynı ürün çoktan tükenmişti.",
      "Bu tablonun arkasında tek bir kritik karar vardı: alokasyon. Hangi ürünün, hangi mağazaya, hangi bedende ve ne miktarda gönderileceği; satışı, stok maliyetini ve sezon sonu indirimlerini doğrudan belirliyordu. Tecrübemizdeki en büyük problem buydu.",
      "AlloraOne, bu probleme kalıcı bir çözüm üretmek için endüstri mühendisleri tarafından geliştirildi. Sahada edindiğimiz tecrübeyi veri ve yöntemle birleştirerek alokasyon kararını sezginin ve el yordamının dışına taşıdık; ölçülebilir, tekrarlanabilir ve gerekçesi her zaman görünür hale getirdik.",
    ],
  },

  /** Alokasyonun sektörler arası önemi */
  problem: {
    eyebrow: "Alokasyon neden kritik?",
    question: "Hangi ürün, hangi mağazaya, hangi bedende ve ne kadar?",
    lead: "Bu soru yalnızca hazır giyime özgü değil. Perakende, hızlı tüketim (FMCG) ve hazır giyimde satışı, stok maliyetini ve müşteri memnuniyetini aynı anda belirleyen kritik faktör, doğru alokasyondur.",
    sectors: [
      {
        name: "Hazır giyim",
        icon: "layers",
        text: "Kısa sezonlar, geniş beden kırılımı ve hızla değişen talep. Yanlış mağazaya giden her ürün, ya kayıp satış ya da erken indirim demek.",
      },
      {
        name: "Perakende",
        icon: "map-pin",
        text: "Farklı kapasitelere ve müşteri profillerine sahip onlarca mağaza. Stoğun nerede durduğu, ne kadar satıldığı kadar önemli.",
      },
      {
        name: "FMCG",
        icon: "shopping-basket",
        text: "Yüksek devir hızı ve dar raf alanı. Doğru ürünün doğru noktada olmaması, doğrudan boş raf ve kaçan satış demek.",
      },
    ],
    closing: "AlloraOne, bu üç sektörün ortak problemine sahadan gelen bir cevap olarak tasarlandı.",
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
        text: "Mağaza kapasitesinden beden oranlarına, sahadaki gerçek kısıtları modelin içine alırız.",
        icon: "map-pin",
      },
      {
        title: "Sürekli gelişim",
        text: "Gerçekleşen her sonuç modele geri döner. AlloraOne, kullanıldıkça daha isabetli hale gelir.",
        icon: "refresh-cw",
      },
    ],
  },

  team: {
    eyebrow: "Ekip",
    title: "AlloraOne'ın arkasındaki ekip",
    lead: "Endüstri mühendisliği, veri bilimi ve perakende operasyonu deneyimini bir araya getiren bir ekip.",
    members: [
      { name: "[EKİP_ÜYESİ_ADI]", title: "[ÜNVAN]" },
      { name: "[EKİP_ÜYESİ_ADI]", title: "[ÜNVAN]" },
      { name: "[EKİP_ÜYESİ_ADI]", title: "[ÜNVAN]" },
      { name: "[EKİP_ÜYESİ_ADI]", title: "[ÜNVAN]" },
    ],
  },
} as const;
