import { useState } from "react";
import { PlaceholderMedia } from "./PlaceholderMedia";
import {
  buildProductInquiryMessage,
  buildWhatsAppLink,
} from "@/lib/whatsapp";

type ProductCardProps = {
  id: string;
  nome: string;
  descricao?: string;
  preco: number;
  categoria: string;
};

function formatPreco(value: number): string {
  return `R$ ${value.toFixed(2).replace(".", ",")}`;
}

export function ProductCard({ id, nome, descricao, preco }: ProductCardProps) {
  const whatsappHref = buildWhatsAppLink(buildProductInquiryMessage(nome));
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div
      className="flex flex-col overflow-hidden bg-bg-surface transition-transform transition-colors duration-150 active:scale-[0.98] active:bg-bg-surface-hover md:hover:bg-bg-surface-hover"
      style={{ borderRadius: "var(--radius-card)" }}
    >
      {imgFailed ? (
        <PlaceholderMedia label={nome} aspect="square" />
      ) : (
        <div className="aspect-square overflow-hidden bg-bg-surface">
          <img
            src={`/produtos/${id}.webp`}
            alt={nome}
            loading="lazy"
            className="h-full w-full object-cover"
            onError={() => setImgFailed(true)}
          />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-1 p-3">
        <h3 className="text-sm font-semibold text-text-warm">{nome}</h3>
        {descricao && (
          <p className="line-clamp-2 text-xs text-text-muted-2">{descricao}</p>
        )}
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="font-bold text-text-primary">{formatPreco(preco)}</span>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-state-success hover:underline"
          >
            Perguntar no WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
