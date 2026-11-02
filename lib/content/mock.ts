/**
 * Modül sayfalarındaki "örnek ekran" önizlemeleri için uydurma veriler.
 * Hiçbiri gerçek müşteri ya da mağaza verisi değildir.
 */

export const flussoMock = {
  title: "Rotta · Alokasyon önerileri",
  period: "Hafta 42 · Sonbahar–Kış",
  kpis: [
    { label: "Önerilen sevkiyat", value: "12.480", unit: "adet" },
    { label: "Kapsanan mağaza", value: "86", unit: "/ 92" },
    { label: "Meteo düzeltmesi", value: "14", unit: "ürün" },
  ],
  columns: ["Mağaza", "Ürün · Varyant", "Stok", "Öneri", "Meteo"],
  rows: [
    { store: "İstanbul · Kadıköy", item: "Trençkot · M", stock: 4, suggest: 12, meteo: 0.9 },
    { store: "Ankara · Çankaya", item: "Spor ayakkabı · 42", stock: 2, suggest: 9, meteo: 1.0 },
    { store: "Antalya · Lara", item: "Güneş kremi · SPF 50", stock: 6, suggest: 14, meteo: 1.3 },
    { store: "Trabzon · Merkez", item: "Yağmurluk · S", stock: 1, suggest: 11, meteo: 1.4 },
    { store: "İzmir · Alsancak", item: "Trençkot · S", stock: 9, suggest: 0, meteo: 0.7 },
  ],
  transfer: {
    label: "Ponte · transfer önerisi",
    text: "İzmir · Alsancak → Ankara · Çankaya",
    qty: "6 adet Trençkot · S",
  },
  approve: "Önerileri onayla",
};

export const polsoMock = {
  title: "Quadro · Haftalık performans",
  period: "Son 12 hafta",
  kpis: [
    { label: "Sell-through", value: "%64,2", delta: "+3,1 puan", up: true },
    { label: "Stok devir hızı", value: "4,8", delta: "+0,4", up: true },
    { label: "Kapsama", value: "5,2 hf", delta: "−0,6 hf", up: true },
    { label: "Hit rate", value: "%71,9", delta: "+2,4 puan", up: true },
  ],
  trendLabel: "Sell-through (%)",
  trend: [52, 54, 53, 56, 55, 58, 57, 60, 59, 61, 63, 64.2],
  ranking: {
    title: "Classifica · Sell-through",
    rows: [
      { name: "Ankara · Çankaya", value: 78 },
      { name: "İstanbul · Kadıköy", value: 74 },
      { name: "İzmir · Alsancak", value: 69 },
      { name: "Bursa · Nilüfer", value: 66 },
      { name: "Konya · Selçuklu", value: 58 },
    ],
  },
  alerts: {
    title: "Segnale · Erken uyarılar",
    items: [
      { level: "critical" as const, label: "Stok tükeniyor", text: "Trençkot · M · 3 mağazada 2 günden az stok" },
      { level: "warning" as const, label: "Yavaş satış", text: "Keten pantolon · beklenenin %40 altında" },
    ],
  },
  advice: {
    label: "Consiglio",
    text: "Keten pantolonu Antalya ve İzmir mağazalarına transfer edin; vitrinde öne çıkarın.",
  },
};

export const bilanciaMock = {
  title: "Elastico · Talep–fiyat eğrisi",
  product: "Keten gömlek",
  xLabel: "Fiyat (₺)",
  yLabel: "Haftalık talep (adet)",
  curve: [
    { price: 600, demand: 182 },
    { price: 700, demand: 160 },
    { price: 800, demand: 141 },
    { price: 900, demand: 118 },
    { price: 1000, demand: 96 },
    { price: 1100, demand: 77 },
    { price: 1200, demand: 61 },
  ],
  current: { price: 1000, label: "Mevcut" },
  suggested: { price: 900, label: "Önerilen" },
  elasticity: { label: "Esneklik", value: "−1,9" },
  market: { label: "Specchio · pazar konumu", value: "Pazar medyanının %4 üstünde" },
  table: {
    title: "Sconto · İndirim önerileri",
    columns: ["Ürün", "Fiyat", "İndirim", "Zamanlama", "Beklenen satış"],
    rows: [
      { product: "Keten gömlek", price: "₺1.000", discount: "%10", when: "Bu hafta", uplift: "+%24" },
      { product: "Sandalet", price: "₺1.450", discount: "%25", when: "2 hafta sonra", uplift: "+%38" },
      { product: "Trençkot", price: "₺3.200", discount: "—", when: "Bekle", uplift: "—" },
    ],
  },
};

export const lenteMock = {
  title: "Rapporto · Haftalık satış raporu",
  period: "Hafta 42",
  schedule: "Calendario · Pazartesi · 08:30 · e-posta",
  sourcesTitle: "Fonte · Kaynaklar",
  sources: [
    { name: "satis_hareketleri", rows: "2,4 Mn", active: true },
    { name: "stok_durumu", rows: "184 B", active: false },
    { name: "magaza_listesi", rows: "92", active: false },
    { name: "urun_katalogu", rows: "12,6 B", active: false },
  ],
  kpis: [
    { label: "Net satış", value: "₺4,82 Mn", delta: "+%6,1" },
    { label: "Satış adedi", value: "18.640", delta: "+%3,4" },
    { label: "Aktif mağaza", value: "92", delta: "±0" },
  ],
  filters: ["Bölge · Tümü", "Kategori · Tümü", "Son 4 hafta"],
  columns: ["Mağaza", "Kategori", "Satış (₺)", "Adet", "Değişim"],
  rows: [
    { store: "İstanbul · Kadıköy", category: "Giyim", sales: "812.400", qty: "3.120", delta: "+%8,2" },
    { store: "Ankara · Çankaya", category: "Elektronik", sales: "764.900", qty: "1.480", delta: "+%4,7" },
    { store: "İzmir · Alsancak", category: "Kozmetik", sales: "538.200", qty: "4.260", delta: "−%1,3" },
    { store: "Antalya · Lara", category: "Ev & yaşam", sales: "497.600", qty: "2.050", delta: "+%11,5" },
    { store: "Bursa · Nilüfer", category: "Ayakkabı", sales: "421.300", qty: "1.730", delta: "+%2,9" },
  ],
};
