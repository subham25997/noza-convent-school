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
      <div className={"flex-1 h-[2px] max-w-[60px]" + (color ? " bg-" + color : " bg-amber-500")} />

      <span className={color ? "text-" + color : "text-amber-500" + " px-2 text-center"}>
        {title}
      </span>

      <div className={"flex-1 h-[2px] max-w-[60px]" + (color ? " bg-" + color : " bg-amber-500")} />
    </h2>
  );
}
