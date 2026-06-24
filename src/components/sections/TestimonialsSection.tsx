import { TestimonialCard } from "@/components/ui/TestimonialCard";

/* PLACEHOLDER: substituir por avaliações reais do Google/Instagram quando disponíveis */
const TESTIMONIALS = [
  {
    name: "Cliente A",
    text: "Atendimento excelente e ambiente muito bacana. Voltarei com certeza.",
  },
  {
    name: "Cliente B",
    text: "Corte ficou exatamente como eu queria. Recomendo demais.",
  },
  {
    name: "Cliente C",
    text: "Agendamento online facilitou muito. Experiência top do início ao fim.",
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-bg-surface px-4 py-16">
      <div className="mx-auto max-w-6xl">
        {/* TODO copy */}
        <h2 className="mb-10 font-display text-4xl text-text-warm md:text-5xl">
          O que dizem sobre a gente
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.name} name={t.name} text={t.text} />
          ))}
        </div>
      </div>
    </section>
  );
}
