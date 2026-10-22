export const contact = {
  seo: {
    title: "Bize Ulaşın",
    description:
      "AlloraOne ekibiyle iletişime geçin, mağaza ağınıza özel bir demo talep edin.",
  },

  intro: {
    eyebrow: "Bize Ulaşın",
    title: "Verilerinizle konuşalım.",
    lead: "Formu doldurun; ekibimiz bir iş günü içinde size dönüş yapsın ve mağaza ağınıza uygun bir demo planlayalım.",
  },

  form: {
    title: "İletişim formu",
    requiredNote: "* ile işaretli alanlar zorunludur.",
    errorBanner: "Lütfen işaretli alanları kontrol edin.",
    fields: {
      name: { label: "Ad Soyad", placeholder: "Adınız ve soyadınız" },
      company: { label: "Şirket", placeholder: "Şirket adı" },
      title: { label: "Ünvan", placeholder: "Örn. Planlama Müdürü" },
      email: { label: "E-posta", placeholder: "ad.soyad@sirket.com" },
      phone: { label: "Telefon", placeholder: "05XX XXX XX XX" },
      storeCount: { label: "Mağaza sayısı", placeholder: "Seçiniz" },
      modules: { label: "İlgilendiğiniz modüller" },
      message: {
        label: "Mesaj",
        placeholder: "Kısaca ihtiyacınızdan bahsedin.",
      },
      kvkk: {
        before: "",
        link: "KVKK Aydınlatma Metni",
        after: "'ni okudum, kişisel verilerimin bu kapsamda işlenmesini kabul ediyorum.",
      },
    },
    storeRanges: ["1–10", "11–50", "51–200", "200+"],
    optional: "İsteğe bağlı",
    submit: "Gönder",
    submitting: "Gönderiliyor…",
    success: {
      title: "Mesajınız bize ulaştı.",
      text: "Teşekkür ederiz. Ekibimiz en kısa sürede sizinle iletişime geçecek.",
      again: "Yeni mesaj gönder",
    },
    rateLimited: "Kısa sürede çok fazla gönderim yapıldı. Lütfen birkaç dakika sonra tekrar deneyin.",
    error: "Mesajınız gönderilemedi. Lütfen birazdan tekrar deneyin ya da bize e-posta ile ulaşın.",
    errors: {
      name: "Lütfen adınızı ve soyadınızı yazın.",
      company: "Lütfen şirket adını yazın.",
      email: "Lütfen geçerli bir e-posta adresi yazın.",
      phone: "Lütfen geçerli bir telefon numarası yazın.",
      storeCount: "Lütfen bir mağaza sayısı aralığı seçin.",
      message: "Mesajınız en fazla 2000 karakter olabilir.",
      kvkk: "Devam etmek için KVKK Aydınlatma Metni'ni onaylamanız gerekir.",
    },
  },

  info: {
    title: "İletişim bilgileri",
    email: "E-posta",
    phone: "Telefon",
    address: "Adres",
    whatsapp: "WhatsApp ile yazın",
    whatsappNote: "Hızlı sorularınız için",
    responseTitle: "Ne zaman dönüş yaparız?",
    responseText: "Formu gönderdikten sonra bir iş günü içinde sizinle iletişime geçeriz. Demo, mağaza ağınızın yapısına göre planlanır.",
  },
} as const;

export const kvkk = {
  seo: {
    title: "KVKK Aydınlatma Metni",
    description: "AlloraOne kişisel verilerin korunması aydınlatma metni.",
  },
  title: "KVKK Aydınlatma Metni",
  placeholder:
    "[KVKK_AYDINLATMA_METNI] Bu sayfa, hukuk danışmanınız tarafından hazırlanacak 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamındaki aydınlatma metni için yer tutucudur.",
} as const;
