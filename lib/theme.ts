/** Tema tercihinin localStorage anahtarı. Hem sunucu (layout betiği) hem istemci kullanır. */
export const THEME_KEY = "allora-theme";

export type Theme = "dark" | "light";

/**
 * CSS değişkenlerini okuyamayan bağlamlar için token kopyaları: <meta
 * name="theme-color"> ve OG görseli (ImageResponse). Kaynak app/globals.css;
 * oradaki değerler değişirse burası da güncellenmelidir.
 */
export const staticTokens = {
  dark: { bg: "#0a0a09", fg: "#ecebe7", faint: "#8c887f", line: "#2a2925", accent: "#e07f42" },
  light: { bg: "#f7f6f2" },
} as const;
