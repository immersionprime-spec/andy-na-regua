type TestimonialCardProps = {
  name: string;
  text: string;
};

export function TestimonialCard({ name, text }: TestimonialCardProps) {
  return (
    <div
      className="bg-bg-base p-5"
      style={{ borderRadius: "var(--radius-card)" }}
    >
      <p className="mb-3 text-sm text-text-muted-1">&ldquo;{text}&rdquo;</p>
      <p className="text-xs font-medium text-text-warm">{name}</p>
    </div>
  );
}
