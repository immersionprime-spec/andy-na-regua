"use client";

import Map, { Marker } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";

const ANDY_COORDS = { lat: -26.9925, lng: -48.6225 };

const MAPS_LINK =
  "https://www.google.com/maps/search/?api=1&query=Rua+900+n+41+Balneário+Camboriú+SC";

export function LocationSection() {
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  return (
    <section id="contato" className="bg-bg-base px-4 py-16">
      <div className="mx-auto max-w-6xl">
        {/* TODO copy */}
        <h2 className="mb-4 text-2xl font-bold text-text-primary">
          Onde estamos
        </h2>

        <p className="mb-6 text-sm text-text-muted-2">
          Rua 900, nº 41 (Antigo China Center) — Balneário Camboriú/SC
        </p>

        {mapboxToken ? (
          <div
            className="mb-4 overflow-hidden"
            style={{ borderRadius: "var(--radius-card)" }}
          >
            <Map
              mapboxAccessToken={mapboxToken}
              initialViewState={{
                longitude: ANDY_COORDS.lng,
                latitude: ANDY_COORDS.lat,
                zoom: 15,
              }}
              style={{ width: "100%", height: 360, borderRadius: 16 }}
              mapStyle="mapbox://styles/mapbox/dark-v11"
            >
              <Marker
                longitude={ANDY_COORDS.lng}
                latitude={ANDY_COORDS.lat}
                color="#cc1f1f"
              />
            </Map>
          </div>
        ) : (
          <div className="mb-4">
            <PlaceholderMedia
              label="Mapa — token Mapbox pendente"
              aspect="video"
            />
          </div>
        )}

        <a
          href={MAPS_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-action-selection-light hover:underline"
        >
          Como chegar
        </a>
      </div>
    </section>
  );
}
