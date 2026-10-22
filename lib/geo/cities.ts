/** Etiketin düğüme göre konumu (pusula yönü). */
export type LabelSide = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";

export type CityDef = {
  id: string;
  name: string;
  lat: number;
  lon: number;
  /** Göreli talep: ilk dalgada alınan paket sayısını belirler. */
  weight: number;
  /** İlk dalga sonunda kapasite halkasının doluluk oranı (0–1). */
  fill: number;
  /** Mobilde gösterilsin mi? */
  mobile: boolean;
  /** Meteo düzeltmesi uygulanan mağaza */
  meteo?: "sun" | "rain";
  /** Meteo rozetinin düğüme göre konumu */
  meteoSide?: LabelSide;
  label: LabelSide;
};

/** Merkez depo: Gebze/Kocaeli çevresi */
export const warehouse = { lat: 40.8, lon: 29.43, label: "e" as LabelSide };

export const cities: CityDef[] = [
  { id: "istanbul", name: "İstanbul", lat: 41.03, lon: 28.85, weight: 1, fill: 0.92, mobile: true, label: "nw" },
  { id: "ankara", name: "Ankara", lat: 39.93, lon: 32.86, weight: 0.82, fill: 0.84, mobile: true, label: "n" },
  { id: "izmir", name: "İzmir", lat: 38.42, lon: 27.14, weight: 0.76, fill: 0.8, mobile: true, label: "w" },
  { id: "bursa", name: "Bursa", lat: 40.19, lon: 29.06, weight: 0.55, fill: 0.66, mobile: false, label: "w" },
  { id: "antalya", name: "Antalya", lat: 36.9, lon: 30.7, weight: 0.7, fill: 0.88, mobile: true, meteo: "sun", meteoSide: "w", label: "s" },
  { id: "adana", name: "Adana", lat: 37.0, lon: 35.32, weight: 0.5, fill: 0.62, mobile: true, label: "s" },
  { id: "konya", name: "Konya", lat: 37.87, lon: 32.48, weight: 0.4, fill: 0.55, mobile: true, label: "s" },
  { id: "gaziantep", name: "Gaziantep", lat: 37.07, lon: 37.38, weight: 0.45, fill: 0.7, mobile: false, label: "s" },
  { id: "kayseri", name: "Kayseri", lat: 38.73, lon: 35.48, weight: 0.35, fill: 0.5, mobile: false, label: "e" },
  { id: "samsun", name: "Samsun", lat: 41.29, lon: 36.33, weight: 0.36, fill: 0.58, mobile: true, label: "n" },
  { id: "trabzon", name: "Trabzon", lat: 41.0, lon: 39.72, weight: 0.42, fill: 0.74, mobile: true, meteo: "rain", meteoSide: "sw", label: "n" },
  { id: "eskisehir", name: "Eskişehir", lat: 39.78, lon: 30.52, weight: 0.3, fill: 0.46, mobile: false, label: "s" },
];
