"use client";

import { useCallback } from "react";
import { useSetAtom } from "jotai";
import {
  toastsAtom,
  type Toast,
  type ToastType,
  type ToastAction,
} from "@/store/toastAtoms";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ToastOptions {
  type?: ToastType;
  message?: string;
  /** Auto-dismiss delay in ms. Defaults to 4000. Pass 0 to disable. */
  duration?: number;
  action?: ToastAction;
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useToast() {
  const setToasts = useSetAtom(toastsAtom);

  const dismiss = useCallback(
    (id: string) => setToasts((prev) => prev.filter((t) => t.id !== id)),
    [setToasts],
  );

  const toast = useCallback(
    (title: string, opts: ToastOptions = {}): string => {
      const id = crypto.randomUUID();
      const entry: Toast = {
        id,
        type:     opts.type     ?? "neutral",
        title,
        message:  opts.message,
        duration: opts.duration ?? 4000,
        action:   opts.action,
      };
      setToasts((prev) => [...prev, entry]);
      return id;
    },
    [setToasts],
  );

  // ── Shorthand helpers ──────────────────────────────────────────────────────

  const success = useCallback(
    (title: string, opts?: Omit<ToastOptions, "type">) =>
      toast(title, { ...opts, type: "success" }),
    [toast],
  );

  const error = useCallback(
    (title: string, opts?: Omit<ToastOptions, "type">) =>
      toast(title, { ...opts, type: "error" }),
    [toast],
  );

  const info = useCallback(
    (title: string, opts?: Omit<ToastOptions, "type">) =>
      toast(title, { ...opts, type: "info" }),
    [toast],
  );

  const neutral = useCallback(
    (title: string, opts?: Omit<ToastOptions, "type">) =>
      toast(title, { ...opts, type: "neutral" }),
    [toast],
  );

  return { toast, success, error, info, neutral, dismiss };
}
