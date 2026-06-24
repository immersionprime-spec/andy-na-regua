"use client";

import {
  APIProvider,
  Map,
  Marker,
  useApiIsLoaded,
} from "@vis.gl/react-google-maps";
import { BrandedPlaceholder } from "@/components/ui/BrandedPlaceholder";
import { MAP_STYLE_MOSTLY_GRAYSCALE } from "@/lib/mapStyle";

const ANDY_COORDS = { lat: -26.9892089, lng: -48.6340795 };

// Link "Como chegar" — abre direto na tela de rotas do Google Maps a partir
// da localização atual do usuário, destino fixo nas coords da barbearia.
const MAPS_LINK = `https://www.google.com/maps/dir/?api=1&destination=${ANDY_COORDS.lat},${ANDY_COORDS.lng}&destination_place_id=ChIJv2AHnAa22JQRMZUdsghVU1M`;

// SVG do pin customizado — barber pole vertical com as cores oficiais da marca
// (mesmas listras vermelho/branco/azul do BarberPole do header/footer).
// Cap e knob superior dourados (--accent-gold), pole ancorado na base.
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

  <!-- Sombra elíptica no chão (sensação de estar em pé na coordenada) -->
  <ellipse cx="17" cy="69" rx="8" ry="1.8" fill="rgba(0,0,0,0.4)"/>

  <!-- Knob superior preto -->
  <circle cx="17" cy="4" r="3" fill="#0a0a0a" stroke="#0a0a0a" stroke-width="1.2"/>

  <!-- Cap superior preto -->
  <rect x="8" y="7" width="18" height="7" rx="1.8" fill="#0a0a0a" stroke="#0a0a0a" stroke-width="1.2"/>

  <!-- Tubo de vidro com listras diagonais -->
  <g filter="url(#andyShadow)">
    <rect x="10" y="14" width="14" height="44" fill="url(#andyStripes)" stroke="#0a0a0a" stroke-width="1.3"/>
    <!-- Camada de gloss/reflexo cilíndrico por cima -->
    <rect x="10" y="14" width="14" height="44" fill="url(#poleGloss)"/>
    <!-- Reforço do contorno -->
    <rect x="10" y="14" width="14" height="44" fill="none" stroke="#0a0a0a" stroke-width="1.3"/>
  </g>

  <!-- Cap inferior preto -->
  <rect x="8" y="58" width="18" height="7" rx="1.8" fill="#0a0a0a" stroke="#0a0a0a" stroke-width="1.2"/>

  <!-- Ponta da base (onde "espeta" o mapa) -->
  <path d="M14 65 L20 65 L18.5 69 L15.5 69 Z" fill="#0a0a0a" stroke="#0a0a0a" stroke-width="1.2"/>
</svg>`;

const PIN_URL = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(PIN_SVG)}`;

/**
 * Marker branded — pin customizado no formato barber pole.
 * Aguarda a API do Google Maps carregar antes de instanciar Size/Point
 * (que só existem após o script externo terminar de baixar).
 */
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
        anchor: new google.maps.Point(17, 69), // base do barber pole como ponto âncora
      }}
    />
  );
}

export function LocationSection() {
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  return (
    <section id="contato" className="bg-bg-base px-4 py-16">
      <div className="mx-auto max-w-6xl">
        {/* TODO copy */}
        <h2 className="mb-4 font-display text-4xl text-text-warm md:text-5xl">
          Onde estamos
        </h2>

        <p className="mb-6 text-sm text-text-muted-2">
          Rua 900, nº 41 (Antigo China Center) — Balneário Camboriú/SC
        </p>

        {googleMapsApiKey ? (
          <div
            className="mb-4 overflow-hidden"
            style={{ borderRadius: "var(--radius-card)" }}
          >
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
          </div>
        ) : (
          <div
            className="mb-4 overflow-hidden"
            style={{ borderRadius: "var(--radius-card)" }}
          >
            <BrandedPlaceholder
              aspect="video"
              label="Mapa — chave Google Maps pendente"
            />
          </div>
        )}

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
