import type { Servico } from "@/lib/types";

const AGENDAR_URL = process.env.NEXT_PUBLIC_AGENDAR_URL ?? "#";

type ServiceCategoryAccordionProps = {
  categoryLabel: string;
  items: Servico[];
  precoMinimo: number;
  duracaoMin: number;
  duracaoMax: number;
};

function formatPrecoResumo(value: number): string {
  const formatted = Number.isInteger(value) ? String(value) : value.toFixed(0);
  return `R$${formatted}`;
}

function formatDuracao(min: number, max: number): string {
  if (min === max) return `${min}min`;
  return `${min}–${max}min`;
}

function formatPrecoServico(value: number): string {
  const formatted = Number.isInteger(value)
    ? String(value)
    : value.toFixed(2).replace(".", ",");
  return `R$ ${formatted}`;
}

export function ServiceCategoryAccordion({
  categoryLabel,
  items,
  precoMinimo,
  duracaoMin,
  duracaoMax,
}: ServiceCategoryAccordionProps) {
  return (
    <details className="group bg-bg-surface" style={{ borderRadius: "var(--radius-card)" }}>
      <summary
        className="flex cursor-pointer list-none items-center justify-between gap-3 border border-text-muted-3 px-5 py-4 transition-[transform,colors,border-color] duration-150 active:scale-[0.99] active:bg-bg-surface-hover group-open:rounded-b-none group-open:border-b-0 group-open:border-accent-gold md:hover:bg-bg-surface-hover [&::-webkit-details-marker]:hidden"
        style={{
          borderRadius: "var(--radius-card)",
          minHeight: "var(--card-min-height)",
        }}
      >
        <div className="min-w-0 flex-1 text-left">
          <div className="font-semibold text-text-warm">
            {categoryLabel} — a partir de {formatPrecoResumo(precoMinimo)} ·{" "}
            {formatDuracao(duracaoMin, duracaoMax)}
          </div>
          <p className="mt-1 text-xs text-text-muted-3 group-open:hidden">
            Toque para ver os serviços
          </p>
        </div>
        <span
          aria-hidden="true"
          className="shrink-0 text-xl leading-none text-accent-gold transition-transform duration-200 group-open:rotate-90"
        >
          ›
        </span>
      </summary>

      <div className="border-x border-b border-text-muted-3 group-open:border-accent-gold" style={{ borderRadius: "0 0 var(--radius-card) var(--radius-card)" }}>
        {items.map((servico, index) => (
          <div
            key={servico.id}
            className={`flex flex-col gap-2 px-5 py-3 sm:flex-row sm:items-center sm:justify-between ${
              index < items.length - 1 ? "border-b border-text-muted-4" : ""
            }`}
          >
            <div className="min-w-0">
              <span className="font-medium text-text-warm">{servico.name}</span>
              <span className="text-sm text-text-muted-2">
                {" "}
                · {formatPrecoServico(servico.price)} · {servico.durationMinutes}
                min
              </span>
            </div>
            <a
              href={AGENDAR_URL}
              className="shrink-0 text-xs font-semibold text-state-success hover:underline"
            >
              Agendar este serviço
            </a>
          </div>
        ))}
      </div>
    </details>
  );
}
