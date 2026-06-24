"use client";

import { useState } from "react";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";

const AGENDAR_URL = process.env.NEXT_PUBLIC_AGENDAR_URL ?? "#";

function handleAgendarClick() {
  if ("vibrate" in navigator) navigator.vibrate(15);
}

type HeroVideoProps = {
  src: string;
  label: string;
};

function HeroVideo({ src, label }: HeroVideoProps) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div className="absolute inset-0">
        <PlaceholderMedia label={label} aspect="portrait" />
      </div>
    );
  }

  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      className="absolute inset-0 h-full w-full object-cover"
      onError={() => setErrored(true)}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

export function Hero() {
  return (
    <section className="relative h-[100dvh] overflow-hidden bg-bg-base">
      {/* Mobile: vídeo principal em tela cheia */}
      <div className="absolute inset-0 md:hidden">
        <HeroVideo src="/hero/video-principal.mp4" label="Vídeo principal" />
      </div>

      {/* Desktop: dois vídeos lado a lado, 50% cada */}
      <div className="absolute inset-0 hidden md:grid md:grid-cols-2">
        <div className="relative h-full w-full overflow-hidden">
          <HeroVideo src="/hero/video-principal.mp4" label="Vídeo principal" />
        </div>
        <div className="relative h-full w-full overflow-hidden">
          <HeroVideo src="/hero/video-secundario.mp4" label="Vídeo secundário" />
        </div>
      </div>

      {/* Overlay uniforme de contraste */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(10, 10, 10, 0.6)" }}
      />

      {/* Vinheta cinematográfica nas bordas */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* Textura de grão sutil sobre tudo */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Conteúdo sobreposto */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        {/* Eyebrow */}
        <p
          className="text-[10px] font-semibold uppercase text-accent-gold md:text-xs"
          style={{ letterSpacing: "0.32em" }}
        >
          Barbearia · Balneário Camboriú
        </p>

        {/* Divisor decorativo com losango dourado */}
        <div className="mt-4 flex items-center gap-3">
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

        {/* Logo oficial como peça central — substitui headline placeholder */}
        <img
          src="/logo.png"
          alt="Andy Na Régua — Barbearia"
          fetchPriority="high"
          className="mt-6 w-full max-w-[280px] object-contain sm:max-w-sm md:max-w-md lg:max-w-lg"
          style={{
            filter:
              "drop-shadow(0 4px 32px rgba(0, 0, 0, 0.85)) drop-shadow(0 0 24px rgba(201, 169, 97, 0.15))",
          }}
        />

        {/* Tagline em italic light, contrastando com a logo */}
        <p
          className="mt-6 text-base font-light italic text-text-warm/90 md:text-lg"
          style={{ textShadow: "0 2px 16px rgba(0, 0, 0, 0.6)" }}
        >
          Sem complicação.
        </p>

        {/* CTA */}
        <a
          href={AGENDAR_URL}
          onClick={handleAgendarClick}
          className="group mt-10 inline-flex items-center justify-center gap-2 bg-action-primary px-10 py-4 text-sm font-bold uppercase text-text-primary shadow-[0_8px_32px_rgba(204,31,31,0.4)] transition-all hover:bg-action-primary-hover hover:shadow-[0_12px_40px_rgba(204,31,31,0.55)] md:text-base"
          style={{
            borderRadius: "var(--radius-pill)",
            minHeight: "var(--touch-min)",
            letterSpacing: "0.15em",
          }}
        >
          Agendar
          <span
            aria-hidden="true"
            className="inline-block transition-transform group-hover:translate-x-1"
          >
            →
          </span>
        </a>
      </div>

      {/* Indicador de scroll sutil no bottom */}
      <div
        className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
        aria-hidden="true"
      >
        <div className="mx-auto h-8 w-px bg-gradient-to-b from-transparent via-accent-gold/40 to-accent-gold/80" />
      </div>
    </section>
  );
}
