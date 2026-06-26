"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { BrandedPlaceholder } from "./BrandedPlaceholder";

type BeforeAfterSliderProps = {
  beforeSrc: string;
  afterSrc: string;
};

export function BeforeAfterSlider({ beforeSrc, afterSrc }: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);
  const [beforeError, setBeforeError] = useState(false);
  const [afterError, setAfterError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const inView = useInView(containerRef, { once: true });

  useEffect(() => {
    if (!inView) return;

    if (reducedMotion) {
      setPosition(50);
      return;
    }

    let raf: number | null = null;
    const startPos = 95;
    const endPos = 50;
    const duration = 1500;
    const startTime = performance.now();

    setPosition(startPos);

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setPosition(startPos + (endPos - startPos) * eased);

      if (t < 1) {
        raf = requestAnimationFrame(animate);
      }
    };

    raf = requestAnimationFrame(animate);

    return () => {
      if (raf) cancelAnimationFrame(raf);
    };
  }, [inView, reducedMotion]);

  return (
    <div
      ref={containerRef}
      role="slider"
      tabIndex={0}
      aria-label="Comparar antes e depois"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(position)}
      className="relative overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      style={{
        aspectRatio: "4/5",
        touchAction: "none",
        borderRadius: "var(--radius-card)",
        outlineColor: "var(--accent-gold)",
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          setPosition((prev) => Math.max(5, prev - 5));
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          setPosition((prev) => Math.min(95, prev + 5));
        }
      }}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        setDragging(true);
      }}
      onPointerMove={(e) => {
        if (!dragging || !containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const raw = ((e.clientX - rect.left) / rect.width) * 100;
        setPosition(Math.min(95, Math.max(5, raw)));
      }}
      onPointerUp={() => {
        setDragging(false);
        if ("vibrate" in navigator) navigator.vibrate(15);
      }}
      onPointerCancel={() => setDragging(false)}
    >
      {/* Camada ANTES — fallback sempre presente atrás; imagem por cima quando carrega */}
      <div className="absolute inset-0">
        <BrandedPlaceholder label="Antes" labelPosition="left" />
        {!beforeError && (
          <img
            src={beforeSrc}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            onError={() => setBeforeError(true)}
            onLoad={(e) => {
              // Safety net: se o Next dev devolver uma resposta inválida (ex.: HTML 404)
              // em vez de uma imagem real, o onError nem sempre dispara. Checamos
              // dimensões naturais para garantir que é uma imagem válida.
              const img = e.currentTarget;
              if (img.naturalWidth < 50 || img.naturalHeight < 50) {
                setBeforeError(true);
              }
            }}
            draggable={false}
          />
        )}
      </div>

      {/* Camada DEPOIS — clipPath revela conforme o slider; mesma estratégia de fallback */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 0 0 ${position}%)` }}
      >
        <BrandedPlaceholder label="Depois" labelPosition="right" />
        {!afterError && (
          <img
            src={afterSrc}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            onError={() => setAfterError(true)}
            onLoad={(e) => {
              const img = e.currentTarget;
              if (img.naturalWidth < 50 || img.naturalHeight < 50) {
                setAfterError(true);
              }
            }}
            draggable={false}
          />
        )}
      </div>

      {/* Slider handle */}
      <div
        className="pointer-events-none absolute bottom-0 top-0 w-0.5 bg-text-primary"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      >
        <div className="absolute left-1/2 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-text-primary text-sm font-bold text-bg-base shadow-lg">
          ↔
        </div>
      </div>
    </div>
  );
}
