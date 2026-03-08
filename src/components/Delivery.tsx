"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const alertCards = [
  {
    title: "Celtics Trade Window: 8 Converging Signals",
    badge: "CRITICAL",
    badgeColor: "#B8952A",
  },
  {
    title: "Chiefs Scheme Change Detected via Practice Data",
    badge: "PATTERN MATCH",
    badgeColor: "#B8952A",
  },
  {
    title: "Referee Assignment Pattern → Free Throw Impact",
    badge: "CROSS-REF",
    badgeColor: "#B8952A",
  },
];

const features = [
  {
    title: "Morning Brief.",
    body: "Six things that change your day. Not 200 alerts you'll never read. Built around your beats, your entities, your priorities. Context attached. Ready at 5 AM.",
    icon: "◎",
  },
  {
    title: "Real-Time Alerts.",
    body: "When a pattern crosses the threshold — the trade signal, the injury correlation, the connection that just clicked — it lands immediately. Some things don't wait for morning.",
    icon: "⚡",
  },
  {
    title: "Story Arc Tracking.",
    body: "Monday you flagged a stat. Wednesday something shifted. Friday the original take missed a wrinkle. Cipher tracks the evolution — so you don't just break a story, you own it all week.",
    icon: "↗",
  },
  {
    title: "Cross-League Intelligence.",
    body: "NBA producers don't watch hockey. NFL researchers don't follow baseball closely. Cipher does. Coaching patterns, contract structures, analytics trends — connections across five leagues that no single human can maintain.",
    icon: "⬡",
  },
];

const dataSources = [
  { label: "Contract Filings", x: 14, y: 15 },
  { label: "Twitter/X", x: 68, y: 12 },
  { label: "ESPN", x: 78, y: 48 },
  { label: "Game Film", x: 65, y: 72 },
  { label: "Injury Maps", x: 18, y: 68 },
  { label: "AP Wire", x: 8, y: 45 },
  { label: "Press Conferences", x: 32, y: 8 },
  { label: "Box Scores", x: 48, y: 80 },
];

// Constellation SVG connections — each connects a source to center
const CENTER_X = 200;
const CENTER_Y = 160;
const nodePositions = [
  { x: 56, y: 48 },   // Contract Filings
  { x: 272, y: 38 },   // Twitter/X
  { x: 312, y: 153 },  // ESPN
  { x: 260, y: 230 },  // Game Film
  { x: 72, y: 218 },   // Injury Maps
  { x: 32, y: 144 },   // AP Wire
  { x: 128, y: 26 },   // Press Conferences
  { x: 192, y: 256 },  // Box Scores
];

