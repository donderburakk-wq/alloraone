import { home } from "@/lib/content/home";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

/**
 * Ana sayfa açılışı: platformun bütününü anlatan, ortalanmış iki tonlu başlık.
 * Modül detayları bilinçli olarak burada yok; hizmet sayfalarında anlatılır.
 */
export function HomeHero() {
  const { hero } = home;
  let wordIndex = 0;

  return (
    <section
      className="relative isolate overflow-hidden"
      style={{ "--hero-text-delay": "0.05s" } as React.CSSProperties}
    >
      <Container className="flex min-h-[88dvh] flex-col items-center justify-center pt-32 pb-20 text-center lg:min-h-dvh">
        <p className="hero-fade eyebrow mb-8">{hero.eyebrow}</p>
        {/* İki tonlu başlık: son satır soluk */}
        <h1 className="font-display text-[clamp(3rem,13vw,4.5rem)] leading-[0.96] font-medium tracking-[-0.045em] sm:text-7xl lg:text-[clamp(5rem,8vw,7.5rem)]">
          {hero.title.map((line, li) => (
            <span key={line} className={li === hero.title.length - 1 ? "block text-faint" : "block"}>
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
          className="hero-fade mx-auto mt-8 max-w-xl text-lg leading-relaxed text-muted sm:text-xl"
          style={{ "--d": "0.3s" } as React.CSSProperties}
        >
          {hero.subtitle}
        </p>
        <div
          className="hero-fade mt-10 flex flex-wrap justify-center gap-3"
          style={{ "--d": "0.4s" } as React.CSSProperties}
        >
          <ButtonLink href={hero.primaryCta.href} size="lg" arrow>
            {hero.primaryCta.label}
          </ButtonLink>
          <ButtonLink href={hero.secondaryCta.href} size="lg" variant="secondary">
            {hero.secondaryCta.label}
          </ButtonLink>
        </div>
        <ul
          aria-label={hero.sectorsLabel}
          className="hero-fade eyebrow mt-16 flex flex-wrap items-center justify-center gap-x-3 gap-y-1"
          style={{ "--d": "0.5s" } as React.CSSProperties}
        >
          {hero.sectors.map((s, i) => (
            <li key={s} className="flex items-center gap-3">
              {i > 0 && <span aria-hidden>·</span>}
              {s}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
