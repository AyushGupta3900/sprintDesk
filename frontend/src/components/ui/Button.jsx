import React from "react";
export default function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  ...props
}) {
  const base =
    "inline-flex items-center justify-center rounded-lg font-medium transition disabled:opacity-50";

  const variants = {
    primary: "bg-white text-black hover:bg-gray-200",
    outline: "border border-white/20 text-white hover:bg-white hover:text-black",
    danger: "bg-red-600 text-white hover:bg-red-700",
    ghost: "text-white/70 hover:text-white",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]}`}
      disabled={loading}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}
