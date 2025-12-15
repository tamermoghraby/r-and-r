"use client";

import {
  createContext,
  useContext,
  useCallback,
  useState,
  ReactNode,
} from "react";
import { X } from "lucide-react";

type ToastType = "success" | "error" | "info";

type Toast = {
  id: string;
  message: string;
  type: ToastType;
};

type ToastContextType = {
  success: (msg: string) => void;
  error: (msg: string) => void;
  info: (msg: string) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const remove = (id: string) => setToasts((t) => t.filter((x) => x.id !== id));

  const push = useCallback((message: string, type: ToastType) => {
    const id = crypto.randomUUID();

    setToasts((t) => [...t, { id, message, type }]);

    setTimeout(() => remove(id), 3000); // auto-dismiss
  }, []);

  const value: ToastContextType = {
    success: (msg) => push(msg, "success"),
    error: (msg) => push(msg, "error"),
    info: (msg) => push(msg, "info"),
  };

  return (
    <ToastContext.Provider value={value}>
      {children}

      {/* TOAST CONTAINER */}
      <div className="fixed bottom-6 right-6 z-50 space-y-3">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onClose={remove} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

/* ---------------- TOAST ITEM ---------------- */

function ToastItem({
  toast,
  onClose,
}: {
  toast: Toast;
  onClose: (id: string) => void;
}) {
  const styles = {
    success: "bg-green-600",
    error: "bg-red-600",
    info: "bg-gray-800",
  };

  return (
    <div
      className={`
        ${styles[toast.type]}
        text-white px-4 py-3 rounded-xl shadow-lg
        flex items-center gap-3
        animate-toast-in
      `}
    >
      <span className="text-sm">{toast.message}</span>

      <button
        onClick={() => onClose(toast.id)}
        className="opacity-70 hover:opacity-100 transition"
      >
        <X size={14} />
      </button>
    </div>
  );
}

/* ---------------- HOOK ---------------- */

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
}
