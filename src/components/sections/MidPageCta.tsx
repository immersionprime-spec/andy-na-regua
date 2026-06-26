const AGENDAR_URL = process.env.NEXT_PUBLIC_AGENDAR_URL ?? "#";

export function MidPageCta() {
  return (
    <section className="bg-bg-base px-4 py-16 text-center">
      <div
        className="mx-auto max-w-6xl border border-accent-gold px-6 py-10"
        style={{ borderRadius: "var(--radius-card)" }}
      >
        <div className="mb-6 flex items-center justify-center gap-3">
          <span
            className="block h-px w-12"
            style={{
              background:
                "linear-gradient(to right, transparent, var(--accent-gold) 100%)",
            }}
          />
          <span className="block h-2 w-2 rotate-45 bg-accent-gold" />
          <span
            className="block h-px w-12"
            style={{
              background:
                "linear-gradient(to left, transparent, var(--accent-gold) 100%)",
            }}
          />
        </div>

        {/* TODO copy */}
        <h2 className="mb-6 font-display text-4xl text-text-warm md:text-5xl">
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
