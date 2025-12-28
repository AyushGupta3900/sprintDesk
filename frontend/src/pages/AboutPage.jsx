import React from "react";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-black text-white
                    flex items-center justify-center px-6 py-20">
      <div className="max-w-4xl text-center space-y-10">

        <h1
          className="text-5xl md:text-6xl font-extrabold tracking-tight
                    bg-linear-to-b from-white to-white/60
                     text-transparent bg-clip-text"
        >
          About SprintDesk
        </h1>

        <p className="text-lg md:text-xl text-white/70 leading-relaxed">
          <span className="font-semibold text-white">SprintDesk</span> is a modern
          workspace platform designed to help teams plan, execute, and deliver work
          with clarity and speed.
          <br />
          From <span className="font-medium text-white">projects</span> to
          <span className="font-medium text-white"> tasks</span> and
          <span className="font-medium text-white"> collaboration</span>,
          everything lives in one focused place.
        </p>

        <p className="text-white/60 leading-relaxed">
          Our mission is to make team productivity
          <span className="text-white font-semibold"> simple</span>,
          <span className="text-white font-semibold"> transparent</span>, and
          <span className="text-white font-semibold"> enjoyable</span>.
          SprintDesk removes clutter so teams can focus on what matters most —
          shipping meaningful work on time.
        </p>

        <div className="w-24 h-px mx-auto bg-white/20" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mt-8">
          <Value
            title="Clarity"
            desc="Every workspace, project, and task is designed to be easy to understand at a glance."
          />
          <Value
            title="Speed"
            desc="Minimal UI, fast interactions, and real-time updates keep teams moving forward."
          />
          <Value
            title="Control"
            desc="Roles, permissions, and structured workflows give teams full ownership."
          />
        </div>

        <div className="pt-8 text-sm text-white/40">
          Built with <span className="text-white">♥</span> for teams that care
          about focus, execution, and growth.
        </div>
      </div>
    </div>
  );
};

export default AboutPage;


function Value({ title, desc }) {
  return (
    <div
      className="border border-white/10 rounded-2xl p-6
                 bg-white/[0.02]
                 hover:bg-white/[0.04]
                 hover:border-white/20 transition"
    >
      <h3 className="text-lg font-semibold text-white">
        {title}
      </h3>
      <p className="mt-3 text-sm text-white/60 leading-relaxed">
        {desc}
      </p>
    </div>
  );
}
