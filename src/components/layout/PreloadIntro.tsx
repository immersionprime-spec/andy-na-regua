"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "andy-na-regua-preload-shown";
const DURATION_MS = 3000;
const FADE_OUT_MS = 500;
const LOGO_FADE_IN_MS = 700;

export function PreloadIntro() {
  // SSR-visible por padrão: evita flash do Hero antes do React montar na 1ª visita.
  // O script blocking em layout.tsx esconde imediatamente em visitas de retorno.
  const [visible, setVisible] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);
  const [logoIn, setLogoIn] = useState(false);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem(STORAGE_KEY);
    if (alreadyShown) {
      setVisible(false);
      return;
    }

    // Trigger do fade-in do logo no próximo frame (garante transição CSS).
    const logoInRaf = requestAnimationFrame(() => setLogoIn(true));
    const fadeTimer = setTimeout(() => setFadingOut(true), DURATION_MS - FADE_OUT_MS);
    const removeTimer = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem(STORAGE_KEY, "1");
    }, DURATION_MS);

    return () => {
      cancelAnimationFrame(logoInRaf);
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      data-preload-intro=""
      className="fixed inset-0 z-[100] flex items-center justify-center bg-bg-base"
      style={{
        opacity: fadingOut ? 0 : 1,
        transition: `opacity ${FADE_OUT_MS}ms ease-out`,
      }}
      aria-hidden="true"
    >
      <img
        src="/logo.png"
        alt=""
        fetchPriority="high"
        decoding="async"
        className="w-[min(70vw,420px)] max-w-full object-contain"
        style={{
          opacity: logoIn ? 1 : 0,
          transform: logoIn ? "scale(1)" : "scale(0.96)",
          transition: `opacity ${LOGO_FADE_IN_MS}ms ease-out, transform ${LOGO_FADE_IN_MS}ms cubic-bezier(0.16, 1, 0.3, 1)`,
        }}
      />
    </div>
  );
}