export default function Delivery() {
  return (
    <section className="px-6 py-24 md:py-32 max-w-6xl mx-auto">
      <ScrollReveal>
        <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-center mb-4 leading-tight">
          Intelligence on your terms.
          <br />
          <span className="text-text-secondary">
            Tailored to your beats. Always current.
          </span>
        </h2>
        <p className="text-center text-sm text-text-muted mb-16 max-w-lg mx-auto">
          From raw data to your morning read — everything filtered, connected, and prioritized.
        </p>
      </ScrollReveal>

      {/* Constellation + Alert Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
        {/* Left: Data source constellation */}
        <ScrollReveal>
          <div
            className="relative rounded-2xl h-80 overflow-hidden"
            style={{
              background:
                "radial-gradient(ellipse at 50% 50%, #181818 0%, #131313 50%, #0E0E0E 100%)",
              border: "1px solid rgba(184,149,42,0.06)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
            }}
          >
            {/* SVG constellation lines */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 400 320"
            >
              <defs>
                <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#B8952A" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#B8952A" stopOpacity="0" />
                </radialGradient>
                <filter id="constellationGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
                </filter>
              </defs>

              {/* Radial glow at center */}
              <circle cx={CENTER_X} cy={CENTER_Y} r="50" fill="url(#centerGlow)" />

              {/* Connecting lines */}
              {nodePositions.map((node, i) => (
                <motion.path
                  key={`line-${i}`}
                  d={`M ${node.x} ${node.y} L ${CENTER_X} ${CENTER_Y}`}
                  stroke="#B8952A"
                  strokeWidth="0.5"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.15 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.15 + i * 0.08 }}
                />
              ))}

              {/* Secondary connecting lines between nearby nodes */}
              {[
                [0, 6],
                [1, 2],
                [3, 7],
                [4, 5],
                [6, 1],
              ].map(([a, b], i) => (
                <motion.path
                  key={`sec-${i}`}
                  d={`M ${nodePositions[a].x} ${nodePositions[a].y} L ${nodePositions[b].x} ${nodePositions[b].y}`}
                  stroke="#B8952A"
                  strokeWidth="0.3"
                  fill="none"
                  strokeDasharray="4 8"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.06 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 1 + i * 0.1 }}
                />
              ))}

              {/* Node dots */}
              {nodePositions.map((node, i) => (
                <motion.circle
                  key={`dot-${i}`}
                  cx={node.x}
                  cy={node.y}
                  r={3}
                  fill="#B8952A"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.35 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.06 }}
                />
              ))}

              {/* Center node */}
              <motion.circle
                cx={CENTER_X}
                cy={CENTER_Y}
                r={5}
                fill="#B8952A"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.5 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8 }}
              />
              {/* Pulse ring */}
              <circle
                cx={CENTER_X}
                cy={CENTER_Y}
                r={14}
                fill="none"
                stroke="#B8952A"
                strokeWidth="0.5"
                opacity="0.12"
              />
            </svg>

            {/* Data source labels */}
            {dataSources.map((source, i) => (
              <motion.span
                key={source.label}
                className="absolute flex items-center gap-1.5 whitespace-nowrap"
                style={{ left: `${source.x}%`, top: `${source.y}%` }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.06 }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: "rgba(184,149,42,0.4)" }}
                />
                <span
                  className="text-[10px] text-foreground/35"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    letterSpacing: "0.02em",
                  }}
                >
                  {source.label}
                </span>
              </motion.span>
            ))}
          </div>
        </ScrollReveal>

        {/* Right: Alert Cards */}
        <div className="flex flex-col gap-3 justify-center">
          {alertCards.map((card, i) => (
            <ScrollReveal key={card.title} delay={i * 0.1}>
              <div
                className="rounded-xl p-5 relative overflow-hidden group transition-all duration-300"
                style={{
                  background:
                    "linear-gradient(135deg, #1A1A1A 0%, #171717 100%)",
                  borderLeft: "3px solid #B8952A",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                }}
              >
                {/* Subtle hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at 0% 50%, rgba(184,149,42,0.04) 0%, transparent 70%)",
                  }}
                />
                <div className="flex items-center justify-between relative">
                  <p className="text-sm font-semibold text-foreground pr-4">
                    {card.title}
                  </p>
                  <span
                    className="flex-shrink-0 text-[8px] font-semibold uppercase tracking-[0.12em] px-2 py-0.5 rounded-full"
                    style={{
                      color: card.badgeColor,
                      border: `1px solid rgba(184,149,42,0.2)`,
                      fontFamily: "'JetBrains Mono', monospace",
                      background: "rgba(184,149,42,0.06)",
                    }}
                  >
                    {card.badge}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Four Feature Blocks — with subtle gold accent */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
        {features.map((f, i) => (
          <ScrollReveal key={f.title} delay={i * 0.08}>
            <div
              className="p-6 rounded-xl transition-all duration-300"
              style={{
                background: "rgba(26,26,26,0.4)",
                border: "1px solid rgba(42,42,42,0.3)",
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="text-lg"
                  style={{
                    color: "rgba(184,149,42,0.5)",
                    fontFamily: "system-ui",
                  }}
                >
                  {f.icon}
                </span>
                <h3 className="font-serif text-lg font-bold text-foreground">
                  {f.title}
                </h3>
              </div>
              <p className="text-[14.5px] text-text-secondary leading-[1.7]">
                {f.body}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Phone Mockup + Stats */}
      <div className="flex flex-col lg:flex-row gap-12 items-center mt-4">
        {/* Left: Stats + closing */}
        <ScrollReveal className="lg:w-1/2">
          <p
            className="text-[11px] uppercase tracking-[0.15em] mb-6"
            style={{
              color: "rgba(184,149,42,0.4)",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            What a typical night looks like
          </p>
          <div className="flex gap-8 mb-8">
            {[
              { num: "14", label: "games monitored" },
              { num: "2,847", label: "data points" },
              { num: "8", label: "insights surfaced" },
            ].map((stat) => (
              <div key={stat.label}>
                <p
                  className="text-2xl font-bold mb-1"
                  style={{
                    color: "#D4B245",
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  {stat.num}
                </p>
                <p className="text-[11px] text-text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
          <p className="text-lg font-semibold text-foreground leading-snug">
            Open Cipher. Six things you need to know.
            <br />
            <span className="text-text-secondary">Nothing you don&apos;t.</span>
          </p>
        </ScrollReveal>

        {/* Right: Phone mockup */}
        <ScrollReveal className="lg:w-1/2 flex justify-center" delay={0.15}>
          <div className="relative">
            {/* Atmospheric glow behind phone */}
            <div
              className="absolute -inset-12 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 50%, rgba(184,149,42,0.04) 0%, transparent 70%)",
              }}
            />

            <motion.div
              className="relative"
              style={{
                width: "270px",
                filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.8))",
              }}
              animate={{ y: [0, -3, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Phone frame */}
              <div
                className="rounded-[40px] overflow-hidden"
                style={{
                  background: "#0A0A0A",
                  border: "1px solid rgba(184,149,42,0.15)",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.03), 0 0 0 1px rgba(0,0,0,0.5)",
                }}
              >
                {/* Notch area */}
                <div
                  className="flex justify-between items-center px-6 pt-3 pb-1"
                  style={{ background: "#0A0A0A" }}
                >
                  <span
                    className="text-[11px] font-semibold text-foreground/70"
                    style={{ fontFamily: "system-ui" }}
                  >
                    9:41
                  </span>
                  <div className="flex gap-1 items-center">
                    {/* Signal bars */}
                    <div className="flex gap-[1px] items-end h-2.5">
                      {[3, 5, 7, 9].map((h, i) => (
                        <div
                          key={i}
                          className="w-[2px] rounded-sm"
                          style={{
                            height: `${h}px`,
                            background: `rgba(245,243,239,${i < 3 ? 0.5 : 0.2})`,
                          }}
                        />
                      ))}
                    </div>
                    {/* Battery */}
                    <div
                      className="ml-1 w-5 h-2 rounded-sm relative"
                      style={{ border: "1px solid rgba(245,243,239,0.3)" }}
                    >
                      <div
                        className="absolute inset-[1px] rounded-[1px]"
                        style={{
                          width: "70%",
                          background: "rgba(245,243,239,0.4)",
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* App content */}
                <div className="px-5 pb-6 pt-3" style={{ background: "#0A0A0A" }}>
                  <p
                    className="text-[8px] uppercase tracking-[0.2em] mb-1"
                    style={{
                      color: "rgba(245,243,239,0.3)",
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    Thursday, Mar 8
                  </p>
                  <h4 className="font-serif text-[22px] font-bold text-foreground mb-4">
                    Good Morning
                  </h4>

                  {/* Filter pills */}
                  <div className="flex gap-1.5 flex-wrap mb-5">
                    {["NBA", "Celtics", "Tatum", "NFL"].map((tag, i) => (
                      <span
                        key={tag}
                        className="text-[8px] font-semibold px-2.5 py-1 rounded-full"
                        style={
                          i === 0
                            ? {
                                background:
                                  "linear-gradient(135deg, #B8952A, #D4B245)",
                                color: "#111111",
                              }
                            : {
                                background: "rgba(30,30,30,0.8)",
                                color: "rgba(245,243,239,0.5)",
                                border: "1px solid rgba(42,42,42,0.6)",
                              }
                        }
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Intelligence card 1 */}
                  <div
                    className="rounded-xl p-3.5 mb-2.5"
                    style={{
                      background:
                        "linear-gradient(135deg, #1A1A1A 0%, #161616 100%)",
                      border: "1px solid rgba(42,42,42,0.3)",
                    }}
                  >
                    <div className="flex items-center gap-1.5 mb-2">
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{
                          background: "#B8952A",
                          boxShadow: "0 0 4px rgba(184,149,42,0.5)",
                        }}
                      />
                      <span
                        className="text-[7px] font-semibold uppercase tracking-[0.12em]"
                        style={{
                          color: "rgba(245,243,239,0.4)",
                          fontFamily: "'JetBrains Mono', monospace",
                        }}
                      >
                        High Priority
                      </span>
                    </div>
                    <p className="text-[10.5px] font-semibold text-foreground leading-snug mb-1.5">
                      Tatum Free Throw Surge Tied to Referee Assignment Pattern
                    </p>
                    <p
                      className="text-[8.5px] leading-relaxed"
                      style={{ color: "#888888" }}
                    >
                      Cross-referenced 15 games with Crew Chief rotations. 34%
                      increase in calls when specific officials run the floor.
                    </p>
                  </div>

                  {/* Intelligence card 2 */}
                  <div
                    className="rounded-xl p-3.5"
                    style={{
                      background:
                        "linear-gradient(135deg, #1A1A1A 0%, #161616 100%)",
                      border: "1px solid rgba(42,42,42,0.3)",
                    }}
                  >
                    <div className="flex items-center gap-1.5 mb-2">
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: "rgba(245,243,239,0.2)" }}
                      />
                      <span
                        className="text-[7px] font-semibold uppercase tracking-[0.12em]"
                        style={{
                          color: "rgba(245,243,239,0.3)",
                          fontFamily: "'JetBrains Mono', monospace",
                        }}
                      >
                        Trend Watch
                      </span>
                    </div>
                    <p className="text-[10.5px] font-semibold text-foreground leading-snug mb-1.5">
                      Miami Heat Defensive Rotations Shifting Early
                    </p>
                    <p
                      className="text-[8.5px] leading-relaxed"
                      style={{ color: "#888888" }}
                    >
                      Spoelstra historically waits until post-All Star break to
                      deploy this specific zone variation. It started Tuesday.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
