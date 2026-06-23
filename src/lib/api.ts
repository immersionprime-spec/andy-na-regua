import type { Produto, Servico } from "./types";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

export async function fetchServicos(): Promise<Servico[]> {
  const res = await fetch(`${API_BASE}/api/servicos`);
  if (!res.ok) throw new Error("Falha ao buscar serviços");
  const data = await res.json();
  return data.servicos;
}

export async function fetchProdutos(): Promise<Produto[]> {
  const res = await fetch(`${API_BASE}/api/produtos`);
  if (!res.ok) throw new Error("Falha ao buscar produtos");
  const data = await res.json();
  return data.produtos;
}
