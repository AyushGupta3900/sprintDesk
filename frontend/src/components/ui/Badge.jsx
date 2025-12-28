import React from "react";
export default function Badge({ children, variant = "default" }) {
  const styles = {
    default: "bg-white/10 text-white",
    success: "bg-green-500/20 text-green-400",
    warning: "bg-yellow-500/20 text-yellow-400",
    danger: "bg-red-500/20 text-red-400",
  };

  return (
    <span
      className={`px-2 py-1 text-xs rounded-full ${styles[variant]}`}
    >
      {children}
    </span>
  );
}
