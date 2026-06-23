import { BarberPole } from "./BarberPole";

export function Footer() {
  return (
    <footer className="bg-bg-base px-4 py-8 text-center text-[11px] text-text-muted-2">
      <BarberPole />
      <div className="mt-8">
        Rua 900, nº 41 (Antigo China Center) — Balneário Camboriú/SC
        <br />
        <a
          href="https://instagram.com/andynaregua"
          target="_blank"
          rel="noopener noreferrer"
          className="text-action-selection-light hover:underline"
        >
          @andynaregua
        </a>
      </div>
    </footer>
  );
}
