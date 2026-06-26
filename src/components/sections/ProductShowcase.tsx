"use client";

import { ProductCard } from "@/components/ui/ProductCard";
import { useProdutos } from "@/hooks/useProdutos";

export function ProductShowcase() {
  const { data, loading, error, refetch } = useProdutos();

  return (
    <section id="vitrine" className="scroll-reveal bg-bg-base px-4 py-16">
      <div className="mx-auto max-w-6xl">
        {/* TODO copy */}
        <h2 className="mb-10 font-display text-4xl text-text-warm md:text-5xl">Vitrine</h2>

        {loading && (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square animate-pulse bg-bg-surface"
                style={{ borderRadius: "var(--radius-card)" }}
              />
            ))}
          </div>
        )}

        {error && !loading && (
          <div className="text-center">
            <p className="mb-4 text-sm text-text-muted-2">
              Não foi possível carregar os produtos agora. Tente novamente em
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
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {data.map((produto) => (
              <ProductCard
                key={produto.id}
                nome={produto.nome}
                descricao={produto.descricao}
                preco={produto.preco}
                categoria={produto.categoriaInferida}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
