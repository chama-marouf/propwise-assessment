"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { toastsAtom, type Toast, type ToastType } from "@/store/toastAtoms";

// ── Icons ─────────────────────────────────────────────────────────────────────

function IconCircle() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
      <circle cx="7.5" cy="7.5" r="5.75" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="7.5" cy="7.5" r="2.25" fill="currentColor" />
    </svg>
  );
}

function IconCheckCircle() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
      <circle cx="7.5" cy="7.5" r="5.75" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4.5 7.5L6.5 9.5L10.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconInfoCircle() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
      <circle cx="7.5" cy="7.5" r="5.75" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7.5 7V10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="7.5" cy="5" r="0.875" fill="currentColor" />
    </svg>
  );
}

function IconErrorCircle() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
      <circle cx="7.5" cy="7.5" r="5.75" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 5L10 10M10 5L5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconClose() {
  return (
    <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden>
      <path d="M1 1L8 8M8 1L1 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconUndo() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
      <path d="M2.5 4.5H9C10.1 4.5 11 5.4 11 6.5S10.1 8.5 9 8.5H6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4.5 2.5L2.5 4.5L4.5 6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconRetry() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
      <path d="M1.5 6.5a5 5 0 1 0 .88-2.87" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M1.5 1.5v3.5h3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Type config ───────────────────────────────────────────────────────────────

const ACTION_ICONS = { undo: IconUndo, retry: IconRetry } as const;

type Cfg = {
  wrapper: string;
  text:    string;
  icon:    string;
  divider: string;
  action:  string;
  close:   string;
  Icon:    () => React.JSX.Element;
};

const TYPE_CONFIG: Record<ToastType, Cfg> = {
  neutral: {
    wrapper: "bg-gray-900",
    text:    "text-white",
    icon:    "text-gray-400",
    divider: "bg-white/20",
    action:  "text-gray-300 hover:text-white",
    close:   "text-gray-500 hover:text-white",
    Icon:    IconCircle,
  },
  success: {
    wrapper: "bg-gray-900",
    text:    "text-white",
    icon:    "text-green-400",
    divider: "bg-white/20",
    action:  "text-gray-300 hover:text-white",
    close:   "text-gray-500 hover:text-white",
    Icon:    IconCheckCircle,
  },
  info: {
    wrapper: "bg-gray-900",
    text:    "text-white",
    icon:    "text-blue-400",
    divider: "bg-white/20",
    action:  "text-gray-300 hover:text-white",
    close:   "text-gray-500 hover:text-white",
    Icon:    IconInfoCircle,
  },
  error: {
    wrapper: "bg-red-50 border border-red-200",
    text:    "text-red-700",
    icon:    "text-red-500",
    divider: "bg-red-200",
    action:  "text-red-600 hover:text-red-800",
    close:   "text-red-400 hover:text-red-600",
    Icon:    IconErrorCircle,
  },
};

// ── ToastItem ─────────────────────────────────────────────────────────────────

interface ToastItemProps {
  toast:     Toast;
  onDismiss: (id: string) => void;
}

function ToastItem({ toast, onDismiss }: ToastItemProps) {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const cfg        = TYPE_CONFIG[toast.type];
  const ActionIcon = toast.action?.icon ? ACTION_ICONS[toast.action.icon] : null;

  // ── Enter: double-RAF so initial class paints before transition fires ──
  useEffect(() => {
    const outer = requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true));
    });
    return () => cancelAnimationFrame(outer);
  }, []);

  // ── Dismiss ──────────────────────────────────────────────────────────────
  const dismiss = useCallback(() => {
    if (exiting) return;
    clearTimeout(timerRef.current);
    setExiting(true);
    setTimeout(() => onDismiss(toast.id), 300);
  }, [exiting, toast.id, onDismiss]);

  // ── Auto-dismiss ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (!toast.duration) return;
    timerRef.current = setTimeout(dismiss, toast.duration);
    return () => clearTimeout(timerRef.current);
  }, [dismiss, toast.duration]);

  const motionCls =
    visible && !exiting
      ? "translate-x-0 opacity-100"
      : "translate-x-full opacity-0";

  return (
    <div
      role="status"
      aria-live="polite"
      className={[
        "flex items-center gap-2 rounded-2xl px-3 py-2",
        "text-body-sm font-medium whitespace-nowrap",
        "transition-all duration-300 ease-out",
        cfg.wrapper,
        motionCls,
      ].join(" ")}
    >
      {/* ── Type icon ── */}
      <span className={cfg.icon}>
        <cfg.Icon />
      </span>

      {/* ── Message ── */}
      <span className={cfg.text}>{toast.title}</span>

      {/* ── Optional action (with divider) ── */}
      {toast.action && (
        <>
          <span aria-hidden className={["w-px h-4 shrink-0", cfg.divider].join(" ")} />
          <button
            type="button"
            onClick={() => { toast.action!.onClick(); dismiss(); }}
            className={[
              "flex items-center gap-1 transition-colors font-medium",
              cfg.action,
            ].join(" ")}
          >
            {ActionIcon && <span aria-hidden><ActionIcon /></span>}
            {toast.action.label}
          </button>
        </>
      )}

      {/* ── Close ── */}
      <button
        type="button"
        aria-label="Dismiss"
        onClick={dismiss}
        className={["flex items-center justify-center ml-0.5 transition-colors", cfg.close].join(" ")}
      >
        <IconClose />
      </button>
    </div>
  );
}

// ── Toaster ───────────────────────────────────────────────────────────────────

export function Toaster() {
  const toasts    = useAtomValue(toastsAtom);
  const setToasts = useSetAtom(toastsAtom);

  const dismiss = useCallback(
    (id: string) => setToasts((prev) => prev.filter((t) => t.id !== id)),
    [setToasts],
  );

  if (toasts.length === 0) return null;

  return (
    <div
      aria-label="Notifications"
      className="pointer-events-none fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2"
    >
      {toasts.map((t) => (
        <div key={t.id} className="pointer-events-auto">
          <ToastItem toast={t} onDismiss={dismiss} />
        </div>
      ))}
    </div>
  );
}
