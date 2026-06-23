import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";

const PAIRS = Array.from({ length: 8 }, (_, i) => {
  const n = i + 1;
  return {
    beforeSrc: `/antes-depois/par-${n}-antes.jpg`,
    afterSrc: `/antes-depois/par-${n}-depois.jpg`,
  };
});

export function BeforeAfterSection() {
  return (
    <section
      id="antes-depois"
      className="scroll-reveal bg-bg-base px-4 py-16"
    >
      <div className="mx-auto max-w-6xl">
        {/* TODO copy */}
        <h2 className="mb-8 text-2xl font-bold text-text-primary">
          Antes & Depois
        </h2>

        <div className="hidden gap-4 md:grid md:grid-cols-2">
          {PAIRS.map((pair, i) => (
            <BeforeAfterSlider
              key={i}
              beforeSrc={pair.beforeSrc}
              afterSrc={pair.afterSrc}
            />
          ))}
        </div>

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
