import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "./auth.api";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [registerUser, { isLoading, error }] =
    useRegisterUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ name, email, password }).unwrap();
      navigate("/login", { replace: true });
    } catch {
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 relative">

      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 text-sm text-white/70 hover:text-white transition"
      >
        ← Back to home
      </button>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-10 space-y-6"
      >
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-black">
            SprintDesk
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Create your account
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full name
          </label>
          <input
            type="text"
            placeholder="Your name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-sm
                       focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-sm
                       focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-sm
                       focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
          />
        </div>

        {error && (
          <div className="text-sm text-black bg-gray-200 border border-gray-300 rounded-lg px-3 py-2">
            Registration failed. Try another email.
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-black text-white py-3 rounded-lg font-semibold tracking-wide
                     hover:bg-gray-900 transition disabled:opacity-60"
        >
          {isLoading ? "Creating account..." : "Create Account"}
        </button>

        <div className="text-center text-sm text-gray-500 pt-2">
          Already have an account?{" "}
          <span
            className="text-black font-medium cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Sign in
          </span>
        </div>
      </form>
    </div>
  );
}
