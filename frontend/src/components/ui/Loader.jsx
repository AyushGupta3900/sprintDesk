import React from "react";

export default function Loader({ text = "Loading..." }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      
      <div className="relative w-14 h-14">
        <div className="absolute inset-0 rounded-full border-4 border-white/20"></div>
        <div className="absolute inset-0 rounded-full border-4 border-white border-t-transparent animate-spin"></div>
      </div>

      <p className="mt-6 text-sm tracking-wide text-white/70">
        {text}
      </p>
    </div>
  );
}
