import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-1.5 rounded-lg font-semibold",
    "transition-all duration-150 active:scale-95",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400",
    "disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100",
  ],
  {
    variants: {
      variant: {
        primary:
          "bg-brand-500 text-white shadow-xs hover:bg-brand-600 dark:bg-brand-600 dark:hover:bg-brand-500",
        secondary:
          "border border-gray-200 bg-white text-gray-700 shadow-xs hover:bg-gray-50 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200 dark:hover:bg-stone-700",
        ghost:
          "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-stone-100",
        danger:
          "bg-red-500 text-white shadow-xs hover:bg-red-600",
        link:
          "text-brand-500 underline-offset-4 hover:underline dark:text-brand-400",
      },
      size: {
        sm:   "h-8  px-2.5 text-body-sm",
        md:   "h-9  px-3.5 text-body",
        lg:   "h-10 px-4   text-body",
        icon: "h-9  w-9",
      },
    },
    defaultVariants: {
      variant: "secondary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : "button"}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
