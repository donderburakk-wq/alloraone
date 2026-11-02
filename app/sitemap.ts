import type { MetadataRoute } from "next";
import { modules } from "@/lib/content/modules";
import { site } from "@/lib/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/hakkimizda", "/hizmetler", "/iletisim", "/kvkk"];
  return [
    ...paths.map((p) => ({
      url: new URL(p, site.url).toString(),
      changeFrequency: "monthly" as const,
      priority: p === "/" ? 1 : p === "/kvkk" ? 0.2 : 0.8,
    })),
    ...modules.map((m) => ({
      url: new URL(`/hizmetler/${m.slug}`, site.url).toString(),
      changeFrequency: "monthly" as const,
      priority: m.status === "live" ? 0.9 : 0.5,
    })),
  ];
}
