"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchProdutos } from "@/lib/api";
import type { ProdutoComCategoria } from "@/lib/types";
import { inferProdutoCategoria } from "@/lib/types";

export function useProdutos() {
  const [data, setData] = useState<ProdutoComCategoria[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const produtos = await fetchProdutos();
      setData(
        produtos.map((p) => ({
          ...p,
          categoriaInferida: inferProdutoCategoria(p.nome),
        })),
      );
    } catch (e) {
      setError(e instanceof Error ? e : new Error("Erro desconhecido"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, loading, error, refetch };
}
