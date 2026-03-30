/**
 * Chart colour tokens — single source of truth for all Recharts colours.
 *
 * Recharts renders SVG, and SVG attributes accept CSS custom-property syntax
 * (var(--…)) natively in all modern browsers.  By pointing here we stay
 * automatically in sync with @theme changes in globals.css — no hardcoded hex
 * values scattered across component files.
 *
 * Token → globals.css @theme mapping:
 *   brandPrimary   → --color-brand-500   (#4f6bf4)
 *   brandSecondary → --color-brand-300   (#93acff)
 *   brandDark      → --color-brand-800   (#1e2c83)  high-contrast filled bars
 *   axisTick       → --color-text-muted             muted axis labels
 *   gridLine       → --color-border                 light grid lines (both modes)
 */

export const CHART_COLORS = {
  brandPrimary:   "var(--color-brand-500)",
  brandSecondary: "var(--color-brand-300)",
  brandDark:      "var(--color-brand-800)",
  axisTick:       "var(--color-text-muted)",
  gridLine:       "var(--color-border)",
} as const;

/**
 * Spark-line colours keyed by trend direction.
 * Used by SparklineChart — one entry per possible TrendDirection value.
 */
export const SPARK_COLORS = {
  up:   { stroke: "var(--color-brand-500)" },
  down: { stroke: "var(--color-red-500)"   },
  flat: { stroke: "var(--color-gray-400)"  },
} as const;
