import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";

const PAIRS = Array.from({ length: 4 }, (_, i) => {
  const n = i + 1;
  return {
    beforeSrc: `/antes-depois/par-${n}-antes.png`,
    afterSrc: `/antes-depois/par-${n}-depois.png`,
  };
});

export function BeforeAfterSection() {
  return (
    <section
      id="antes-depois"
      className="scroll-reveal bg-bg-base px-4 py-20"
    >
      <div className="mx-auto max-w-5xl">
        {/* Eyebrow + título display */}
        <div className="mb-12 text-center">
          <p
            className="text-[10px] font-semibold uppercase text-accent-gold md:text-xs"
            style={{ letterSpacing: "0.32em" }}
          >
            Resultados reais
          </p>
          <div className="mt-3 flex items-center justify-center gap-3">
            <span
              className="block h-px w-12"
              style={{
                background:
                  "linear-gradient(to right, transparent, var(--accent-gold) 100%)",
              }}
            />
            <span className="block h-2 w-2 rotate-45 bg-accent-gold" />
            <span
              className="block h-px w-12"
              style={{
                background:
                  "linear-gradient(to left, transparent, var(--accent-gold) 100%)",
              }}
            />
          </div>
          <h2 className="mt-4 font-display text-5xl text-text-warm md:text-6xl">
            Antes &amp; Depois
          </h2>
        </div>

        {/* Desktop: grid 2x2 */}
        <div className="hidden gap-6 md:grid md:grid-cols-2">
          {PAIRS.map((pair, i) => (
            <BeforeAfterSlider
              key={i}
              beforeSrc={pair.beforeSrc}
              afterSrc={pair.afterSrc}
            />
          ))}
        </div>

        {/* Mobile: carrossel horizontal com snap */}
        <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 snap-x snap-mandatory md:hidden">
          {PAIRS.map((pair, i) => (
            <div key={i} className="w-[85vw] shrink-0 snap-center">
              <BeforeAfterSlider
                beforeSrc={pair.beforeSrc}
                afterSrc={pair.afterSrc}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
