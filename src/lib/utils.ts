import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge & deduplicate Tailwind classes — powered by clsx + tailwind-merge. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** Simulated network delay: 300–800 ms */
export function delay(ms?: number): Promise<void> {
  const wait = ms ?? 300 + Math.random() * 500;
  return new Promise((r) => setTimeout(r, wait));
}

/** Scale a base integer value by a period multiplier */
export function scale(base: number, multiplier: number): number {
  return Math.round(base * multiplier);
}
