interface ProgressProps {
  /** 0-100 */
  value:          number;
  className?:     string;
  barClassName?:  string;
}

export function Progress({ value, className = "", barClassName = "" }: ProgressProps) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div className={["h-1.5 w-full overflow-hidden rounded-full bg-gray-100", className].join(" ")}>
      <div
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        className={[
          "h-full rounded-full transition-all duration-500",
          barClassName || "bg-brand-500",
        ].join(" ")}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
