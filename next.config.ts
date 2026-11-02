import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

/**
 * İçerik güvenlik politikası. Site statik üretildiği için nonce yerine
 * Next.js'in "nonce'suz" önerisi kullanılır: dış kaynaklardan betik, stil,
 * çerçeve ve form hedefi engellenir; yalnızca kendi alan adımız serbesttir.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Kullanılan çatıyı ifşa eden X-Powered-By başlığını gönderme.
  poweredByHeader: false,
  async redirects() {
    // Vizyon & Misyon artık Hakkımızda sayfasının bir bölümü (308).
    return [{ source: "/vizyon-misyon", destination: "/hakkimizda#vizyon-misyon", permanent: true }];
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
