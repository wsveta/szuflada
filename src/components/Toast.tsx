"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";

type ToastProps = {
  type: "success" | "error";
  title: string;
  children?: ReactNode;
  onClose: () => void;
};

export default function Toast({ type, title, children, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

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
