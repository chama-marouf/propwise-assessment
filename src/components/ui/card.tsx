interface CardProps {
  children:   React.ReactNode;
  className?: string;
  padding?:   "none" | "sm" | "md" | "lg";
}

const paddingMap = { none: "", sm: "p-3", md: "p-4", lg: "p-5" };

export function Card({ children, className = "", padding = "lg" }: CardProps) {
  return (
    <div
      className={[
        "rounded-xl border border-gray-200 bg-white shadow-card",
        paddingMap[padding],
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
