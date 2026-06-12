"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";

type ToastProps = {
  type: "success" | "error";
  title: string;
  duration?: number;
  children?: ReactNode;
  onClose: () => void;
};

export default function Toast({ type, title, duration = 5000, children, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`
        fixed top-6 right-6 z-50
        max-w-sm rounded-2xl px-5 py-4
        shadow-lg text-sm
        ${
          type === "success"
            ? "bg-green-600 text-white"
            : "bg-red-600 text-white"
        }
      `}
    >
      <p className="font-semibold">{title}</p>

      {children && <div className="mt-2">{children}</div>}
    </div>
  );
}
