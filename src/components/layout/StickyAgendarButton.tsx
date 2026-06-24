"use client";

const AGENDAR_URL = process.env.NEXT_PUBLIC_AGENDAR_URL ?? "#";

function handleAgendarClick() {
  if ("vibrate" in navigator) navigator.vibrate(15);
}

/**
 * Pill flutuante de "Agendar" no canto inferior direito (mobile).
 * Substitui a versão full-width antiga, dividindo o espaço com o WhatsAppFAB à esquerda.
 * Anima com pulso sutil (3.5s) que respeita prefers-reduced-motion via CSS.
 */
export function StickyAgendarButton() {
  return (
    <a
      href={AGENDAR_URL}
      onClick={handleAgendarClick}
      className="sticky-agendar-pill fixed bottom-4 right-4 z-50 inline-flex items-center justify-center gap-2 bg-action-primary px-6 text-sm font-bold uppercase text-text-primary shadow-[0_8px_28px_rgba(204,31,31,0.45)] transition-colors hover:bg-action-primary-hover md:hidden"
      style={{
        borderRadius: "var(--radius-pill)",
        minHeight: "var(--touch-min)",
        letterSpacing: "0.12em",
      }}
    >
      Agendar
      <span aria-hidden="true">→</span>
    </a>
  );
}
