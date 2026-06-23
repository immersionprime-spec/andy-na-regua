"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchServicos } from "@/lib/api";
import type { Servico } from "@/lib/types";

export function useServicos() {
  const [data, setData] = useState<Servico[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const servicos = await fetchServicos();
      setData(servicos);
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
