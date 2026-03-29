import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2 py-0.5 text-caption font-semibold leading-none",
  {
    variants: {
      variant: {
        default: "bg-gray-100  text-gray-600  dark:bg-stone-700 dark:text-stone-300",
        brand:   "bg-brand-50  text-brand-600 dark:bg-brand-900  dark:text-brand-300",
        success: "bg-green-50  text-green-700 dark:bg-green-900  dark:text-green-300",
        warning: "bg-orange-50 text-orange-600 dark:bg-orange-900 dark:text-orange-300",
        danger:  "bg-red-50    text-red-600   dark:bg-red-900    dark:text-red-300",
        info:    "bg-blue-50   text-blue-600  dark:bg-blue-900   dark:text-blue-300",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
