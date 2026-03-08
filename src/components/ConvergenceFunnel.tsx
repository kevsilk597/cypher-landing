"use client";

import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FUNNEL_STATES } from "../data/funnelStates";
import ScrollReveal from "./ScrollReveal";

// ─────────────────────────────────────────────
// SEEDED RANDOM
// ─────────────────────────────────────────────
function seededRandom(seed: number) {
  let s = seed;
  return function () {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// ─────────────────────────────────────────────
// PIXEL-SPACE POSITIONING (reference canvas)
// ─────────────────────────────────────────────
const REF_W = 720;
const REF_H = 500;

interface LabelPos {
  xPx: number;
  yPx: number;
  rotation: number;
  depth: number; // 0-1 for parallax depth effect
}

const TIER_FONT: Record<number, { size: number; charW: number; h: number }> = {
  1: { size: 10, charW: 5.6, h: 16 },
  2: { size: 11, charW: 6.2, h: 17 },
  3: { size: 12.5, charW: 6.8, h: 18 },
};

function labelDims(text: string, tier: 1 | 2 | 3) {
  const f = TIER_FONT[tier];
  return { w: text.length * f.charW + 20, h: f.h };
}

// Labels placed in left 58% of canvas
const MAX_LABEL_X_RATIO = 0.58;

function generatePositions(
  stateIndex: number,
  labels: { text: string; tier: 1 | 2 | 3 }[]
): LabelPos[] {
  const rand = seededRandom(stateIndex * 7919 + 31);
  const padding = 20;
  const maxX = REF_W * MAX_LABEL_X_RATIO;

  const placed: { x: number; y: number; w: number; h: number }[] = [];
  const result: LabelPos[] = new Array(labels.length);

  // Place tier 3 first (most important, get prime positions)
  const order = labels.map((_, i) => i);
  order.sort((a, b) => labels[b].tier - labels[a].tier);

  for (const idx of order) {
    const label = labels[idx];
    const { w, h } = labelDims(label.text, label.tier);
    const gap = label.tier === 3 ? 14 : 12;

    let bx = padding;
    let by = padding;
    let found = false;

    for (let attempt = 0; attempt < 800; attempt++) {
      const tx = padding + rand() * (maxX - w - padding * 2);
      const ty = padding + rand() * (REF_H - h - padding * 2);

      let collision = false;
      for (const p of placed) {
        if (
          tx < p.x + p.w + gap &&
          tx + w + gap > p.x &&
          ty < p.y + p.h + gap &&
          ty + h + gap > p.y
        ) {
          collision = true;
          break;
        }
      }
      if (!collision) {
        bx = tx;
        by = ty;
        found = true;
        break;
      }
    }

    if (!found) {
      bx = padding + rand() * (maxX - w - padding * 2);
      by = padding + rand() * (REF_H - h - padding * 2);
    }

    placed.push({ x: bx, y: by, w, h });
    result[idx] = {
      xPx: bx,
      yPx: by,
      rotation: (rand() - 0.5) * 1.8,
      depth: 0.3 + rand() * 0.7,
    };
  }

  return result;
}

const ALL_POSITIONS = FUNNEL_STATES.map((s, i) =>
  generatePositions(i, s.labels)
);

// ─────────────────────────────────────────────
// SVG BEZIER LINES — elegant neural pathways
// ─────────────────────────────────────────────
function ConnectionLines({
  stateIndex,
  positions,
  containerRef,
}: {
  stateIndex: number;
  positions: LabelPos[];
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const state = FUNNEL_STATES[stateIndex];
  const [dims, setDims] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const r = el.getBoundingClientRect();
      setDims({ w: r.width, h: r.height });
    };
    update();
    const obs = new ResizeObserver(update);
    obs.observe(el);
    return () => obs.disconnect();
  }, [containerRef]);

  if (dims.w === 0) return null;

  const scaleX = dims.w / REF_W;
  const scaleY = dims.h / REF_H;

  // Convergence point — right side of label zone
  const focalX = dims.w * 0.72;
  const focalY = dims.h * 0.48;
  const spread = dims.h * 0.04;

  const gradientId = `lineGrad-${stateIndex}`;
  const glowId = `lineGlow-${stateIndex}`;

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 2 }}
      viewBox={`0 0 ${dims.w} ${dims.h}`}
    >
      <defs>
        <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#B8952A" stopOpacity="0.08" />
          <stop offset="40%" stopColor="#B8952A" stopOpacity="0.2" />
          <stop offset="80%" stopColor="#D4B245" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#D4B245" stopOpacity="0.6" />
        </linearGradient>
        {/* Radial glow at convergence */}
        <radialGradient id={`focalGlow-${stateIndex}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#B8952A" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#B8952A" stopOpacity="0" />
        </radialGradient>
      </defs>

      {state.connected.map((labelIdx, lineIndex) => {
        const pos = positions[labelIdx];
        const label = state.labels[labelIdx];
        const { w: lw, h: lh } = labelDims(label.text, label.tier);

        const startX = pos.xPx * scaleX + lw * scaleX * 0.5;
        const startY = pos.yPx * scaleY + (lh * scaleY) / 2;

        const t = lineIndex / Math.max(state.connected.length - 1, 1);
        const endY = focalY - spread / 2 + t * spread;

        // Elegant S-curve control points
        const dx = focalX - startX;
        const cp1X = startX + dx * 0.35;
        const cp1Y = startY + (endY - startY) * 0.1;
        const cp2X = startX + dx * 0.7;
        const cp2Y = endY - (endY - startY) * 0.05;

        const d = `M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${focalX} ${endY}`;
        const delay = 0.6 + lineIndex * 0.12;

        return (
          <g key={`${stateIndex}-${labelIdx}`}>
            {/* Wide glow layer */}
            <motion.path
              d={d}
              fill="none"
              stroke="#B8952A"
              strokeWidth={4}
              filter={`url(#${glowId})`}
              initial={{ pathLength: 0, strokeOpacity: 0 }}
              animate={{ pathLength: 1, strokeOpacity: 0.06 }}
              transition={{
                pathLength: { duration: 1.1, delay, ease: "easeOut" },
                strokeOpacity: { duration: 0.5, delay },
              }}
            />
            {/* Main line */}
            <motion.path
              d={d}
              fill="none"
              stroke={`url(#${gradientId})`}
              strokeWidth={label.tier === 3 ? 1.0 : 0.7}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: { duration: 1.0, delay, ease: "easeOut" },
                opacity: { duration: 0.4, delay },
              }}
            />
          </g>
        );
      })}

      {/* Convergence glow area */}
      <motion.circle
        cx={focalX}
        cy={focalY}
        r={40}
        fill={`url(#focalGlow-${stateIndex})`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      />
      {/* Focal dot — bright gold */}
      <motion.circle
        cx={focalX}
        cy={focalY}
        r={3.5}
        fill="#D4B245"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 0.7, delay: 1.6 }}
      />
      {/* Outer ring */}
      <circle
        cx={focalX}
        cy={focalY}
        r={10}
        fill="none"
        stroke="#B8952A"
        strokeWidth={0.5}
        opacity={0.15}
      />
    </svg>
  );
}

