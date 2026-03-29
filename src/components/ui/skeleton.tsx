import * as React from "react";
import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden
      className={cn("animate-pulse rounded-lg bg-gray-100 dark:bg-stone-800", className)}
      {...props}
    />
  );
}

export { Skeleton };
