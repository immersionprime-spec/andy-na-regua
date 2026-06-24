type LabelPosition = "left" | "right" | "center" | "none";

type AspectKey = "portrait" | "video" | "square";

const ASPECT_RATIOS: Record<AspectKey, string> = {
  portrait: "4/5",
  video: "16/9",
  square: "1/1",
};

type BrandedPlaceholderProps = {
  /** Texto do label decorativo. Se ausente, só renderiza a logo. */
  label?: string;
  /** Posição do label dentro do placeholder. Default: "center". */
  labelPosition?: LabelPosition;
  /** Aspect ratio do container. Quando ausente, o placeholder preenche 100% do parent (usado dentro de containers já dimensionados). */
  aspect?: AspectKey;
  /** Tamanho da logo watermark relativo à altura. Default: "55%". */
  logoSize?: string;
  /** Opacidade da logo. Default: 0.12. */
  logoOpacity?: number;
  className?: string;
};

/**
 * Placeholder branded — fundo gradient escuro com a logo Andy Na Régua como watermark.
 * Usado quando uma mídia (foto/vídeo) ainda não existe ou falhou ao carregar.
 * Substitui o antigo PlaceholderMedia (que era um quadrado tracejado genérico).
 */
export function BrandedPlaceholder({
  label,
  labelPosition = "center",
  aspect,
  logoSize = "55%",
  logoOpacity = 0.12,
  className = "",
}: BrandedPlaceholderProps) {
  const style: React.CSSProperties = aspect
    ? { aspectRatio: ASPECT_RATIOS[aspect] }
    : { height: "100%", width: "100%" };

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-bg-surface to-bg-base ${className}`}
      style={style}
    >
      {/* Logo watermark */}
      <img
        src="/logo.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 object-contain"
        style={{ height: logoSize, opacity: logoOpacity }}
      />

      {/* Label decorativo opcional */}
      {label && labelPosition !== "none" && (
        <div
          className={`absolute top-1/2 flex -translate-y-1/2 flex-col items-center ${
            labelPosition === "left"
              ? "left-[8%]"
              : labelPosition === "right"
                ? "right-[8%]"
                : "left-1/2 -translate-x-1/2"
          }`}
        >
          <p
            className="text-[10px] font-semibold uppercase text-accent-gold"
            style={{ letterSpacing: "0.32em" }}
          >
            {label}
          </p>
          <div className="mt-2 flex items-center gap-1.5">
            <span className="block h-px w-5 bg-accent-gold/60" />
            <span className="block h-1.5 w-1.5 rotate-45 bg-accent-gold" />
            <span className="block h-px w-5 bg-accent-gold/60" />
          </div>
        </div>
      )}
    </div>
  );
}
