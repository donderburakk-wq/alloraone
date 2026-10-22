import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { home } from "@/lib/content/home";
import { modules } from "@/lib/content/modules";
import { site } from "@/lib/content/site";
import { staticTokens } from "@/lib/theme";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Yazı tipleri depoda durur (assets/fonts, OFL); derleme ağa bağımlı olmaz.
const [sans, mono] = await Promise.all([
  readFile(join(process.cwd(), "assets/fonts/GoogleSans-Medium.ttf")),
  readFile(join(process.cwd(), "assets/fonts/GoogleSansCode-Regular.ttf")),
]);

// ImageResponse CSS değişkenlerini okuyamaz; koyu tema token kopyaları lib/theme.ts'te.
const t = staticTokens.dark;

export default function OpengraphImage() {
  const lines = home.hero.title;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: t.bg,
          color: t.fg,
          fontFamily: "Google Sans",
          borderLeft: `1px solid ${t.line}`,
          borderRight: `1px solid ${t.line}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", fontSize: 40, letterSpacing: -1.6 }}>
          AlloraOne
          <span style={{ color: t.accent }}>.</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {lines.map((line, i) => (
            <div
              key={line}
              style={{ fontSize: 88, lineHeight: 1, letterSpacing: -3.5, color: i === lines.length - 1 ? t.faint : t.fg }}
            >
              {line}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 28, fontFamily: "Google Sans Code", fontSize: 18, letterSpacing: 2.8, color: t.faint }}>
          {modules.map((m) => (
            <div key={m.slug} style={{ display: "flex", gap: 10 }}>
              <span style={{ color: t.fg }}>{m.code}</span>
              <span>·</span>
              <span>{m.label.toLocaleUpperCase("tr")}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Google Sans", data: sans, style: "normal", weight: 500 },
        { name: "Google Sans Code", data: mono, style: "normal", weight: 400 },
      ],
    },
  );
}
