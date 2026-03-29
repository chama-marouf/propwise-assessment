import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        "flex h-9 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-body text-gray-900",
        "placeholder:text-gray-400 transition-colors",
        "focus-visible:outline-none focus-visible:border-brand-400 focus-visible:ring-2 focus-visible:ring-brand-400/20",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "dark:border-stone-700 dark:bg-stone-900 dark:text-stone-50 dark:placeholder:text-stone-500",
        "dark:focus-visible:border-brand-500",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

export { Input };
