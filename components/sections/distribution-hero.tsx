import { flussoHero, type Module } from "@/lib/content/modules";
import { getTurkeyScene } from "@/lib/geo/turkey-scene";
import { DistributionScene, type SceneLabels } from "@/components/animations/distribution-scene";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ModuleCode } from "@/components/ui/module-mark";

/**
 * Flusso sayfasının açılış sahnesi: merkez depodan mağazalara akıllı dağıtım.
 * Harita geometrisi burada, sunucuda hesaplanır; istemciye yalnızca hazır yol
 * ve koordinatlar gider. Metin, ilk dağıtım dalgası bitince belirir (.hero).
 */
export function DistributionHero({ module: m }: { module: Module }) {
  const hero = flussoHero;
  const scene = getTurkeyScene();
  const labels: SceneLabels = {
    warehouse: hero.warehouseLabel,
    meteoSun: hero.meteoSun,
    meteoRain: hero.meteoRain,
  };

  let wordIndex = 0;

  return (
    <section className="hero relative isolate overflow-hidden">
      <Container className="grid min-h-dvh items-center gap-6 pt-24 pb-14 lg:grid-cols-12 lg:gap-8 lg:pt-28 lg:pb-16">
        <div className="relative z-10 order-2 lg:order-1 lg:col-span-5">
          <p className="hero-fade mb-6 flex flex-wrap items-center gap-x-3 gap-y-1 lg:mb-8" style={{ "--d": "-0.35s" } as React.CSSProperties}>
            <span className="eyebrow text-fg!">AlloraOne {m.name}</span>
            <span aria-hidden className="eyebrow">/</span>
            <ModuleCode module={m} />
          </p>
          {/* İki tonlu başlık: son satır soluk */}
          <h1 className="font-display text-[clamp(2.5rem,11.5vw,3.5rem)] leading-[0.98] font-medium tracking-[-0.04em] sm:text-6xl lg:text-[clamp(3.4rem,4.7vw,4.75rem)]">
            {hero.title.map((line, li) => (
              <span
                key={line}
                className={li === hero.title.length - 1 ? "block whitespace-nowrap text-faint" : "block whitespace-nowrap"}
              >
                {line.split(" ").map((word) => (
                  <span key={word}>
                    <span className="hero-word inline-block" style={{ "--i": wordIndex++ } as React.CSSProperties}>
                      {word}
                    </span>{" "}
                  </span>
                ))}
              </span>
            ))}
          </h1>
          <p
            className="hero-fade mt-6 max-w-md text-lg leading-relaxed text-muted lg:mt-8"
            style={{ "--d": "0.55s" } as React.CSSProperties}
          >
            {hero.subtitle}
          </p>
          <div className="hero-fade mt-8 flex flex-wrap gap-3 lg:mt-10" style={{ "--d": "0.75s" } as React.CSSProperties}>
            <ButtonLink href={hero.primaryCta.href} size="lg" arrow>
              {hero.primaryCta.label}
            </ButtonLink>
            <ButtonLink href={hero.secondaryCta.href} size="lg" variant="secondary">
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>
        </div>

        <figure className="relative order-1 m-0 lg:order-2 lg:col-span-7 lg:-mr-4 xl:-mr-10">
          <figcaption className="sr-only">{hero.sceneLabel}</figcaption>
          <DistributionScene
            layout={scene.desktop}
            variant="desktop"
            labels={{ ...labels, legend: hero.legend }}
            className="hidden text-line-strong lg:block"
          />
          <DistributionScene
            layout={scene.mobile}
            variant="mobile"
            labels={labels}
            className="-mx-4 text-line-strong sm:-mx-6 lg:hidden"
          />
        </figure>
      </Container>
    </section>
  );
}
