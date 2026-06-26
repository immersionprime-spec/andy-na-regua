"use client";

import { CategoryServiceCard } from "@/components/ui/CategoryServiceCard";
import { useServicos } from "@/hooks/useServicos";
import type { Servico } from "@/lib/types";

function groupByCategory(servicos: Servico[]) {
  const groups = new Map<string, Servico[]>();
  for (const s of servicos) {
    const list = groups.get(s.category) ?? [];
    list.push(s);
    groups.set(s.category, list);
  }
  return groups;
}

export function ServicesSection() {
  const { data, loading, error, refetch } = useServicos();

  return (
    <section id="servicos" className="scroll-reveal bg-bg-base px-4 py-16" style={{ scrollMarginTop: "96px" }}>
      <div className="mx-auto max-w-6xl">
        {/* TODO copy */}
        <h2 className="mb-10 font-display text-4xl text-text-warm md:text-5xl">Serviços</h2>

        {loading && (
          <div className="flex flex-col gap-3">
            <CategoryServiceCard
              categoryLabel=""
              precoMinimo={0}
              duracaoMin={0}
              duracaoMax={0}
              skeleton
            />
            <CategoryServiceCard
              categoryLabel=""
              precoMinimo={0}
              duracaoMin={0}
              duracaoMax={0}
              skeleton
            />
            <CategoryServiceCard
              categoryLabel=""
              precoMinimo={0}
              duracaoMin={0}
              duracaoMax={0}
              skeleton
            />
          </div>
        )}

        {error && !loading && (
          <div className="text-center">
            {/* TODO copy */}
            <p className="mb-4 text-sm text-text-muted-2">
              Não foi possível carregar os serviços agora. Tente novamente em
              instantes.
            </p>
            <button
              type="button"
              onClick={refetch}
              className="rounded-xl border border-text-muted-3 px-4 py-2 text-sm text-text-primary hover:bg-bg-surface"
            >
              Tentar novamente
            </button>
          </div>
        )}

        {data && !loading && !error && (
          <div className="flex flex-col gap-3">
            {Array.from(groupByCategory(data).entries()).map(
              ([category, items]) => {
                const precoMinimo = Math.min(...items.map((s) => s.price));
                const duracaoMin = Math.min(
                  ...items.map((s) => s.durationMinutes),
                );
                const duracaoMax = Math.max(
                  ...items.map((s) => s.durationMinutes),
                );
                const categoryLabel =
                  items[0]?.categoryLabel ?? category;

                return (
                  <CategoryServiceCard
                    key={category}
                    categoryLabel={categoryLabel}
                    precoMinimo={precoMinimo}
                    duracaoMin={duracaoMin}
                    duracaoMax={duracaoMax}
                  />
                );
              },
            )}
          </div>
        )}
      </div>
    </section>
  );
}
