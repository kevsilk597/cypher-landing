"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const signals = [
  {
    signal: "Referee foul call rate drops 22% over three games.",
    body: "Cross-referenced with upcoming schedule, a star player's free throw dependence, and a contract incentive clause tied to a stat threshold. Three databases. One connection. Six days before the story breaks.",
  },
  {
    signal: "Coaching staff runs 14% more zone coverage in practice.",
    body: "Layered with a defensive coordinator's hiring patterns and a rival team's waiver wire activity. Three threads converge: a scheme change is coming. Nobody's reporting it. The data already knows.",
  },
  {
    signal: "Player stops posting after wins. Press conference answers 40% shorter.",
    body: "Combined with team travel schedule, front office meeting pattern, and a trade exception deadline three weeks out. The connection emerges slowly — then all at once.",
  },
];

export default function SignalSection() {
  return (
    <section className="relative px-6 py-24 md:py-32 max-w-4xl mx-auto">
      {/* Subtle layered depth texture in background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(184,149,42,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(184,149,42,0.6) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(184,149,42,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(184,149,42,0.4) 1px, transparent 1px)",
            backgroundSize: "96px 96px",
          }}
        />
      </div>

      <div className="relative">
        <ScrollReveal>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-center mb-4 leading-tight">
            We&apos;re tracking what nobody thinks matters.
            <br />
            <span className="text-text-secondary">Until it does.</span>
          </h2>
          <p className="text-center text-sm text-text-muted mb-16 max-w-xs mx-auto tracking-wide">
            Here&apos;s what Cipher actually does.
          </p>
        </ScrollReveal>

        {/* SIGNAL cards */}
        <div className="flex flex-col gap-4">
          {signals.map((s, i) => (
            <ScrollReveal key={i} delay={i * 0.13}>
              <motion.div
                className="rounded-xl p-7 relative overflow-hidden group"
                style={{
                  background:
                    "linear-gradient(135deg, #1C1C1C 0%, #161616 60%, #131313 100%)",
                  borderLeft: "3px solid #B8952A",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
                }}
                whileHover={{ x: 2 }}
                transition={{ duration: 0.2 }}
              >
                {/* Subtle glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at 0% 50%, rgba(184,149,42,0.04) 0%, transparent 70%)",
                  }}
                />
                {/* Micro-grid texture on card */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-[0.03]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(184,149,42,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(184,149,42,0.5) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                />
                <div className="relative">
                  <p
                    className="text-[10px] font-semibold uppercase tracking-[0.18em] mb-3 flex items-center gap-2"
                    style={{
                      color: "#B8952A",
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    <span
                      className="w-1 h-1 rounded-full flex-shrink-0"
                      style={{
                        background: "#B8952A",
                        boxShadow: "0 0 6px rgba(184,149,42,0.7)",
                      }}
                    />
                    Signal
                  </p>
                  <p className="text-[16px] md:text-[17px] font-semibold text-foreground mb-4 leading-snug">
                    {s.signal}
                  </p>
                  <p
                    className="text-[14px] leading-[1.75]"
                    style={{ color: "#A0A0A0" }}
                  >
                    {s.body}
                  </p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Kicker line */}
        <ScrollReveal className="mt-14 text-center max-w-2xl mx-auto">
          <p
            className="text-[15px] md:text-[17px] font-semibold leading-relaxed"
            style={{ color: "#D4B245" }}
          >
            These aren&apos;t predictions. They&apos;re patterns that already
            exist — hidden in data no one thought to connect.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
