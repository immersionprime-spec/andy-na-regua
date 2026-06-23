export function BarberPole() {
  return (
    <div
      className="w-full"
      style={{
        height: "3px",
        background:
          "repeating-linear-gradient(90deg, var(--action-primary) 0 16px, #ffffff 16px 32px, var(--action-selection) 32px 48px)",
        opacity: 0.4,
      }}
    />
  );
}
