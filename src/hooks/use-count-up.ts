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
        if (suffix === "M") return `AED ${(n / 1_000_000).toFixed(decimals)}M`;
        if (suffix === "K") return `AED ${Math.round(n / 1_000)}k`;
        return `AED ${Math.round(n).toLocaleString()}`;
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
  // prevValue lets us detect prop changes during render so we can reset the
  // display to "0" immediately without calling setState inside a useEffect body
  // (which the React compiler flags as a cascading-render risk).
  const [prevValue, setPrevValue] = useState(value);
  const [display,   setDisplay]   = useState(() => parseValue(value).format(0));
  const rafRef   = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  // React "adjust state during render" pattern (react.dev/learn/you-might-not-need-an-effect).
  // When value changes, React re-renders once with the zero display before the
  // animation effect even runs — no cascading useEffect → setState chain.
  if (prevValue !== value) {
    setPrevValue(value);
    setDisplay(parseValue(value).format(0));
  }

  useEffect(() => {
    const { raw, format } = parseValue(value);
    startRef.current = null;

    // All setState calls below are inside async callbacks (setTimeout / rAF),
    // so the React compiler sees no synchronous setState in the effect body.
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
          rafRef.current = null;
        }
      };

      rafRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(delayId);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [value, duration, delay]);

  return display;
}
