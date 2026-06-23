type PlaceholderMediaProps = {
  label: string;
  aspect: "video" | "square" | "portrait";
};

const aspectRatios = {
  video: "16/9",
  square: "1/1",
  portrait: "4/5",
} as const;

export function PlaceholderMedia({ label, aspect }: PlaceholderMediaProps) {
  return (
    <div
      className="flex items-center justify-center bg-bg-surface text-center text-text-muted-3"
      style={{
        aspectRatio: aspectRatios[aspect],
        border: "1px dashed var(--text-muted-3)",
      }}
    >
      <span className="px-4 text-sm">[PLACEHOLDER] {label}</span>
    </div>
  );
}
