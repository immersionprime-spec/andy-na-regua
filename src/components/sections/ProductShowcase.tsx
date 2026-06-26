"use client";

import { useState } from "react";
import { ProductCard } from "@/components/ui/ProductCard";
import { useProdutos } from "@/hooks/useProdutos";

const LIMITE_MOBILE = 6;
const LIMITE_DESKTOP = 8;

export function ProductShowcase() {
  const { data, loading, error, refetch } = useProdutos();
  const [expandido, setExpandido] = useState(false);

  const temOcultos = !!data && data.length > LIMITE_MOBILE;

  return (
    <section id="vitrine" className="scroll-reveal bg-bg-base px-4 py-16" style={{ scrollMarginTop: "96px" }}>
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
          <>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
              {data.map((produto, i) => {
                // Sem JS de viewport: escondemos por índice usando breakpoints.
                // i >= 6 some no mobile a menos que expandido; i >= 8 some no desktop a menos que expandido.
                const ocultoMobile = !expandido && i >= LIMITE_MOBILE;
                const ocultoDesktop = !expandido && i >= LIMITE_DESKTOP;
                return (
                  <div
                    key={produto.id}
                    className={
                      ocultoMobile
                        ? ocultoDesktop
                          ? "hidden md:hidden"
                          : "hidden md:block"
                        : ocultoDesktop
                          ? "block md:hidden"
                          : "block"
                    }
                  >
                    <ProductCard
                      id={produto.id}
                      nome={produto.nome}
                      descricao={produto.descricao}
                      preco={produto.preco}
                      categoria={produto.categoriaInferida}
                    />
                  </div>
                );
              })}
            </div>

            {!expandido && temOcultos && (
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={() => setExpandido(true)}
                  className="rounded-xl border border-text-muted-3 px-6 py-3 text-sm font-semibold text-text-primary transition-colors hover:bg-bg-surface"
                >
                  Ver mais produtos
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