// ─────────────────────────────────────────────
// AMBIENT PARTICLES — subtle floating dots
// ─────────────────────────────────────────────
function AmbientParticles() {
  const particles = useMemo(() => {
    const rand = seededRandom(42);
    return Array.from({ length: 24 }, () => ({
      x: rand() * 100,
      y: rand() * 100,
      size: 1 + rand() * 1.5,
      delay: rand() * 4,
      duration: 3 + rand() * 3,
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: "#B8952A",
          }}
          animate={{
            opacity: [0, 0.08, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
export default function ConvergenceFunnel() {
  const [activeState, setActiveState] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const positions = useMemo(() => ALL_POSITIONS[activeState], [activeState]);
  const state = FUNNEL_STATES[activeState];
  const connectedSet = useMemo(
    () => new Set(state.connected),
    [state.connected]
  );

  const handleStateChange = useCallback((index: number) => {
    setActiveState(index);
  }, []);

  return (
    <section className="px-6 py-20 md:py-28 max-w-7xl mx-auto">
      <ScrollReveal>
        <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-center mb-4 leading-tight">
          See the convergence
          <br />
          <span className="text-text-secondary">in real time.</span>
        </h2>
        <p className="text-center text-sm text-text-muted mb-14 max-w-xl mx-auto">
          Select a sport to watch how scattered signals collapse into a single insight — days before it becomes news.
        </p>
      </ScrollReveal>

      {/* Sport Pills — ABOVE the funnel for clearer interaction */}
      <div className="flex items-center justify-center gap-2 mb-6">
        {FUNNEL_STATES.map((s, i) => (
          <button
            key={s.name}
            onClick={() => handleStateChange(i)}
            className="px-6 py-2.5 rounded-full text-xs font-semibold tracking-[0.1em] uppercase transition-all duration-300 cursor-pointer"
            style={
              i === activeState
                ? {
                    background: "linear-gradient(135deg, #B8952A 0%, #D4B245 100%)",
                    color: "#111111",
                    boxShadow: "0 2px 16px rgba(184,149,42,0.3)",
                  }
                : {
                    background: "rgba(26,26,26,0.8)",
                    color: "rgba(245,243,239,0.45)",
                    border: "1px solid rgba(42,42,42,0.6)",
                  }
            }
          >
            {s.name}
          </button>
        ))}
      </div>

      {/* Funnel container + Insight card side by side */}
      <div className="flex flex-col lg:flex-row gap-5 items-stretch">
        {/* LEFT: Funnel visualization */}
        <div className="lg:flex-[1.6] relative">
          <div
            ref={containerRef}
            className="relative w-full rounded-2xl overflow-hidden"
            style={{
              height: "clamp(420px, 50vw, 540px)",
              background:
                "radial-gradient(ellipse at 38% 48%, #181818 0%, #131313 35%, #111111 60%, #0D0D0D 100%)",
              boxShadow:
                "0 12px 60px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.02)",
              border: "1px solid rgba(184,149,42,0.08)",
            }}
          >
            {/* Subtle grid pattern */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.015]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(184,149,42,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(184,149,42,0.5) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
              }}
            />

            {/* Ambient particles */}
            <AmbientParticles />

            {/* Vignette */}
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 38% 48%, transparent 30%, rgba(11,11,11,0.6) 100%)",
                zIndex: 4,
              }}
            />

            {/* Data labels */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`labels-${activeState}`}
                className="absolute inset-0"
                style={{ zIndex: 3 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                {state.labels.map((label, i) => {
                  const pos = positions[i];
                  const isConnected = connectedSet.has(i);

                  const leftPct = (pos.xPx / REF_W) * 100;
                  const topPct = (pos.yPx / REF_H) * 100;

                  const tierOpacity = { 1: 0.22, 2: 0.48, 3: 0.88 }[
                    label.tier
                  ];
                  const tierSize = TIER_FONT[label.tier].size;
                  const tierWeight = label.tier === 3 ? 600 : label.tier === 2 ? 400 : 400;

                  return (
                    <motion.div
                      key={`${activeState}-lbl-${i}`}
                      className="absolute flex items-center gap-2 whitespace-nowrap select-none"
                      style={{
                        left: `${leftPct}%`,
                        top: `${topPct}%`,
                        transform: `rotate(${pos.rotation}deg)`,
                      }}
                      initial={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
                      animate={{
                        opacity: tierOpacity,
                        scale: 1,
                        filter: "blur(0px)",
                      }}
                      transition={{
                        duration: 0.6,
                        delay: 0.08 + i * 0.03,
                        ease: "easeOut",
                      }}
                    >
                      {/* Gold indicator dot */}
                      <span
                        className="flex-shrink-0 rounded-full"
                        style={{
                          width: isConnected ? "5px" : "3px",
                          height: isConnected ? "5px" : "3px",
                          background: isConnected
                            ? "radial-gradient(circle at 30% 30%, #D4B245, #B8952A)"
                            : `rgba(184,149,42,${label.tier === 1 ? 0.15 : 0.25})`,
                          boxShadow: isConnected
                            ? "0 0 8px rgba(184,149,42,0.5), 0 0 2px rgba(184,149,42,0.8)"
                            : "none",
                        }}
                      />
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: `${tierSize}px`,
                          fontWeight: tierWeight,
                          color: isConnected ? "#E8DCC8" : "#D0CCC4",
                          letterSpacing: "0.015em",
                          textShadow: isConnected
                            ? "0 0 12px rgba(184,149,42,0.15)"
                            : "none",
                        }}
                      >
                        {label.text}
                      </span>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>

            {/* SVG Bezier lines */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`lines-${activeState}`}
                className="absolute inset-0"
                style={{ zIndex: 2 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ConnectionLines
                  stateIndex={activeState}
                  positions={positions}
                  containerRef={containerRef}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* RIGHT: Insight card */}
        <div className="lg:flex-[1] flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={`insight-${activeState}`}
              className="w-full rounded-xl h-full flex flex-col justify-center relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, #1A1A1A 0%, #161616 100%)",
                borderLeft: "3px solid #B8952A",
                minHeight: "240px",
              }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.45, delay: 0.2 }}
            >
              {/* Subtle gold glow in top-left corner */}
              <div
                className="absolute top-0 left-0 w-32 h-32 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at 0% 0%, rgba(184,149,42,0.06) 0%, transparent 70%)",
                }}
              />
              <div className="relative p-7 md:p-8">
                {/* State badge */}
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      background: "#B8952A",
                      boxShadow: "0 0 6px rgba(184,149,42,0.6)",
                    }}
                  />
                  <span
                    className="text-[9px] font-semibold uppercase tracking-[0.15em]"
                    style={{
                      color: "#B8952A",
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    {state.name} Intelligence
                  </span>
                </div>

                <h3 className="font-serif text-lg md:text-xl font-bold text-foreground mb-4 leading-snug">
                  {state.insight.headline}
                </h3>
                <p className="text-[13.5px] md:text-[14px] text-text-secondary leading-[1.7] mb-6">
                  {state.insight.body}
                </p>
                <div
                  className="pt-4"
                  style={{ borderTop: "1px solid rgba(184,149,42,0.12)" }}
                >
                  <p className="text-sm italic font-medium" style={{ color: "#D4B245" }}>
                    {state.insight.timeAdvantage}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom line */}
      <ScrollReveal className="mt-10 text-center max-w-2xl mx-auto">
        <p className="text-[15px] text-foreground/60 leading-relaxed">
          These aren&apos;t predictions. They&apos;re patterns that already
          exist — hidden in data no one thought to connect.
        </p>
      </ScrollReveal>
    </section>
  );
}
