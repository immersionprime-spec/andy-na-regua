import { BrandedPlaceholder } from "@/components/ui/BrandedPlaceholder";

export function TeamSection() {
  return (
    <section className="bg-bg-base px-4 py-12">
      <div className="mx-auto max-w-6xl">
        {/* TODO copy */}
        <h2 className="mb-4 font-display text-4xl text-text-warm md:text-5xl">
          Nossa equipe
        </h2>
        <p className="mb-6 max-w-2xl text-sm text-text-muted-2">
          {/* PLACEHOLDER: copy provisório */}
          Profissionais experientes, ambiente descontraído e atenção aos
          detalhes em cada atendimento.
        </p>
        <div
          className="max-w-md overflow-hidden"
          style={{ borderRadius: "var(--radius-card)" }}
        >
          <BrandedPlaceholder aspect="video" />
        </div>
      </div>
    </section>
  );
}
