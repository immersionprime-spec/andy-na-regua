"use client";

import { useEffect, useRef, useState } from "react";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";

const PAIRS = Array.from({ length: 4 }, (_, i) => {
  const n = i + 1;
  return {
    beforeSrc: `/antes-depois/par-${n}-antes.png`,
    afterSrc: `/antes-depois/par-${n}-depois.png`,
  };
});

export function BeforeAfterSection() {
  // Estado do carrossel mobile: índice do par atualmente centralizado.
  const carouselRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Rastreia qual slide está centralizado via IntersectionObserver no container scrollável.
  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pega o slide com maior intersectionRatio dentro do viewport do container.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const idx = slideRefs.current.findIndex((el) => el === visible.target);
        if (idx >= 0) setActiveIndex(idx);
      },
      {
        root: container,
        threshold: [0.5, 0.75, 1],
      },
    );

    slideRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToIndex = (idx: number) => {
    const clamped = Math.max(0, Math.min(PAIRS.length - 1, idx));
    const target = slideRefs.current[clamped];
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  };

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
        <div
          ref={carouselRef}
          className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 snap-x snap-mandatory md:hidden"
        >
          {PAIRS.map((pair, i) => (
            <div
              key={i}
              ref={(el) => {
                slideRefs.current[i] = el;
              }}
              className="w-[85vw] shrink-0 snap-center"
            >
              <BeforeAfterSlider
                beforeSrc={pair.beforeSrc}
                afterSrc={pair.afterSrc}
              />
            </div>
          ))}
        </div>

        {/* Controles do carrossel (só mobile) — seta vermelha, dots, seta azul */}
        <div className="mt-6 flex flex-col items-center gap-3 md:hidden">
          <p className="sr-only" aria-live="polite">
            Par {activeIndex + 1} de {PAIRS.length}
          </p>
          <div className="flex items-center justify-center gap-5">
          {/* Seta voltar — vermelha (espelha barber pole) */}
          <button
            type="button"
            onClick={() => scrollToIndex(activeIndex - 1)}
            disabled={activeIndex === 0}
            aria-label="Par anterior"
            className="flex items-center justify-center rounded-full bg-action-primary text-text-primary shadow-lg transition-all hover:bg-action-primary-hover disabled:cursor-not-allowed disabled:opacity-30"
            style={{
              minHeight: "var(--touch-min)",
              minWidth: "var(--touch-min)",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Dots de posição */}
          <div className="flex items-center gap-2">
            {PAIRS.map((_, i) => {
              const isActive = i === activeIndex;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => scrollToIndex(i)}
                  aria-label={`Ir para par ${i + 1}`}
                  aria-current={isActive ? "true" : undefined}
                  className="block h-1.5 rounded-full transition-all"
                  style={{
                    width: isActive ? "24px" : "8px",
                    backgroundColor: isActive
                      ? "var(--accent-gold)"
                      : "var(--text-muted-3)",
                    opacity: isActive ? 1 : 0.6,
                  }}
                />
              );
            })}
          </div>

          {/* Seta avançar — azul (espelha barber pole) */}
          <button
            type="button"
            onClick={() => scrollToIndex(activeIndex + 1)}
            disabled={activeIndex === PAIRS.length - 1}
            aria-label="Próximo par"
            className="flex items-center justify-center rounded-full bg-action-selection text-text-primary shadow-lg transition-all hover:bg-action-selection-light disabled:cursor-not-allowed disabled:opacity-30"
            style={{
              minHeight: "var(--touch-min)",
              minWidth: "var(--touch-min)",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
          </div>
        </div>
      </div>
    </section>
  );
}
