/** Simulated network delay: 300–800 ms */
export function delay(ms?: number): Promise<void> {
  const wait = ms ?? 300 + Math.random() * 500;
  return new Promise((r) => setTimeout(r, wait));
}

/** Scale a base integer value by a period multiplier */
export function scale(base: number, multiplier: number): number {
  return Math.round(base * multiplier);
}

/**
 * Merge class names, filtering falsy values.
 * Lightweight alternative to clsx for simple use-cases.
 */
export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}
