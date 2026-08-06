"use client";

export default function MainTitle({
  title,
  align,
  color,
}: {
  title: string;
  align?: "left" | "center" | "right";
  color?: string;
}) {
  const alignmentClasses = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  };

  return (
    <h2
      className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-10
  flex items-center gap-4 ${alignmentClasses[align || "center"]}`}
    >
      <div
        className="flex-1 h-0.5 max-w-15"
        style={color ? { backgroundColor: color } : undefined}
      />

      <span
        className="px-2 text-center"
        style={color ? { color } : { color: "#f59e0b" }}
      >
        {title}
      </span>

      <div
        className="flex-1 h-0.5 max-w-15"
        style={color ? { backgroundColor: color } : undefined}
      />
    </h2>
  );
}
