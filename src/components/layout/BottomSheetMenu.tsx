"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

type BottomSheetMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  triggerRef?: RefObject<HTMLButtonElement | null>;
};

const MENU_ITEMS = [
  { label: "Serviços", target: "servicos" },
  { label: "Antes & Depois", target: "antes-depois" },
  { label: "Vitrine", target: "vitrine" },
  { label: "Sobre", target: "sobre" },
  { label: "Contato", target: "contato" },
];

export function BottomSheetMenu({
  isOpen,
  onClose,
  triggerRef,
}: BottomSheetMenuProps) {
  const [rendered, setRendered] = useState(false);
  const [shown, setShown] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    if (isOpen) {
      setRendered(true);
      const raf = requestAnimationFrame(() => setShown(true));
      document.body.style.overflow = "hidden";
      return () => {
        cancelAnimationFrame(raf);
        document.body.style.overflow = "";
      };
    } else {
      setShown(false);
      const timer = setTimeout(() => setRendered(false), 320);
      document.body.style.overflow = "";
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || !shown) return;

    const focusRaf = requestAnimationFrame(() => {
      const firstItem = navRef.current?.querySelector<HTMLElement>(
        "button[type='button']",
      );
      firstItem?.focus();
    });

    return () => cancelAnimationFrame(focusRaf);
  }, [isOpen, shown]);

  useEffect(() => {
    if (isOpen) {
      wasOpenRef.current = true;
      return;
    }
    if (wasOpenRef.current) {
      triggerRef?.current?.focus();
      wasOpenRef.current = false;
    }
  }, [isOpen, triggerRef]);

  useEffect(() => {
    if (!isOpen || !dialogRef.current) return;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          "button, a[href]",
        ),
      ).filter((el) => !el.hasAttribute("disabled"));

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (e.shiftKey) {
        if (active === first || !dialogRef.current.contains(active)) {
          e.preventDefault();
          last.focus();
        }
      } else if (active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleTab);
    return () => window.removeEventListener("keydown", handleTab);
  }, [isOpen]);

  if (!rendered) return null;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    onClose();
  };

  return (
    <div
      ref={dialogRef}
      className="fixed inset-0 z-[60]"
      role="dialog"
      aria-modal="true"
    >
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

      <nav
        ref={navRef}
        className="absolute bottom-0 left-0 right-0 max-h-[80vh] overflow-y-auto bg-bg-surface px-6 pb-10 pt-3 shadow-[0_-12px_40px_rgba(0,0,0,0.5)]"
        style={{
          borderRadius: "20px 20px 0 0",
          transform: shown ? "translateY(0)" : "translateY(100%)",
          transition: "transform 320ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div className="mx-auto mb-6 h-1.5 w-12 rounded-full bg-text-muted-3" />

        <div className="mb-4 flex items-center justify-center gap-2">
          <span className="block h-px w-6 bg-accent-gold/40" />
          <span className="block h-1.5 w-1.5 rotate-45 bg-accent-gold" />
          <span className="block h-px w-6 bg-accent-gold/40" />
        </div>

        <h2 className="mb-6 text-center font-display text-3xl text-text-warm">
          Menu
        </h2>

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
