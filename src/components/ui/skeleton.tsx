interface SkeletonProps {
  className?: string;
  rounded?:   "sm" | "md" | "lg" | "full";
}

const roundedMap = { sm: "rounded", md: "rounded-lg", lg: "rounded-xl", full: "rounded-full" };

export function Skeleton({ className = "", rounded = "md" }: SkeletonProps) {
  return (
    <div
      aria-hidden
      className={["animate-pulse bg-gray-100", roundedMap[rounded], className].join(" ")}
    />
  );
}
