import React, { createContext, useContext, useState } from "react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = ({ type = "info", message }) => {
    const id = crypto.randomUUID();

    setToasts((prev) => [...prev, { id, type, message }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}

      <div className="fixed top-4 right-4 z-[9999] space-y-3">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} {...toast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}

function ToastItem({ type, message }) {
  const styles = {
    success: "bg-emerald-500/90",
    error: "bg-red-500/90",
    info: "bg-white/90 text-black",
  };

  return (
    <div
      className={`px-4 py-3 rounded-lg shadow-lg text-sm font-medium text-white animate-slide-in ${styles[type]}`}
    >
      {message}
    </div>
  );
}
