import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-md space-y-8"
      >
        <h1
          className="text-7xl md:text-8xl font-extrabold tracking-tight
                     bg-linear-to-b from-white to-white/50
                     text-transparent bg-clip-text"
        >
          404
        </h1>

        <h2 className="text-2xl md:text-3xl font-semibold">
          Page not found
        </h2>

        <p className="text-white/60 leading-relaxed">
          The page you’re looking for doesn’t exist, may have been moved,
          or is temporarily unavailable.
        </p>

        <div className="flex justify-center gap-4 pt-4 flex-wrap">
          <Link
            to="/"
            className="px-6 py-3 rounded-xl font-semibold
                       bg-white text-black
                       hover:scale-[1.04] transition"
          >
            Back to Home
          </Link>

          <Link
            to="/dashboard"
            className="px-6 py-3 rounded-xl font-semibold
                       border border-white/20 text-white
                       hover:bg-white/10 transition"
          >
            Go to Dashboard
          </Link>
        </div>

        <p className="pt-8 text-xs text-white/40">
          If you believe this is a mistake, please contact support.
        </p>
      </motion.div>
    </div>
  );
}
