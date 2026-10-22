/**
 * Türkçe olmayan terimler ve dilleri. Sayfa lang="tr" olduğundan büyük harf
 * dönüşümü i → İ yapar; bu terimler kendi dil etiketleriyle sarılınca
 * "CLASSIFICA", "HIT RATE" gibi doğru büyür (bkz. components/ui/lang-text.tsx).
 */
export const foreignTerms: Record<string, "it" | "en"> = {
  // Modül alt özellikleri (İtalyanca)
  Scorta: "it",
  Rotta: "it",
  Meteo: "it",
  Ponte: "it",
  Quadro: "it",
  Classifica: "it",
  Segnale: "it",
  Consiglio: "it",
  Elastico: "it",
  Sconto: "it",
  Specchio: "it",
  Arrivo: "it",
  Scaffale: "it",
  Vetrina: "it",
  Raccolta: "it",
  Tempo: "it",
  // Perakende metrikleri (İngilizce)
  "Sell-through": "en",
  "Sell-through (%)": "en",
  "Hit rate": "en",
  "Hit Rate": "en",
  Coverage: "en",
};
