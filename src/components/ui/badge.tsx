type Variant = "default" | "brand" | "success" | "warning" | "danger" | "info";

interface BadgeProps {
  variant?:  Variant;
  children:  React.ReactNode;
  className?: string;
}

const variantClasses: Record<Variant, string> = {
  default: "bg-gray-100  text-gray-600",
  brand:   "bg-brand-50  text-brand-600",
  success: "bg-green-50  text-green-700",
  warning: "bg-orange-50 text-orange-600",
  danger:  "bg-red-50    text-red-600",
  info:    "bg-blue-50   text-blue-600",
};

export function Badge({ variant = "default", children, className = "" }: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-2 py-0.5 text-caption font-semibold leading-none",
        variantClasses[variant],
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}
