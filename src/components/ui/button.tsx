import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size    = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:  Variant;
  size?:     Size;
}

const variantClasses: Record<Variant, string> = {
  primary:   "bg-brand-500 text-white hover:bg-brand-600 shadow-xs",
  secondary: "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 shadow-xs",
  ghost:     "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
  danger:    "bg-red-500 text-white hover:bg-red-600 shadow-xs",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-2.5 py-1.5 text-body-sm",
  md: "px-3.5 py-2   text-body",
  lg: "px-4   py-2.5 text-body",
};

export function Button({
  variant   = "secondary",
  size      = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={[
        "inline-flex items-center justify-center gap-1.5 rounded-lg font-semibold",
        "transition-all duration-150 active:scale-95",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100",
        variantClasses[variant],
        sizeClasses[size],
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
