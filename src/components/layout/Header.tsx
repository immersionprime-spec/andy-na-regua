"use client";

import { useState } from "react";
import { BarberPole } from "./BarberPole";
import { BottomSheetMenu } from "./BottomSheetMenu";

const AGENDAR_URL = process.env.NEXT_PUBLIC_AGENDAR_URL ?? "#";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 z-50 w-full bg-bg-base">
        <div
          className="mx-auto flex max-w-6xl items-center justify-between px-4"
          style={{ height: "64px" }}
        >
          <img
            src="/logo.png"
            alt="Andy Na Régua"
            className="h-9 w-auto object-contain"
          />

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex flex-col justify-center gap-1.5 p-2 md:hidden"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menu"
            >
              <span className="block h-0.5 w-5 bg-text-primary" />
              <span className="block h-0.5 w-5 bg-text-primary" />
              <span className="block h-0.5 w-5 bg-text-primary" />
            </button>

            <a
              href={AGENDAR_URL}
              className="inline-flex items-center justify-center bg-action-primary px-5 text-sm font-semibold text-text-primary transition-colors hover:bg-action-primary-hover"
              style={{
                minHeight: "var(--touch-min)",
                borderRadius: "var(--radius-pill)",
              }}
            >
              Agendar
            </a>
          </div>
        </div>
        <BarberPole />
      </header>

      <BottomSheetMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
