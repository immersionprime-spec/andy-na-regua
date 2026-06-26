"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import {
  APIProvider,
  Map,
  Marker,
  useApiIsLoaded,
} from "@vis.gl/react-google-maps";
import { BrandedPlaceholder } from "@/components/ui/BrandedPlaceholder";
import { MAP_STYLE_MOSTLY_GRAYSCALE } from "@/lib/mapStyle";

const ANDY_COORDS = { lat: -26.9892089, lng: -48.6340795 };

const ADDRESS =
  "Rua 900, nº 41 (Antigo China Center) — Balneário Camboriú/SC";

const MAPS_LINK = `https://www.google.com/maps/dir/?api=1&destination=${ANDY_COORDS.lat},${ANDY_COORDS.lng}&destination_place_id=ChIJv2AHnAa22JQRMZUdsghVU1M`;

const PIN_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="34" height="72" viewBox="0 0 34 72">
  <defs>
    <pattern id="andyStripes" patternUnits="userSpaceOnUse" width="12" height="12" patternTransform="rotate(45)">
      <rect width="4" height="12" fill="#cc1f1f"/>
      <rect x="4" width="4" height="12" fill="#ffffff"/>
      <rect x="8" width="4" height="12" fill="#2563eb"/>
    </pattern>
    <filter id="andyShadow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="1" dy="2" stdDeviation="2" flood-opacity="0.45"/>
    </filter>
    <linearGradient id="poleGloss" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="rgba(0,0,0,0.25)"/>
      <stop offset="35%" stop-color="rgba(255,255,255,0.25)"/>
      <stop offset="70%" stop-color="rgba(0,0,0,0.15)"/>
      <stop offset="100%" stop-color="rgba(0,0,0,0.3)"/>
    </linearGradient>
  </defs>
  <ellipse cx="17" cy="69" rx="8" ry="1.8" fill="rgba(0,0,0,0.4)"/>
  <circle cx="17" cy="4" r="3" fill="#0a0a0a" stroke="#0a0a0a" stroke-width="1.2"/>
  <rect x="8" y="7" width="18" height="7" rx="1.8" fill="#0a0a0a" stroke="#0a0a0a" stroke-width="1.2"/>
  <g filter="url(#andyShadow)">
    <rect x="10" y="14" width="14" height="44" fill="url(#andyStripes)" stroke="#0a0a0a" stroke-width="1.3"/>
    <rect x="10" y="14" width="14" height="44" fill="url(#poleGloss)"/>
    <rect x="10" y="14" width="14" height="44" fill="none" stroke="#0a0a0a" stroke-width="1.3"/>
  </g>
  <rect x="8" y="58" width="18" height="7" rx="1.8" fill="#0a0a0a" stroke="#0a0a0a" stroke-width="1.2"/>
  <path d="M14 65 L20 65 L18.5 69 L15.5 69 Z" fill="#0a0a0a" stroke="#0a0a0a" stroke-width="1.2"/>
</svg>`;

const PIN_URL = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(PIN_SVG)}`;

function ClockIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15.5 14" />
    </svg>
  );
}

function PaymentIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
      <line x1="6" y1="15" x2="10" y2="15" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10z" />
      <circle cx="12" cy="11" r="2.5" />
    </svg>
  );
}

const PRACTICAL_INFO = [
  { icon: ClockIcon, text: "Segunda a Sábado · 08h às 22h" },
  { icon: PaymentIcon, text: "Dinheiro · Cartão · Pix" },
  { icon: PinIcon, text: ADDRESS },
] as const;

function BrandedMarker() {
  const apiLoaded = useApiIsLoaded();
  if (!apiLoaded) return null;

  return (
    <Marker
      position={ANDY_COORDS}
      title="Andy Na Régua"
      icon={{
        url: PIN_URL,
        scaledSize: new google.maps.Size(34, 72),
        anchor: new google.maps.Point(17, 69),
      }}
    />
  );
}

function MapPlaceholder({ pendingKey = false }: { pendingKey?: boolean }) {
  return (
    <BrandedPlaceholder
      aspect="video"
      label={pendingKey ? "Mapa — chave Google Maps pendente" : undefined}
    />
  );
}

export function LocationSection() {
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(mapContainerRef, { once: true });

  return (
    <section id="contato" className="scroll-reveal bg-bg-base px-4 py-16">
      <div className="mx-auto max-w-6xl">
        {/* TODO copy */}
        <h2 className="mb-4 font-display text-4xl text-text-warm md:text-5xl">
          Onde estamos
        </h2>

        <div className="mb-6 flex flex-col gap-3 md:flex-row md:gap-8">
          {PRACTICAL_INFO.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-start gap-3">
              <span className="shrink-0 text-accent-gold">
                <Icon />
              </span>
              <span className="text-sm text-text-muted-1">{text}</span>
            </div>
          ))}
        </div>

        <div
          ref={mapContainerRef}
          className="mb-4 overflow-hidden"
          style={{ borderRadius: "var(--radius-card)" }}
        >
          {!googleMapsApiKey ? (
            <MapPlaceholder pendingKey />
          ) : inView ? (
            <APIProvider apiKey={googleMapsApiKey}>
              <Map
                defaultCenter={ANDY_COORDS}
                defaultZoom={16}
                style={{ width: "100%", height: 420 }}
                styles={MAP_STYLE_MOSTLY_GRAYSCALE}
                disableDefaultUI={false}
                gestureHandling="cooperative"
                clickableIcons={false}
              >
                <BrandedMarker />
              </Map>
            </APIProvider>
          ) : (
            <MapPlaceholder />
          )}
        </div>

        <a
          href={MAPS_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold uppercase text-accent-gold transition-colors hover:text-accent-gold-soft"
          style={{ letterSpacing: "0.15em" }}
        >
          Como chegar
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}
