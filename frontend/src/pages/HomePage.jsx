import React from "react";
import Navbar from "../components/ui/Navbar";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <section className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <h1 className="text-5xl font-extrabold leading-tight max-w-3xl">
            Welcome to <span className="text-gray-300">SprintDesk</span>
          </h1>
          <p className="mt-6 text-lg text-gray-400 max-w-2xl">
            Organize workspaces, manage projects, and track tasks —
            all in one focused productivity system.
          </p>

          <div className="mt-10 flex gap-4 flex-wrap">
            <button className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition">
              Create Workspace
            </button>
            <button className="border border-white/20 px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-black transition">
              View Projects
            </button>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-20 space-y-20">

        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <StatCard label="Active Workspaces" value="3" />
          <StatCard label="Projects" value="12" />
          <StatCard label="Open Tasks" value="48" />
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-10">
            What you can do
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon="🗂"
              title="Workspaces"
              desc="Isolated team spaces with roles and permissions."
            />
            <FeatureCard
              icon="📌"
              title="Projects"
              desc="Plan, track, and analyze work effortlessly."
            />
            <FeatureCard
              icon="✅"
              title="Tasks"
              desc="Assign, prioritize, and complete with clarity."
            />
          </div>
        </section>

        <section className="border border-white/10 rounded-2xl p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold">
              Ready to move faster?
            </h3>
            <p className="text-gray-400 mt-2">
              Start organizing your work in minutes with SprintDesk.
            </p>
          </div>

          <button className="bg-white text-black px-8 py-4 rounded-xl font-semibold hover:bg-gray-200 transition">
            Get Started
          </button>
        </section>

      </main>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="border border-white/10 rounded-2xl p-8 text-center">
      <p className="text-sm text-gray-400">{label}</p>
      <p className="mt-3 text-4xl font-extrabold text-white">
        {value}
      </p>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="border border-white/10 rounded-2xl p-8 hover:bg-white hover:text-black transition">
      <div className="text-4xl">{icon}</div>
      <h3 className="mt-4 text-xl font-semibold">
        {title}
      </h3>
      <p className="mt-2 text-gray-400">
        {desc}
      </p>
    </div>
  );
}
