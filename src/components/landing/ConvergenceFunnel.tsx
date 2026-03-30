"use client";

import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FUNNEL_STATES } from '@/data/funnelStates';
import ScrollReveal from './ScrollReveal';

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

const REF_W = 720;
const REF_H = 500;

interface LabelPos {
  xPx: number;
  yPx: number;
  rotation: number;
  depth: number;
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

  const order = labels.map((_, i) => i);
  order.sort((a, b) => labels[b].tier - labels[a].tier);

  for (const idx of order) {
    const label = labels[idx];
    const { w, h } = labelDims(label.text, label.tier);
    const gap = label.tier === 3 ? 14 : 12;
    let bx = padding, by = padding, found = false;

    for (let attempt = 0; attempt < 800; attempt++) {
      const tx = padding + rand() * (maxX - w - padding * 2);
      const ty = padding + rand() * (REF_H - h - padding * 2);
      let collision = false;
      for (const p of placed) {
        if (tx < p.x + p.w + gap && tx + w + gap > p.x && ty < p.y + p.h + gap && ty + h + gap > p.y) {
          collision = true;
          break;
        }
      }
      if (!collision) { bx = tx; by = ty; found = true; break; }
    }

    if (!found) {
      bx = padding + rand() * (maxX - w - padding * 2);
      by = padding + rand() * (REF_H - h - padding * 2);
    }

    placed.push({ x: bx, y: by, w, h });
    result[idx] = { xPx: bx, yPx: by, rotation: (rand() - 0.5) * 1.8, depth: 0.3 + rand() * 0.7 };
  }

  return result;
}

const ALL_POSITIONS = FUNNEL_STATES.map((s, i) => generatePositions(i, s.labels));

// ─────────────────────────────────────────────
// CONNECTION LINES
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
  const focalX = dims.w * 0.95;
  const focalY = dims.h * 0.48;
  const spread = dims.h * 0.04;
  const gradientId = `lineGrad-${stateIndex}`;
  const glowId = `lineGlow-${stateIndex}`;

  return (
    <svg
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 2 }}
      viewBox={`0 0 ${dims.w} ${dims.h}`}
    >
      <defs>
        <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4A90D9" stopOpacity="0.08" />
          <stop offset="40%" stopColor="#4A90D9" stopOpacity="0.2" />
          <stop offset="80%" stopColor="#5BA7EA" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#5BA7EA" stopOpacity="0.6" />
        </linearGradient>
        <radialGradient id={`focalGlow-${stateIndex}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4A90D9" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#4A90D9" stopOpacity="0" />
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
        const dx = focalX - startX;
        const cp1X = startX + dx * 0.45;
        const cp1Y = startY + (endY - startY) * 0.1;
        const cp2X = startX + dx * 0.8;
        const cp2Y = endY - (endY - startY) * 0.05;
        const d = `M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${focalX} ${endY}`;
        const delay = 0.6 + lineIndex * 0.12;

        return (
          <g key={`${stateIndex}-${labelIdx}`}>
            <motion.path
              d={d} fill="none" stroke="#4A90D9" strokeWidth={4}
              filter={`url(#${glowId})`}
              initial={{ pathLength: 0, strokeOpacity: 0 }}
              animate={{ pathLength: 1, strokeOpacity: 0.06 }}
              transition={{ pathLength: { duration: 1.1, delay, ease: 'easeOut' }, strokeOpacity: { duration: 0.5, delay } }}
            />
            <motion.path
              d={d} fill="none" stroke={`url(#${gradientId})`}
              strokeWidth={label.tier === 3 ? 1.0 : 0.7} strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ pathLength: { duration: 1.0, delay, ease: 'easeOut' }, opacity: { duration: 0.4, delay } }}
            />
          </g>
        );
      })}

      <motion.circle cx={focalX} cy={focalY} r={40} fill={`url(#focalGlow-${stateIndex})`}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.5 }} />
      <motion.circle cx={focalX} cy={focalY} r={3.5} fill="#5BA7EA"
        initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ duration: 0.7, delay: 1.6 }} />
      <circle cx={focalX} cy={focalY} r={10} fill="none" stroke="#4A90D9" strokeWidth={0.5} opacity={0.15} />
    </svg>
  );
}

