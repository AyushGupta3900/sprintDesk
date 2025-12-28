import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";


import workspaceIcon from "../assets/workspace.png";
import projectIcon from "../assets/project.png";
import taskIcon from "../assets/task.png";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">

      <section className="relative">
        {/* Glow */}
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute -top-50 left-1/2 -translate-x-1/2
                       w-175 h-175 bg-white/10 blur-[120px] rounded-full"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-7xl mx-auto px-6 py-32 text-center"
        >
          <span
            className="inline-block mb-6 px-4 py-1 text-xs uppercase tracking-widest
                       border border-white/20 rounded-full text-white/60"
          >
            Project & Task Management
          </span>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight">
            Organize work.
            <br />
            <span className="text-white/50">Execute faster.</span>
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-lg text-white/60">
            SprintDesk helps modern teams plan projects, assign tasks,
            and collaborate clearly—without noise.
          </p>

          <div className="mt-12 flex justify-center gap-4 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate("/register")}
              className="bg-white text-black px-8 py-4 rounded-xl
                         font-semibold shadow-lg"
            >
              Get Started Free
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate("/login")}
              className="border border-white/30 px-8 py-4 rounded-xl
                         font-semibold text-white hover:bg-white/10 transition"
            >
              Sign In
            </motion.button>
          </div>
        </motion.div>
      </section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.15 }}
        className="max-w-7xl mx-auto px-6 py-28 grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        <Feature
          icon={workspaceIcon}
          title="Workspaces"
          desc="Isolated team spaces with roles, permissions, and clarity."
        />

        <Feature
          icon={projectIcon}
          title="Projects"
          desc="Plan initiatives, track progress, and stay aligned."
        />

        <Feature
          icon={taskIcon}
          title="Tasks"
          desc="Priorities, assignees, due dates, and real-time updates."
        />
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative py-28 text-center"
      >
        <div className="absolute inset-0 -z-10 bg-linear-to-t from-white/5 to-transparent" />

        <h2 className="text-4xl font-bold tracking-tight">
          Build with clarity.
        </h2>

        <p className="mt-4 text-white/60 max-w-xl mx-auto">
          SprintDesk is built for teams that value focus,
          speed, and clean execution.
        </p>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => navigate("/register")}
          className="mt-10 bg-white text-black px-12 py-4 rounded-xl font-semibold"
        >
          Create Your Workspace
        </motion.button>
      </motion.section>

    </div>
  );
}


function Feature({ icon, title, desc }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.6 }}
      className="group border border-white/10 rounded-2xl p-8
                 hover:border-white/20 hover:bg-white/5
                 transition"
    >
      <div className="mb-4">
        <img
          src={icon}
          alt={title}
          className="w-10 h-10 object-contain opacity-80
                     group-hover:opacity-100 transition"
        />
      </div>

      <h3 className="text-xl font-semibold">{title}</h3>

      <p className="mt-3 text-white/60 leading-relaxed">
        {desc}
      </p>
    </motion.div>
  );
}
