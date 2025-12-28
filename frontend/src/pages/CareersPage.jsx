import React from "react";

const CareersPage = () => {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-20">
      <div className="max-w-6xl mx-auto space-y-20">

        <section className="text-center space-y-6">
          <h1
            className="text-5xl md:text-6xl font-extrabold tracking-tight
                       bg-linear-to-b from-white to-white/60
                       text-transparent bg-clip-text"
          >
            Careers at SprintDesk
          </h1>

          <p className="max-w-3xl mx-auto text-lg text-white/70 leading-relaxed">
            We're building tools that help teams work with clarity and confidence.
            If you care about clean products, thoughtful UX, and meaningful impact —
            you'll feel right at home here.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Reason
            title="Build Real Impact"
            desc="Your work directly shapes how teams around the world plan, collaborate, and deliver."
          />
          <Reason
            title="Move Fast & Learn"
            desc="Small team, big ownership. You'll ship features end-to-end and grow quickly."
          />
          <Reason
            title="Remote-Friendly"
            desc="We believe great work happens anywhere. Work where you're most productive."
          />
        </section>

        <section className="text-center max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold">
            Our Culture
          </h2>

          <p className="text-white/60 leading-relaxed">
            At SprintDesk, we value clarity over chaos, quality over shortcuts,
            and people over processes. We trust each other, communicate openly,
            and care deeply about the craft.
          </p>

          <div className="flex flex-wrap justify-center gap-3 pt-4">
            {[
              "Ownership",
              "Transparency",
              "Focus",
              "Craftsmanship",
              "Growth",
            ].map((value) => (
              <span
                key={value}
                className="px-4 py-2 rounded-full text-sm
                           border border-white/20 text-white/70
                           hover:bg-white hover:text-black transition"
              >
                {value}
              </span>
            ))}
          </div>
        </section>

        <section className="text-center border-t border-white/10 pt-16">
          <h3 className="text-2xl font-semibold">
            Don't see a role that fits?
          </h3>
          <p className="mt-3 text-white/60">
            We're always happy to meet talented people.
            Send us your profile and tell us how you'd like to contribute.
          </p>
        </section>
      </div>
    </div>
  );
};

export default CareersPage;


function Reason({ title, desc }) {
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

function Role({ title, location, type }) {
  return (
    <div
      className="border border-white/10 rounded-2xl p-6
                 bg-white/[0.02]
                 hover:bg-white/[0.04]
                 hover:border-white/20 transition
                 flex flex-col justify-between"
    >
      <div>
        <h4 className="text-lg font-semibold text-white">
          {title}
        </h4>
        <p className="mt-2 text-sm text-white/60">
          {location} · {type}
        </p>
      </div>

      <span
        className="mt-6 self-start text-sm font-medium
                   text-white/70 hover:text-white transition cursor-pointer"
      >
        View role →
      </span>
    </div>
  );
}
