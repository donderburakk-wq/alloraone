import type { Metadata, Viewport } from "next";
import { Google_Sans, Google_Sans_Code } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { MotionProvider } from "@/components/animations/motion-provider";
import { THEME_KEY, staticTokens } from "@/lib/theme";
import { site } from "@/lib/content/site";
import { ui } from "@/lib/content/nav";
import "./globals.css";

// İki aile de OFL lisanslı ve latin-ext ile yüklenir: ğ ş ı İ (Latin
// Extended-A), ç ö ü (Latin-1) eksiksiz desteklenir.
// next/font bu aileler için yedek font metriklerini bilmiyor; yedekler açıkça verilir.
const sans = Google_Sans({
  variable: "--font-google-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  adjustFontFallback: false,
  fallback: ["Segoe UI", "system-ui", "sans-serif"],
});

const mono = Google_Sans_Code({
  variable: "--font-google-sans-code",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  preload: false,
  adjustFontFallback: false,
  fallback: ["Consolas", "ui-monospace", "monospace"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s · ${site.name}` },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    title: site.title,
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: staticTokens.dark.bg },
    { media: "(prefers-color-scheme: light)", color: staticTokens.light.bg },
  ],
};

const themeScript = `(function(){try{var t=localStorage.getItem("${THEME_KEY}");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="tr"
      data-theme="dark"
      suppressHydrationWarning
      className={`${sans.variable} ${mono.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="relative flex min-h-dvh flex-col">
        <a
          href="#icerik"
          className="fixed top-3 left-3 z-[60] -translate-y-20 rounded-full bg-fg px-4 py-2 text-sm text-bg transition-transform focus:translate-y-0"
        >
          {ui.skipToContent}
        </a>
        {/* Sayfa çerçevesi: içerik sütununu sınırlayan ince dikey çizgiler */}
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0 hidden md:block">
          <div className="mx-auto h-full max-w-[120rem] border-x border-line-soft" />
        </div>
        <MotionProvider>
          <SmoothScroll />
          <Header />
          <main id="icerik" className="relative z-[1] flex-1">
            {children}
          </main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
