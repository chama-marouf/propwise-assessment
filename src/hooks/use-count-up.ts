"use client";

import { useEffect, useRef, useState } from "react";

// ── Easing ────────────────────────────────────────────────────────────────────

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

// ── Value parser / formatter ───────────────────────────────────────────────────
//
//  Supports formats produced by mock-api.ts:
//    "$211k"  "$1.4M"  "AED 1.42M"  "AED 690K"  "71"  "32"  "10"
//
//  Returns { raw: number; format: (n: number) => string }

type Parsed = { raw: number; format: (n: number) => string };

export function parseValue(value: string): Parsed {
  const v = value.trim();

  // AED prefix (e.g. "AED 1.42M", "AED 690K")
  const aedMatch = v.match(/^AED\s+([\d.]+)([KkMm]?)$/);
  if (aedMatch) {
    const num       = parseFloat(aedMatch[1]);
    const suffix    = aedMatch[2].toUpperCase();
    const multiplier = suffix === "M" ? 1_000_000 : suffix === "K" ? 1_000 : 1;
    const raw       = num * multiplier;
    return {
      raw,
      format: (n) => {
        if (suffix === "M") return `AED ${(n / 1_000_000).toFixed(2)}M`;
        if (suffix === "K") return `AED ${Math.round(n / 1_000)}K`;
        return `AED ${Math.round(n).toLocaleString()}`;
      },
    };
  }

  // $ prefix (e.g. "$1.4M", "$211k", "$10.3M")
  const dollarMatch = v.match(/^\$([\d.]+)([KkMm]?)$/);
  if (dollarMatch) {
    const num        = parseFloat(dollarMatch[1]);
    const suffix     = dollarMatch[2].toUpperCase();
    const multiplier = suffix === "M" ? 1_000_000 : suffix === "K" ? 1_000 : 1;
    const raw        = num * multiplier;
    const decimals   = dollarMatch[1].includes(".") ? dollarMatch[1].split(".")[1].length : 0;
    return {
      raw,
      format: (n) => {
        if (suffix === "M") return `$${(n / 1_000_000).toFixed(decimals)}M`;
        if (suffix === "K") return `$${Math.round(n / 1_000)}k`;
        return `$${Math.round(n).toLocaleString()}`;
      },
    };
  }

  // Plain integer (e.g. "71", "32")
  const plain = parseFloat(v.replace(/,/g, ""));
  if (!isNaN(plain)) {
    return {
      raw:    plain,
      format: (n) => Math.round(n).toLocaleString(),
    };
  }

  // Fallback — return as-is
  return { raw: 0, format: () => value };
}

// ── Hook ──────────────────────────────────────────────────────────────────────

interface UseCountUpOptions {
  value:    string;
  duration?: number; // ms, default 1000
  delay?:   number;  // ms before starting, default 0
}

export function useCountUp({ value, duration = 1000, delay = 0 }: UseCountUpOptions): string {
  const { raw, format } = parseValue(value);
  const [display, setDisplay] = useState(() => format(0));
  const rafRef   = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    // Reset to 0 whenever value changes
    setDisplay(format(0));
    startRef.current = null;

    const delayId = setTimeout(() => {
      const animate = (now: number) => {
        if (startRef.current === null) startRef.current = now;
        const elapsed  = now - startRef.current;
        const progress = Math.min(elapsed / duration, 1);
        const eased    = easeOutExpo(progress);

        setDisplay(format(eased * raw));

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(animate);
        } else {
          setDisplay(format(raw)); // snap to exact final value
        }
      };

      rafRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(delayId);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  // Re-run when the raw numeric value or duration changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration, delay]);

  return display;
}
