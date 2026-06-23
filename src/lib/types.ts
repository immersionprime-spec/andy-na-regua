export type Servico = {
  id: string;
  name: string;
  price: number;
  durationMinutes: number;
  category: string;
  categoryLabel: string;
};

export type Produto = {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
};

export type ProdutoComCategoria = Produto & { categoriaInferida: string };

export const CATEGORY_KEYWORDS: Record<string, string[]> = {
  cera: ["cera", "pomada", "pasta", "wax", "modelador"],
  barba: ["barba", "balm", "oleo de barba", "óleo de barba"],
  shampoo: ["shampoo", "minoxidil"],
};

export function inferProdutoCategoria(nome: string): string {
  const lower = nome.toLowerCase();
  for (const [categoria, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some((kw) => lower.includes(kw))) {
      return categoria;
    }
  }
  return "outro";
}
