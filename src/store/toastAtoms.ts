import { atom } from "jotai";

// ── Types ─────────────────────────────────────────────────────────────────────

export type ToastType = "success" | "error" | "info" | "neutral";

export interface ToastAction {
  label: string;
  onClick: () => void;
  /** Optional icon shown before the action label */
  icon?: "undo" | "retry";
}

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  /** Auto-dismiss after this many ms. Default 4000. Pass 0 to disable. */
  duration: number;
  action?: ToastAction;
}

// ── Atom ──────────────────────────────────────────────────────────────────────

export const toastsAtom = atom<Toast[]>([]);
