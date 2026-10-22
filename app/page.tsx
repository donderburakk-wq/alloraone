import { home } from "@/lib/content/home";
import { pageMetadata } from "@/lib/metadata";
import { HomeHero } from "@/components/sections/home-hero";
import { ProblemSolution } from "@/components/sections/problem-solution";
import { ModulesGrid } from "@/components/sections/modules-grid";
import { HowItWorks } from "@/components/sections/how-it-works";
import { CtaBand } from "@/components/sections/cta-band";
import { Divider } from "@/components/ui/divider";

export const metadata = pageMetadata({
  title: home.seo.title,
  description: home.seo.description,
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <Divider />
      <ProblemSolution />
      <Divider />
      <ModulesGrid />
      <Divider />
      <HowItWorks />
      <CtaBand />
    </>
  );
}
