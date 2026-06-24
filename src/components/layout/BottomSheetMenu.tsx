"use client";

import { useEffect, useState } from "react";

type BottomSheetMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

const MENU_ITEMS = [
  { label: "Serviços", target: "servicos" },
  { label: "Antes & Depois", target: "antes-depois" },
  { label: "Vitrine", target: "vitrine" },
  { label: "Sobre", target: "sobre" },
  { label: "Contato", target: "contato" },
];

export function BottomSheetMenu({ isOpen, onClose }: BottomSheetMenuProps) {
  // Estado interno pra coordenar montagem + animação de entrada/saída.
  // - rendered: controla se o DOM está montado (transitions precisam disso)
  // - shown: controla as classes de animação (precisa de um tick após mount pra disparar)
  const [rendered, setRendered] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setRendered(true);
      // Próximo frame: dispara a transição (de translate-y-full → translate-y-0)
      const raf = requestAnimationFrame(() => setShown(true));
      document.body.style.overflow = "hidden";
      return () => {
        cancelAnimationFrame(raf);
        document.body.style.overflow = "";
      };
    } else {
      setShown(false);
      // Espera animação de saída terminar (320ms) antes de desmontar
      const timer = setTimeout(() => setRendered(false), 320);
      document.body.style.overflow = "";
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Fechar com Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  if (!rendered) return null;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true">
      {/* Backdrop com fade */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Fechar menu"
        className="absolute inset-0 transition-opacity duration-300 ease-out"
        style={{
          background: "rgba(10, 10, 10, 0.7)",
          backdropFilter: "blur(2px)",
          opacity: shown ? 1 : 0,
        }}
      />

      {/* Sheet com slide-up */}
      <nav
        className="absolute bottom-0 left-0 right-0 max-h-[80vh] overflow-y-auto bg-bg-surface px-6 pb-10 pt-3 shadow-[0_-12px_40px_rgba(0,0,0,0.5)]"
        style={{
          borderRadius: "20px 20px 0 0",
          transform: shown ? "translateY(0)" : "translateY(100%)",
          transition: "transform 320ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Indicador de arraste */}
        <div className="mx-auto mb-6 h-1.5 w-12 rounded-full bg-text-muted-3" />

        {/* Eyebrow decorativo */}
        <div className="mb-4 flex items-center justify-center gap-2">
          <span className="block h-px w-6 bg-accent-gold/40" />
          <span className="block h-1.5 w-1.5 rotate-45 bg-accent-gold" />
          <span className="block h-px w-6 bg-accent-gold/40" />
        </div>

        <h2
          className="mb-6 text-center font-display text-3xl text-text-warm"
        >
          Menu
        </h2>

        {/* Itens de menu — divisores sutis entre eles */}
        <ul className="flex flex-col">
          {MENU_ITEMS.map((item, idx) => (
            <li
              key={item.target}
              className={idx > 0 ? "border-t border-text-muted-4/30" : ""}
            >
              <button
                type="button"
                onClick={() => scrollToSection(item.target)}
                className="group flex w-full items-center justify-between text-left text-base font-medium text-text-primary transition-colors hover:text-accent-gold"
                style={{ minHeight: "var(--touch-min)" }}
              >
                <span>{item.label}</span>
                <span
                  aria-hidden="true"
                  className="text-text-muted-3 transition-transform group-hover:translate-x-1 group-hover:text-accent-gold"
                >
                  →
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
