type CategoryServiceCardProps = {
  categoryLabel: string;
  precoMinimo: number;
  duracaoMin: number;
  duracaoMax: number;
  skeleton?: boolean;
};

function formatPreco(value: number): string {
  const formatted = Number.isInteger(value) ? String(value) : value.toFixed(0);
  return `R$${formatted}`;
}

function formatDuracao(min: number, max: number): string {
  if (min === max) return `${min}min`;
  return `${min}–${max}min`;
}

export function CategoryServiceCard({
  categoryLabel,
  precoMinimo,
  duracaoMin,
  duracaoMax,
  skeleton = false,
}: CategoryServiceCardProps) {
  if (skeleton) {
    return (
      <div
        className="animate-pulse bg-bg-surface"
        style={{
          borderRadius: "var(--radius-card)",
          minHeight: "var(--card-min-height)",
        }}
      />
    );
  }

  return (
    <div
      className="bg-bg-surface px-5 py-4"
      style={{
        borderRadius: "var(--radius-card)",
        minHeight: "var(--card-min-height)",
      }}
    >
      <div className="font-semibold text-text-warm">
        {categoryLabel} — a partir de {formatPreco(precoMinimo)} ·{" "}
        {formatDuracao(duracaoMin, duracaoMax)}
      </div>
    </div>
  );
}
