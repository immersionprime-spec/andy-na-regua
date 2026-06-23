"use client";

const AGENDAR_URL = process.env.NEXT_PUBLIC_AGENDAR_URL ?? "#";

function handleAgendarClick() {
  if ("vibrate" in navigator) navigator.vibrate(15);
}

export function StickyAgendarButton() {
  return (
    <a
      href={AGENDAR_URL}
      onClick={handleAgendarClick}
      className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-center bg-action-primary text-base font-semibold text-text-primary md:hidden"
      style={{ height: "56px" }}
    >
      Agendar
    </a>
  );
}
