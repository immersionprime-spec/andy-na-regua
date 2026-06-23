const AGENDAR_URL = process.env.NEXT_PUBLIC_AGENDAR_URL ?? "#";

export function AboutSection() {
  return (
    <section
      id="sobre"
      className="bg-light-block-bg px-4 py-16 text-light-block-text"
    >
      <div className="mx-auto max-w-3xl">
        {/* TODO copy */}
        <h2 className="mb-6 text-2xl font-bold">Sobre a Andy Na Régua</h2>

        <p className="mb-4 text-sm leading-relaxed opacity-80">
          {/* PLACEHOLDER: copy provisório */}
          A Andy Na Régua é uma barbearia em Balneário Camboriú focada em
          cortes masculinos, barba e cuidados de estética. Este texto é
          provisório e será substituído pela copy final.
        </p>
        <p className="mb-4 text-sm leading-relaxed opacity-80">
          {/* PLACEHOLDER: copy provisório */}
          Nosso espaço foi pensado para você relaxar, conversar e sair no
          estilo. Placeholder até a versão definitiva do conteúdo.
        </p>
        <p className="mb-8 text-sm leading-relaxed opacity-80">
          {/* PLACEHOLDER: copy provisório */}
          Agende online em poucos toques e confirme tudo pelo WhatsApp.
        </p>

        <a
          href={AGENDAR_URL}
          className="inline-flex items-center justify-center bg-action-primary px-6 text-sm font-semibold text-text-primary transition-colors hover:bg-action-primary-hover"
          style={{
            minHeight: "var(--touch-min)",
            borderRadius: "var(--radius-pill)",
          }}
        >
          Agendar
        </a>
      </div>
    </section>
  );
}
