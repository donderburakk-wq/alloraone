import { notFound } from "next/navigation";
import { getModule, modules } from "@/lib/content/modules";
import { services } from "@/lib/content/services";
import { pageMetadata } from "@/lib/metadata";
import { ModuleHero } from "@/components/sections/module-hero";
import { DistributionHero } from "@/components/sections/distribution-hero";
import { Divider } from "@/components/ui/divider";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { DashboardPreview } from "@/components/sections/dashboard-mock";
import { ModuleBenefits, OtherModules } from "@/components/sections/module-benefits";
import { PortoLockedFeatures, PortoStatus } from "@/components/sections/porto-sections";
import { CtaBand } from "@/components/sections/cta-band";

// Dört modül sayfası da derlemede statik üretilir. Sayfa içeriği URL'deki
// modüle bağlı olduğundan, gezinme bu statik çıktıyı kısa süre bekleyebilir.
export const instant = false;

export function generateStaticParams() {
  return modules.map((m) => ({ modul: m.slug }));
}

export async function generateMetadata({ params }: PageProps<"/hizmetler/[modul]">) {
  const { modul } = await params;
  const m = getModule(modul);
  if (!m) return {};
  return pageMetadata({
    title: m.seo.title,
    description: m.seo.description,
    path: `/hizmetler/${m.slug}`,
    absoluteTitle: true,
  });
}

export default async function ModulePage({ params }: PageProps<"/hizmetler/[modul]">) {
  const { modul } = await params;
  const m = getModule(modul);
  if (!m) notFound();

  if (m.status === "soon") {
    return (
      <>
        <ModuleHero module={m}>
          <PortoStatus />
        </ModuleHero>
        <PortoLockedFeatures module={m} />
        <OtherModules current={m} />
      </>
    );
  }

  return (
    <>
      {/* Flusso, alokasyonu anlatan dağıtım sahnesiyle açılır; diğerleri standart hero ile. */}
      {m.slug === "flusso" ? (
        <>
          <DistributionHero module={m} />
          <Divider />
        </>
      ) : (
        <ModuleHero module={m} />
      )}
      <FeatureGrid module={m} />
      <DashboardPreview module={m} />
      <ModuleBenefits module={m} />
      <CtaBand title={services.modulePage.ctaTitle} text={services.modulePage.ctaText} />
      <OtherModules current={m} />
    </>
  );
}
