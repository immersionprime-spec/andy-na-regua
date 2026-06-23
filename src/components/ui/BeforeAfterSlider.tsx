"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { PlaceholderMedia } from "./PlaceholderMedia";
import { useReducedMotion } from "@/hooks/useReducedMotion";

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
      className="relative overflow-hidden"
      style={{
        aspectRatio: "4/5",
        touchAction: "none",
        borderRadius: "var(--radius-card)",
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
      <div className="absolute inset-0">
        {beforeError ? (
          <PlaceholderMedia label="Antes" aspect="portrait" />
        ) : (
          <img
            src={beforeSrc}
            alt="Antes"
            className="h-full w-full object-cover"
            onError={() => setBeforeError(true)}
            draggable={false}
          />
        )}
      </div>

      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 0 0 ${position}%)` }}
      >
        {afterError ? (
          <PlaceholderMedia label="Depois" aspect="portrait" />
        ) : (
          <img
            src={afterSrc}
            alt="Depois"
            className="h-full w-full object-cover"
            onError={() => setAfterError(true)}
            draggable={false}
          />
        )}
      </div>

      <div
        className="pointer-events-none absolute bottom-0 top-0 w-0.5 bg-text-primary"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      >
        <div
          className="absolute left-1/2 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-text-primary text-sm font-bold text-bg-base"
        >
          ↔
        </div>
      </div>
    </div>
  );
}
