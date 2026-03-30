"use client";

import { motion } from 'framer-motion';
import { colors } from '@/lib/tokens';
import { VOICE_COPY, openRequestAccess, requestAccessHref } from '@/lib/voice';

function Particle({ x, delay, duration }: { x: number; delay: number; duration: number }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: `${x}%`,
        bottom: '20%',
        width: '3px',
        height: '3px',
        borderRadius: '50%',
        background: colors.gold,
        opacity: 0,
        animation: `float-up ${duration}s ease-in-out ${delay}s infinite`,
      }}
    />
  );
}

const PARTICLES = [
  { x: 20, delay: 0,   duration: 7  },
  { x: 35, delay: 2.5, duration: 9  },
  { x: 55, delay: 1.2, duration: 8  },
  { x: 70, delay: 3.8, duration: 10 },
  { x: 82, delay: 0.8, duration: 6  },
];

export default function LandingHero() {
  return (
    <section style={{
      position: 'relative',
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '96px 24px 16px',
      overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 30%, rgba(74,144,217,0.08) 0%, transparent 60%)',
        }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.02,
          backgroundImage: 'radial-gradient(circle, #F5F3EF 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
        {PARTICLES.map((p, i) => <Particle key={i} {...p} />)}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '896px', width: '100%' }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.2 }}
          style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: 'clamp(36px, 6vw, 56px)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            marginBottom: '28px',
            color: colors.textPrimary,
            textShadow: '0 0 60px rgba(74,144,217,0.15)',
          }}
        >
          Know what to talk about<br />before anyone else does.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 0.45 }}
          style={{
            fontSize: '16px',
            color: colors.textSecondary,
            maxWidth: '560px',
            margin: '0 auto 48px',
            lineHeight: 1.6,
            fontFamily: "'Source Sans 3', system-ui, sans-serif",
          }}
        >
          {VOICE_COPY.landing.heroSubtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 0.7 }}
          style={{ display: 'inline-block', marginBottom: '20px' }}
        >
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <div style={{
              position: 'absolute',
              inset: -2,
              borderRadius: '10px',
              background: 'conic-gradient(from 0deg, #4A90D9, #E8A4B8, #A4B8E8, #2F6FAE, #4A90D9)',
              animation: 'prismatic-spin 8s linear infinite',
              opacity: 0.7,
              zIndex: 0,
            }} />
            <div style={{
              position: 'absolute',
              inset: -8,
              borderRadius: '16px',
              background: 'radial-gradient(ellipse, rgba(74,144,217,0.2) 0%, transparent 70%)',
              animation: 'glow-pulse 3s ease-in-out infinite',
              zIndex: 0,
            }} />
            <a
              href={requestAccessHref()}
              onClick={(e) => {
                e.preventDefault();
                openRequestAccess();
              }}
              style={{
                position: 'relative',
                zIndex: 1,
                display: 'inline-block',
                padding: '18px 36px',
                background: colors.gold,
                color: '#111111',
                fontWeight: 600,
                fontSize: '16px',
                borderRadius: '8px',
                textDecoration: 'none',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = colors.goldLight)}
              onMouseLeave={e => (e.currentTarget.style.background = colors.gold)}
            >
              {VOICE_COPY.ctas.requestAccess}
            </a>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          style={{
            display: 'block',
            marginTop: '16px',
            fontSize: '12px',
            letterSpacing: '0.02em',
            color: colors.textTertiary,
            fontFamily: "'Source Sans 3', system-ui, sans-serif",
          }}
        >
          Currently onboarding a limited number of early subscribers.
        </motion.p>
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          .hero-headline { font-size: 36px !important; }
          .hero-sub { font-size: 15px !important; }
        }
      `}</style>
    </section>
  );
}
