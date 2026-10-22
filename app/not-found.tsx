import { PageHeader } from "@/components/ui/page-header";
import { ButtonLink } from "@/components/ui/button";
import { ui } from "@/lib/content/nav";

export default function NotFound() {
  return (
    <PageHeader eyebrow="404" title="Aradığınız sayfa bulunamadı." lead="Adres değişmiş ya da sayfa kaldırılmış olabilir.">
      <ButtonLink href="/" className="mt-10" arrow>
        {ui.backHome}
      </ButtonLink>
    </PageHeader>
  );
}
