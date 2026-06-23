"use client";

import { useEffect } from "react";

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
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60]">
      <button
        type="button"
        className="absolute inset-0 bg-bg-base/60"
        onClick={onClose}
        aria-label="Fechar menu"
      />

      <nav
        className="absolute bottom-0 left-0 right-0 max-h-[70vh] translate-y-0 bg-bg-surface px-6 pb-8 pt-4 transition-transform duration-300 ease-out"
        style={{ borderRadius: "20px 20px 0 0" }}
      >
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-text-muted-3" />
        <ul className="flex flex-col gap-1">
          {MENU_ITEMS.map((item) => (
            <li key={item.target}>
              <button
                type="button"
                onClick={() => scrollToSection(item.target)}
                className="w-full py-4 text-left text-lg font-medium text-text-primary hover:text-text-warm"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
