import { kvkk } from "@/lib/content/contact";
import { pageMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/ui/page-header";

export const metadata = pageMetadata({ ...kvkk.seo, path: "/kvkk" });

export default function KvkkPage() {
  return <PageHeader eyebrow="KVKK" title={kvkk.title} lead={kvkk.placeholder} />;
}
