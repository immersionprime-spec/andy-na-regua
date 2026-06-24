const AGENDAR_URL = process.env.NEXT_PUBLIC_AGENDAR_URL ?? "#";

export function MidPageCta() {
  return (
    <section className="bg-bg-surface px-4 py-12 text-center">
      <div className="mx-auto max-w-6xl">
        {/* TODO copy */}
        <h2 className="mb-6 font-display text-3xl text-text-warm md:text-4xl">
          Bora marcar o seu horário?
        </h2>
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
