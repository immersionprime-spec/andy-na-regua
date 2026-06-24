import { BarberPole } from "./BarberPole";

export function Footer() {
  return (
    <footer className="bg-bg-base">
      <BarberPole />

      {/* Bloco principal do rodapé */}
      <div className="mx-auto max-w-6xl px-4 pb-24 pt-10 text-center md:pb-10">
        {/* Endereço */}
        <p className="text-xs leading-relaxed text-text-muted-2 md:text-sm">
          Rua 900, nº 41 (Antigo China Center)
          <br className="md:hidden" />
          <span className="hidden md:inline"> — </span>
          Balneário Camboriú / SC
        </p>

        {/* Instagram da barbearia */}
        <a
          href="https://instagram.com/andynaregua"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-sm font-semibold text-action-selection-light transition-opacity hover:opacity-80"
        >
          @andynaregua
        </a>

        {/* Divisor sutil */}
        <div
          className="mx-auto mt-8 h-px max-w-xs"
          style={{
            background:
              "linear-gradient(to right, transparent, var(--text-muted-4) 50%, transparent)",
          }}
        />

        {/* Crédito do desenvolvedor */}
        <p className="mt-5 text-[11px] text-text-muted-3">
          Desenvolvido por{" "}
          <a
            href="https://instagram.com/pedrohbonfante"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-text-muted-1 underline-offset-2 transition-colors hover:text-text-warm hover:underline"
          >
            @pedrohbonfante
          </a>
        </p>
      </div>
    </footer>
  );
}
