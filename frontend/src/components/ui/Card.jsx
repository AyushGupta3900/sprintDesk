import React from "react";
export default function Card({
  children,
  glass = false,
  className = "",
  ...props
}) {
  return (
    <div
      {...props}
      className={`rounded-2xl p-6 ${
        glass
          ? "bg-white/5 backdrop-blur-xl"
          : "border border-white/10"
      } ${className}`}
    >
      {children}
    </div>
  );
}