// ─────────────────────────────────────────────
// AMBIENT PARTICLES
// ─────────────────────────────────────────────
function AmbientParticles() {
  const particles = useMemo(() => {
    const rand = seededRandom(42);
    return Array.from({ length: 24 }, () => ({
      x: rand() * 100, y: rand() * 100,
      size: 1 + rand() * 1.5,
      delay: rand() * 4,
      duration: 3 + rand() * 3,
    }));
  }, []);

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
      {particles.map((p, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: '#4A90D9',
            borderRadius: '50%',
          }}
          animate={{ opacity: [0, 0.08, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
export default function LandingConvergenceFunnel() {
  const [activeState, setActiveState] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const positions = useMemo(() => ALL_POSITIONS[activeState], [activeState]);
  const state = FUNNEL_STATES[activeState];
  const connectedSet = useMemo(() => new Set(state.connected), [state.connected]);
  const handleStateChange = useCallback((index: number) => setActiveState(index), []);
  const [isWide, setIsWide] = useState(typeof window !== 'undefined' ? window.innerWidth > 900 : true);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 900px)');
    const handler = (e: MediaQueryListEvent) => setIsWide(e.matches);
    mq.addEventListener('change', handler);
    setIsWide(mq.matches);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <section style={{ padding: '48px 24px 64px', maxWidth: '1280px', margin: '0 auto' }}>
      <ScrollReveal>
        <h2 style={{
          fontFamily: "'DM Serif Display', Georgia, serif",
          fontSize: 'clamp(28px, 4vw, 48px)',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          textAlign: 'center',
          marginBottom: '16px',
          lineHeight: 1.2,
          color: '#F5F3EF',
        }}>
          See the convergence<br />
          <span style={{ color: '#A0A0A0' }}>in real time.</span>
        </h2>
        <p style={{
          textAlign: 'center',
          fontSize: '14px',
          color: '#6B6B6B',
          marginBottom: '56px',
          maxWidth: '480px',
          margin: '0 auto 56px',
          fontFamily: "'Source Sans 3', system-ui, sans-serif",
        }}>
          Select a sport to watch how scattered signals collapse into a single insight — days before it becomes news.
        </p>
      </ScrollReveal>

      {/* Sport pills */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
        {FUNNEL_STATES.map((s, i) => (
          <button
            key={s.name}
            onClick={() => handleStateChange(i)}
            style={{
              padding: '10px 24px',
              borderRadius: '9999px',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              border: 'none',
              transition: 'all 0.3s',
              ...(i === activeState
                ? { background: 'linear-gradient(135deg, #4A90D9 0%, #5BA7EA 100%)', color: '#111111', boxShadow: '0 2px 16px rgba(74,144,217,0.3)' }
                : { background: 'rgba(26,26,26,0.8)', color: 'rgba(245,243,239,0.45)', border: '1px solid rgba(42,42,42,0.6)' }),
            }}
          >
            {s.name}
          </button>
        ))}
      </div>

      {/* Funnel + Insight card */}
      <div style={{ display: 'grid', gridTemplateColumns: isWide ? '1.4fr 1fr' : '1fr', gap: '20px', alignItems: 'stretch' }}>
        <div style={{ position: 'relative' }}>
          <div
            ref={containerRef}
            style={{
              position: 'relative',
              width: '100%',
              borderRadius: '16px',
              overflow: 'hidden',
              height: 'clamp(420px, 50vw, 540px)',
              background: 'radial-gradient(ellipse at 38% 48%, #181818 0%, #131313 35%, #111111 60%, #0D0D0D 100%)',
              boxShadow: '0 12px 60px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.02)',
              border: '1px solid rgba(74,144,217,0.08)',
            }}
          >
            {/* Grid pattern */}
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.015,
              backgroundImage: 'linear-gradient(rgba(74,144,217,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(74,144,217,0.5) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }} />

            <AmbientParticles />

            {/* Vignette */}
            <div style={{
              position: 'absolute', inset: 0, borderRadius: '16px', pointerEvents: 'none', zIndex: 4,
              background: 'radial-gradient(ellipse at 38% 48%, transparent 30%, rgba(11,11,11,0.6) 100%)',
            }} />

            {/* Data labels */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`labels-${activeState}`}
                style={{ position: 'absolute', inset: 0, zIndex: 3 }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                {state.labels.map((label, i) => {
                  const pos = positions[i];
                  const isConnected = connectedSet.has(i);
                  const leftPct = (pos.xPx / REF_W) * 100;
                  const topPct = (pos.yPx / REF_H) * 100;
                  const tierOpacity = ({ 1: 0.22, 2: 0.48, 3: 0.88 } as Record<number, number>)[label.tier];
                  const tierSize = TIER_FONT[label.tier].size;
                  const tierWeight = label.tier === 3 ? 600 : 400;

                  return (
                    <motion.div
                      key={`${activeState}-lbl-${i}`}
                      style={{
                        position: 'absolute',
                        left: `${leftPct}%`,
                        top: `${topPct}%`,
                        transform: `rotate(${pos.rotation}deg)`,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        whiteSpace: 'nowrap',
                        userSelect: 'none',
                      }}
                      initial={{ opacity: 0, scale: 0.8, filter: 'blur(4px)' }}
                      animate={{ opacity: tierOpacity, scale: 1, filter: 'blur(0px)' }}
                      transition={{ duration: 0.6, delay: 0.08 + i * 0.03, ease: 'easeOut' }}
                    >
                      <span style={{
                        flexShrink: 0,
                        borderRadius: '50%',
                        width: isConnected ? '5px' : '3px',
                        height: isConnected ? '5px' : '3px',
                        background: isConnected
                          ? 'radial-gradient(circle at 30% 30%, #5BA7EA, #4A90D9)'
                          : `rgba(74,144,217,${label.tier === 1 ? 0.15 : 0.25})`,
                        boxShadow: isConnected ? '0 0 8px rgba(74,144,217,0.5), 0 0 2px rgba(74,144,217,0.8)' : 'none',
                      }} />
                      <span style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: `${tierSize}px`,
                        fontWeight: tierWeight,
                        color: isConnected ? '#E8DCC8' : '#D0CCC4',
                        letterSpacing: '0.015em',
                        textShadow: isConnected ? '0 0 12px rgba(74,144,217,0.15)' : 'none',
                      }}>
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
                style={{ position: 'absolute', inset: 0, zIndex: 2 }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ConnectionLines stateIndex={activeState} positions={positions} containerRef={containerRef} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Insight card */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={`insight-shell-${activeState}`}
              style={{
                position: 'relative',
                borderRadius: '18px',
                padding: '2px',
              }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.45, delay: 0.2 }}
            >
              <div style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '18px',
                background: 'conic-gradient(from 0deg, #4A90D9, #E8A4B8, #A4B8E8, #2F6FAE, #4A90D9)',
                animation: 'prismatic-spin 8s linear infinite',
                opacity: 0.65,
              }} />
              <motion.div
                key={`insight-${activeState}`}
                style={{
                  width: '100%',
                  borderRadius: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  background: 'linear-gradient(160deg, #1C1C1C 0%, #161616 40%, #131313 100%)',
                  boxShadow: '0 8px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.03)',
                }}
              >
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                background: 'linear-gradient(90deg, #4A90D9 0%, #5BA7EA 50%, rgba(74,144,217,0.2) 100%)',
              }} />
              <div style={{
                position: 'absolute', top: 0, left: 0, width: '180px', height: '180px', pointerEvents: 'none',
                background: 'radial-gradient(circle at 0% 0%, rgba(74,144,217,0.08) 0%, transparent 60%)',
              }} />
              <div style={{
                position: 'absolute', bottom: 0, right: 0, width: '120px', height: '120px', pointerEvents: 'none',
                background: 'radial-gradient(circle at 100% 100%, rgba(74,144,217,0.04) 0%, transparent 60%)',
              }} />

              <div style={{ position: 'relative', padding: '32px 28px' }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '6px 14px', borderRadius: '9999px',
                  background: 'rgba(74,144,217,0.1)', border: '1px solid rgba(74,144,217,0.2)',
                  marginBottom: '20px',
                }}>
                  <span style={{
                    width: '6px', height: '6px', borderRadius: '50%',
                    background: '#5BA7EA', boxShadow: '0 0 8px rgba(91,167,234,0.6)',
                  }} />
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '9px', fontWeight: 600, letterSpacing: '0.15em',
                    textTransform: 'uppercase', color: '#5BA7EA',
                  }}>
                    {state.name} Intelligence
                  </span>
                </div>

                <h3 style={{
                  fontFamily: "'DM Serif Display', Georgia, serif",
                  fontSize: '20px', fontWeight: 700, color: '#F5F3EF',
                  marginBottom: '16px', lineHeight: 1.35,
                }}>
                  {state.insight.headline}
                </h3>

                <p style={{
                  fontSize: '14px', color: '#A0A0A0', lineHeight: 1.7,
                  marginBottom: '24px',
                  fontFamily: "'Source Sans 3', system-ui, sans-serif",
                }}>
                  {state.insight.body}
                </p>

                <div style={{
                  borderTop: '1px solid rgba(74,144,217,0.12)', paddingTop: '16px',
                  display: 'flex', alignItems: 'center', gap: '10px',
                }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                    <circle cx="7" cy="7" r="6" stroke="#5BA7EA" strokeWidth="1.2" />
                    <path d="M7 4V7.5L9.5 9" stroke="#5BA7EA" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                  <p style={{
                    fontSize: '14px', fontStyle: 'italic', fontWeight: 500,
                    color: '#5BA7EA',
                    fontFamily: "'Source Sans 3', system-ui, sans-serif",
                  }}>
                    {state.insight.timeAdvantage}
                  </p>
                </div>
              </div>
            </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <ScrollReveal delay={0.1}>
        <p style={{
          textAlign: 'center',
          fontSize: '15px',
          color: 'rgba(245,243,239,0.6)',
          marginTop: '40px',
          maxWidth: '640px',
          margin: '40px auto 0',
          lineHeight: 1.6,
          fontFamily: "'Source Sans 3', system-ui, sans-serif",
        }}>
          These aren&apos;t predictions. They&apos;re patterns that already exist —
          hidden in data no one thought to connect.
        </p>
        <p style={{
          textAlign: 'center',
          fontSize: '18px',
          fontWeight: 600,
          color: '#5BA7EA',
          marginTop: '24px',
          maxWidth: '640px',
          margin: '24px auto 0',
          fontFamily: "'DM Serif Display', Georgia, serif",
          fontStyle: 'italic',
        }}>
          The smartest person in the room isn&apos;t working harder. They&apos;re using Cypher.
        </p>
      </ScrollReveal>
    </section>
  );
}
