"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { VOICE_COPY, openRequestAccess, requestAccessHref } from "@/lib/voice";

type Phase = "cta" | "building" | "brief";

const buildSteps = [
  "Pulling six key data points...",
  "Cross-checking league baselines...",
  "Locking the outlier angle...",
  "Writing the headline and hook...",
  "Building the segment brief...",
];

export default function LandingSignalToSegment() {
  const [phase, setPhase] = useState<Phase>("cta");
  const [buildProgress, setBuildProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(-1);

  function startBuild() {
    setPhase("building");
    setBuildProgress(0);
    setActiveStep(0);

    buildSteps.forEach((_, i) => {
      setTimeout(() => {
        setActiveStep(i);
        setBuildProgress(Math.round(((i + 1) / buildSteps.length) * 100));
        if (i === buildSteps.length - 1) {
          setTimeout(() => setPhase("brief"), 500);
        }
      }, i * 480 + 120);
    });
  }

  function reset() {
    setPhase("cta");
    setBuildProgress(0);
    setActiveStep(-1);
  }

  return (
    <section
      style={{
        background: "#0A0A0A",
        paddingTop: "clamp(80px, 10vw, 120px)",
        paddingBottom: "clamp(80px, 10vw, 120px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 50%, rgba(74,144,217,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          padding: "0 24px",
          maxWidth: "1200px",
          margin: "0 auto",
          position: "relative",
        }}
      >
        {/* Section header */}
        <ScrollReveal>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2
              style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontSize: "clamp(28px, 4vw, 48px)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
                color: "#F5F3EF",
                marginBottom: "12px",
              }}
            >
              {VOICE_COPY.landing.signalToSegmentTitle}
              <br />
              <span style={{ color: "#A0A0A0" }}>
                {VOICE_COPY.landing.signalToSegmentSubTitle}
              </span>
            </h2>
            <p
              style={{
                fontSize: "17px",
                fontStyle: "italic",
                fontWeight: 400,
                color: "#4A90D9",
                fontFamily: "'Source Sans 3', system-ui, sans-serif",
                lineHeight: 1.55,
                textWrap: "balance",
              }}
            >
              {VOICE_COPY.landing.signalToSegmentKicker}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <p
            style={{
              maxWidth: 620,
              margin: "0 auto 28px",
              textAlign: "center",
              fontSize: "16px",
              color: "#B0B0B0",
              lineHeight: 1.52,
              fontFamily: "'Source Sans 3', system-ui, sans-serif",
              textWrap: "balance",
            }}
          >
            {VOICE_COPY.landing.patternSummary} One tap and Cypher writes the
            headline, builds the hook, stacks the evidence, and gives you the
            on-screen angle before the meeting starts.
          </p>
        </ScrollReveal>

        {/* Two-panel demo */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px",
            marginBottom: "64px",
          }}
          className="signal-grid"
        >
          {/* LEFT: Signal card */}
          <div
            style={{
              borderRadius: "12px",
              padding: "24px",
              background: "linear-gradient(135deg, #161616 0%, #131313 100%)",
              border: "1px solid rgba(74,144,217,0.12)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
            }}
          >
            {/* Badge row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "16px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#4A90D9",
                    boxShadow: "0 0 8px rgba(74,144,217,0.6)",
                    display: "inline-block",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 12,
                    color: "#4A90D9",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  Signal · Active
                </span>
              </div>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 13,
                  color: "#4A90D9",
                  fontWeight: 700,
                }}
              >
                89%
              </span>
            </div>

            {/* Title */}
            <h3
              style={{
                fontFamily: "'Source Sans 3', system-ui, sans-serif",
                fontWeight: 600,
                fontSize: 18,
                color: "#F5F3EF",
                marginBottom: "4px",
              }}
            >
              Tatum FT trend vs. referees
            </h3>
            <p
              style={{
                fontFamily: "'Source Sans 3', system-ui, sans-serif",
                fontSize: 14,
                color: "#A8A8A8",
                marginBottom: "20px",
              }}
            >
              Beat: Tatum · 6 data points
            </p>

            <div
              style={{
                height: 1,
                background: "rgba(74,144,217,0.08)",
                marginBottom: "20px",
              }}
            />

            {/* Timeline */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                {
                  date: "Mar 2",
                  label: "Pattern detected",
                  detail: "34% FT increase with crew",
                  dotColor: "#4A90D9",
                  dotSize: 8,
                  isKey: false,
                },
                {
                  date: "Mar 5",
                  label: "Cross-season match",
                  detail: "23-game sample confirms",
                  dotColor: "#5A5A5A",
                  dotSize: 8,
                  isKey: false,
                },
                {
                  date: "Mar 7",
                  label: "KEY INSIGHT",
                  detail:
                    "League avg LOWER with this crew. Tatum is the outlier.",
                  dotColor: "#4A90D9",
                  dotSize: 11,
                  isKey: true,
                },
                {
                  date: "Mar 8",
                  label: "TIMING",
                  detail: "Rodriguez crew assigned tomorrow",
                  dotColor: "#22C55E",
                  dotSize: 8,
                  isKey: false,
                },
              ].map((entry) => (
                <div
                  key={entry.date}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                  }}
                >
                  <div
                    style={{
                      minWidth: 16,
                      display: "flex",
                      justifyContent: "center",
                      marginTop: 2,
                    }}
                  >
                    <span
                      style={{
                        width: entry.dotSize,
                        height: entry.dotSize,
                        borderRadius: "50%",
                        background: entry.dotColor,
                        display: "block",
                        flexShrink: 0,
                        boxShadow: entry.isKey
                          ? `0 0 10px ${entry.dotColor}80`
                          : undefined,
                      }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        flexWrap: "wrap",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 11,
                          color: "#7A7A7A",
                          letterSpacing: "0.06em",
                          flexShrink: 0,
                        }}
                      >
                        {entry.date}
                      </span>
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 11,
                          color: entry.isKey ? "#4A90D9" : "#A0A0A0",
                          fontWeight: entry.isKey ? 700 : 400,
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                        }}
                      >
                        {entry.label}
                      </span>
                    </div>
                    <p
                      style={{
                        fontFamily: "'Source Sans 3', system-ui, sans-serif",
                        fontSize: 14,
                        marginTop: 2,
                        lineHeight: 1.5,
                        color: entry.isKey ? "#F5F3EF" : "#6B6B6B",
                        fontWeight: entry.isKey ? 600 : 400,
                      }}
                    >
                      {entry.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Three-state panel */}
          <div
            style={{
              borderRadius: "12px",
              position: "relative",
              overflow: "hidden",
              background: "linear-gradient(135deg, #141414 0%, #111111 100%)",
              border: "1px solid rgba(42,42,42,0.4)",
              minHeight: "400px",
            }}
          >
            <AnimatePresence mode="wait">
              {phase === "cta" && (
                <motion.div
                  key="cta"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "32px",
                    textAlign: "center",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'DM Serif Display', Georgia, serif",
                      fontWeight: 700,
                      fontSize: 20,
                      color: "#F5F3EF",
                      maxWidth: 280,
                      marginBottom: "32px",
                      lineHeight: 1.4,
                    }}
                  >
                    See what Cypher builds from this
                  </p>
                  <button
                    onClick={startBuild}
                    style={{
                      background: "#4A90D9",
                      color: "#0D0D0D",
                      fontWeight: 700,
                      border: "none",
                      padding: "0 32px",
                      height: 56,
                      borderRadius: 28,
                      fontSize: 15,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      transition: "background 0.2s, box-shadow 0.2s",
                      fontFamily: "'Source Sans 3', system-ui, sans-serif",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#5BA7EA";
                      e.currentTarget.style.boxShadow =
                        "0 4px 24px rgba(74,144,217,0.35)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#4A90D9";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <span>⚡</span> Build My Segment
                  </button>
                  <p
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 12,
                      color: "#A0A0A0",
                      marginTop: "16px",
                    }}
                  >
                    {"< 5 seconds"}
                  </p>
                </motion.div>
              )}

              {phase === "building" && (
                <motion.div
                  key="building"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "32px",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 12,
                      color: "#4A90D9",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      marginBottom: "20px",
                    }}
                  >
                    Building brief...
                  </p>
                  <div
                    style={{
                      height: 2,
                      background: "rgba(74,144,217,0.12)",
                      borderRadius: 1,
                      marginBottom: "28px",
                      overflow: "hidden",
                    }}
                  >
                    <motion.div
                      style={{
                        height: "100%",
                        background:
                          "linear-gradient(90deg, #4A90D9, #5BA7EA)",
                        borderRadius: 1,
                      }}
                      initial={{ width: "0%" }}
                      animate={{ width: `${buildProgress}%` }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                    }}
                  >
                    {buildSteps.map((step, i) => (
                      <motion.div
                        key={step}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{
                          opacity: i <= activeStep ? 1 : 0.2,
                          x: 0,
                        }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                      >
                        <span
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background:
                              i <= activeStep ? "#4A90D9" : "#3A3A3A",
                            flexShrink: 0,
                            transition: "background 0.3s",
                          }}
                        />
                        <span
                          style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: 12,
                            color:
                              i === activeStep
                                ? "#F5F3EF"
                                : i < activeStep
                                  ? "#6B6B6B"
                                  : "#3A3A3A",
                            transition: "color 0.3s",
                          }}
                        >
                          {step}
                        </span>
                        {i < activeStep && (
                          <span
                            style={{
                              color: "#4A90D9",
                              fontSize: 11,
                              marginLeft: "auto",
                            }}
                          >
                            ✓
                          </span>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {phase === "brief" && (
                <motion.div
                  key="brief"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    overflowY: "auto",
                    padding: "24px",
                  }}
                >
                  {/* Badge row */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "20px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 10,
                        color: "#6B6B6B",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                      }}
                    >
                      Segment Brief
                    </span>
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 10,
                        color: "#4A90D9",
                        letterSpacing: "0.08em",
                      }}
                    >
                      ✦ Ready to pitch
                    </span>
                  </div>

                  <motion.h3
                    style={{
                      fontFamily: "'DM Serif Display', Georgia, serif",
                      fontWeight: 700,
                      fontSize: 20,
                      color: "#F5F3EF",
                      lineHeight: 1.3,
                      marginBottom: "16px",
                    }}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                  >
                    The Ref Effect: Why Tatum Shoots 34% Better With One
                    Specific Crew Chief
                  </motion.h3>

                  <motion.div
                    style={{
                      borderLeft: "3px solid #4A90D9",
                      paddingLeft: 16,
                      marginBottom: "20px",
                    }}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.22, duration: 0.4 }}
                  >
                    <p
                      style={{
                        fontStyle: "italic",
                        fontSize: 14,
                        color: "#4A90D9",
                        lineHeight: 1.6,
                        fontFamily:
                          "'Source Sans 3', system-ui, sans-serif",
                      }}
                    >
                      What if the biggest variable isn&apos;t his offseason
                      work — it&apos;s who&apos;s officiating?
                    </p>
                  </motion.div>

                  <motion.div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "8px",
                      marginBottom: "20px",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.35, duration: 0.4 }}
                  >
                    {[
                      { stat: "87.2%", label: "FT% with Rodriguez crew" },
                      { stat: "78.1%", label: "Tatum season average" },
                      { stat: "73.8%", label: "League average" },
                      { stat: "+34%", label: "Above league avg with this crew" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        style={{
                          borderRadius: "8px",
                          padding: "12px",
                          background: "rgba(74,144,217,0.05)",
                          border: "1px solid rgba(74,144,217,0.1)",
                        }}
                      >
                        <p
                          style={{
                            fontFamily:
                              "'DM Serif Display', Georgia, serif",
                            fontWeight: 700,
                            fontSize: 18,
                            color: "#4A90D9",
                            lineHeight: 1,
                            marginBottom: 4,
                          }}
                        >
                          {item.stat}
                        </p>
                        <p
                          style={{
                            fontFamily:
                              "'Source Sans 3', system-ui, sans-serif",
                            fontSize: 11,
                            color: "#6B6B6B",
                            lineHeight: 1.4,
                          }}
                        >
                          {item.label}
                        </p>
                      </div>
                    ))}
                  </motion.div>

                  <motion.div
                    style={{ marginBottom: "20px" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.48, duration: 0.4 }}
                  >
                    <p
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 10,
                        color: "#22C55E",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        marginBottom: 4,
                      }}
                    >
                      Why Now
                    </p>
                    <p
                      style={{
                        fontSize: 13,
                        color: "#A0A0A0",
                        fontFamily: "'Source Sans 3', system-ui, sans-serif",
                      }}
                    >
                      Rodriguez crew assigned to tomorrow&apos;s BOS-MIA game.
                    </p>
                  </motion.div>

                  <motion.div
                    style={{
                      borderRadius: "8px",
                      padding: "16px",
                      background: "rgba(26,26,26,0.8)",
                      border: "1px solid rgba(42,42,42,0.6)",
                      marginBottom: "20px",
                    }}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.4 }}
                  >
                    <p
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 9,
                        color: "#4A90D9",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        marginBottom: 6,
                      }}
                    >
                      Your Angle
                    </p>
                    <p
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#F5F3EF",
                        marginBottom: "8px",
                        fontFamily: "'Source Sans 3', system-ui, sans-serif",
                      }}
                    >
                      Nobody is talking about this yet.
                    </p>
                    <p
                      style={{
                        fontSize: 12,
                        color: "#6B6B6B",
                        lineHeight: 1.6,
                        marginBottom: "8px",
                        fontFamily: "'Source Sans 3', system-ui, sans-serif",
                      }}
                    >
                      Lead with the stat that eliminates the obvious counter:
                      league-wide FT% is <em>lower</em> with this crew. That
                      means it&apos;s not the refs being generous — it&apos;s
                      something specific to Tatum.
                    </p>
                    <p
                      style={{
                        fontSize: 12,
                        color: "#A0A0A0",
                        lineHeight: 1.6,
                        borderTop: "1px solid rgba(42,42,42,0.6)",
                        paddingTop: 8,
                        fontFamily: "'Source Sans 3', system-ui, sans-serif",
                      }}
                    >
                      <span
                        style={{
                          color: "#4A90D9",
                          fontWeight: 700,
                        }}
                      >
                        Pitch it like this:{" "}
                      </span>
                      &ldquo;We found something nobody&apos;s connected —
                      Tatum shoots 34% better with one specific crew chief, and
                      they&apos;re working tomorrow&apos;s game.&rdquo;
                    </p>
                  </motion.div>

                  <motion.div
                    style={{ display: "flex", gap: "8px" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.72, duration: 0.4 }}
                  >
                    {["Export One-Pager", "Share to Slack"].map((label) => (
                      <button
                        key={label}
                        style={{
                          flex: 1,
                          padding: "8px",
                          borderRadius: "8px",
                          fontSize: 11,
                          fontWeight: 600,
                          cursor: "pointer",
                          background: "transparent",
                          border: "1px solid rgba(74,144,217,0.3)",
                          color: "#4A90D9",
                          fontFamily: "'JetBrains Mono', monospace",
                          letterSpacing: "0.04em",
                          transition: "background 0.2s, border-color 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background =
                            "rgba(74,144,217,0.08)";
                          e.currentTarget.style.borderColor =
                            "rgba(74,144,217,0.6)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.borderColor =
                            "rgba(74,144,217,0.3)";
                        }}
                      >
                        {label}
                      </button>
                    ))}
                    <button
                      onClick={reset}
                      style={{
                        padding: "8px 12px",
                        borderRadius: "8px",
                        fontSize: 11,
                        fontWeight: 600,
                        cursor: "pointer",
                        background: "transparent",
                        border: "1px solid rgba(90,90,90,0.4)",
                        color: "#5A5A5A",
                        transition: "color 0.2s, border-color 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#A0A0A0";
                        e.currentTarget.style.borderColor =
                          "rgba(90,90,90,0.7)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "#5A5A5A";
                        e.currentTarget.style.borderColor =
                          "rgba(90,90,90,0.4)";
                      }}
                    >
                      ↺
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Below demo: body copy + micro-stats + CTA */}
        <ScrollReveal>
          <div
            style={{
              textAlign: "center",
              maxWidth: "680px",
              margin: "0 auto",
            }}
          >
            {/* Micro-stats */}
            <div
              style={{
                display: "flex",
                borderTop: "1px solid rgba(42,42,42,0.4)",
                borderBottom: "1px solid rgba(42,42,42,0.4)",
                marginBottom: "40px",
              }}
            >
              {[
                { stat: "< 5 sec", label: "Brief generation" },
                { stat: "6 sections", label: "In every brief" },
                { stat: "1 tap", label: "Signal to pitch-ready" },
              ].map((item, i) => (
                <div
                  key={item.label}
                  style={{
                    flex: 1,
                    padding: "24px 16px",
                    textAlign: "center",
                    borderLeft:
                      i > 0 ? "1px solid rgba(42,42,42,0.4)" : "none",
                  }}
                >
                  <p
                    style={{
                      fontFamily:
                        "'DM Serif Display', Georgia, serif",
                      fontWeight: 700,
                      fontSize: 20,
                      color: "#4A90D9",
                      lineHeight: 1,
                      marginBottom: "6px",
                    }}
                  >
                    {item.stat}
                  </p>
                  <p
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 11,
                      color: "#7A7A7A",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            <p
              style={{
                fontSize: "19px",
                fontWeight: 600,
                color: "#F5F3EF",
                marginBottom: "8px",
                fontFamily: "'Source Sans 3', system-ui, sans-serif",
                lineHeight: 1.5,
                textWrap: "balance",
              }}
            >
              {VOICE_COPY.landing.signalToSegmentSmartLineA}
            </p>
            <p
              style={{
                fontSize: "19px",
                fontWeight: 600,
                color: "#4A90D9",
                marginBottom: "32px",
                fontFamily: "'Source Sans 3', system-ui, sans-serif",
                textWrap: "balance",
              }}
            >
              {VOICE_COPY.landing.signalToSegmentSmartLineB}
            </p>
            <a
              href={requestAccessHref()}
              onClick={(e) => {
                e.preventDefault();
                openRequestAccess();
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "#4A90D9",
                color: "#0D0D0D",
                fontWeight: 600,
                padding: "18px 36px",
                borderRadius: 8,
                fontSize: 16,
                textDecoration: "none",
                transition: "background 0.2s, box-shadow 0.2s",
                fontFamily: "'Source Sans 3', system-ui, sans-serif",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#5BA7EA";
                e.currentTarget.style.boxShadow =
                  "0 4px 16px rgba(74,144,217,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#4A90D9";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {VOICE_COPY.ctas.requestAccess}
            </a>
          </div>
        </ScrollReveal>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .signal-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
