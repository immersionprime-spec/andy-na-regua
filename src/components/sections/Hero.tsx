"use client";

import { useState } from "react";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";

const AGENDAR_URL = process.env.NEXT_PUBLIC_AGENDAR_URL ?? "#";

function handleAgendarClick() {
  if ("vibrate" in navigator) navigator.vibrate(15);
}

export function Hero() {
  const [videoError, setVideoError] = useState(false);

  return (
    <section className="relative h-[100dvh] overflow-hidden">
      {videoError ? (
        <div className="absolute inset-0">
          <PlaceholderMedia
            label="Vídeo hero — aguardando mídia real"
            aspect="video"
          />
        </div>
      ) : (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          onError={() => setVideoError(true)}
        >
          <source src="/hero-placeholder.mp4" type="video/mp4" />
        </video>
      )}

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(10,10,10,0.85) 100%)",
        }}
      />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 pt-16">
        <div
          className="bg-bg-base px-6 py-6 text-center"
          style={{ borderRadius: "var(--radius-card)" }}
        >
          <img
            src="/logo.png"
            alt="Andy Na Régua"
            className="mx-auto mb-4 w-[220px] max-w-full object-contain"
          />
          {/* TODO copy: headline institucional */}
          <p className="text-lg font-medium text-text-warm">
            Corte, barba e atitude. Sem complicação.
          </p>
        </div>

        <a
          href={AGENDAR_URL}
          onClick={handleAgendarClick}
          className="mt-6 inline-flex items-center justify-center bg-action-primary px-8 py-4 text-base font-semibold text-text-primary transition-colors hover:bg-action-primary-hover"
          style={{ borderRadius: "var(--radius-pill)" }}
        >
          Agendar
        </a>
      </div>
    </section>
  );
}
