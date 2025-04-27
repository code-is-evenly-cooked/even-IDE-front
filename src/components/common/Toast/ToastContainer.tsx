"use client";

import { useToastStore } from "@/stores/useToastStore";
import { useEffect } from "react";

export default function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  useEffect(() => {
    if (toasts.length === 0) return;
    const timer = setTimeout(() => {
      removeToast(toasts[0].id);
    }, 3000); // 토스트 팝업 등장 시간
    return () => clearTimeout(timer);
  }, [toasts, removeToast]);

  return (
    <div className="fixed top-12 left-1/2 transform -translate-x-1/2 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`px-4 py-2 rounded shadow-md text-white ${
            toast.type === "error" ? "bg-red-500" : toast.type === "success" ? "bg-green-500" : "bg-gray-700"
          }`}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}