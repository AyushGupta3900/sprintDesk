import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative bg-black text-white border-t border-white/10">
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">

          <div className="space-y-5">
            <h2 className="text-2xl font-extrabold tracking-tight">
              SprintDesk
            </h2>

            <p className="text-sm text-white/60 leading-relaxed max-w-sm">
              A modern workspace to manage projects, tasks, and teams
              with clarity, focus, and speed.
            </p>

            <div className="flex items-center gap-4 pt-2">
              <ExternalLink href="https://twitter.com">Twitter</ExternalLink>
              <ExternalLink href="https://github.com">GitHub</ExternalLink>
              <ExternalLink href="https://linkedin.com">LinkedIn</ExternalLink>
            </div>
          </div>

          {/* PRODUCT */}
          <FooterColumn title="Product">
            <FooterLink to="/">Overview</FooterLink>
            <FooterLink to="/dashboard">Dashboard</FooterLink>
            <FooterLink to="/projects">Projects</FooterLink>
            <FooterLink to="/tasks">Tasks</FooterLink>
            <FooterLink to="/members">Members</FooterLink>
          </FooterColumn>

          {/* COMPANY */}
          <FooterColumn title="Company">
            <FooterLink to="/about">About</FooterLink>
            <FooterLink to="/careers">Careers</FooterLink>
          </FooterColumn>

          {/* LEGAL */}
          <FooterColumn title="Legal">
            <FooterLink to="/privacy">Privacy Policy</FooterLink>
            <FooterLink to="/terms">Terms of Service</FooterLink>
          </FooterColumn>
        </div>

        <div className="mt-14 border-t border-white/10" />

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/50">
          <p>
            © {new Date().getFullYear()} SprintDesk. All rights reserved.
          </p>

          <p className="text-xs text-white/40">
            Built for fast-moving teams 🚀
          </p>
        </div>
      </div>
    </footer>
  );
}


function FooterColumn({ title, children }) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-widest text-white/80">
        {title}
      </h3>

      <div className="mt-5 space-y-3 text-sm">
        {children}
      </div>
    </div>
  );
}

function FooterLink({ to, children }) {
  return (
    <Link
      to={to}
      className="block text-white/60 hover:text-white transition
                 hover:translate-x-1 duration-200"
    >
      {children}
    </Link>
  );
}

function ExternalLink({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm text-white/60 hover:text-white transition"
    >
      {children}
    </a>
  );
}
