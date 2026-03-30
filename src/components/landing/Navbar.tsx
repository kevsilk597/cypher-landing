"use client";

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { colors } from '@/lib/tokens';
import { VOICE_COPY, openRequestAccess, requestAccessHref } from '@/lib/voice';

const PROTOTYPE_URL =
  process.env.NEXT_PUBLIC_CYPHER_APP_URL ??
  "https://cypher-sports.vercel.app/app/scores?demo=1";

export default function LandingNavbar() {
  const prismaticRef = useRef<HTMLDivElement>(null);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 48px',
        background: 'rgba(17,17,17,0.9)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: `1px solid ${colors.border}`,
      }}
    >
      <style>{`
        @media (max-width: 768px) {
          .navbar-nav { padding: 0 24px !important; }
        }
      `}</style>

      {/* Logo */}
      <span style={{
        fontFamily: "'DM Serif Display', Georgia, serif",
        fontSize: '20px',
        fontWeight: 700,
        letterSpacing: '0.1em',
        color: colors.textPrimary,
      }}>
        CYPHER
      </span>

      {/* Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <a
          href={PROTOTYPE_URL}
          style={{
            fontSize: '14px',
            color: colors.textSecondary,
            textDecoration: 'none',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.color = colors.textPrimary;
            e.currentTarget.style.textDecoration = 'underline';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = colors.textSecondary;
            e.currentTarget.style.textDecoration = 'none';
          }}
        >
          {VOICE_COPY.ctas.signIn}
        </a>

        {/* CTA with hover prismatic border */}
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <div
            ref={prismaticRef}
            style={{
              position: 'absolute',
              inset: -1,
              borderRadius: '9px',
              background: 'conic-gradient(from 0deg, #4A90D9, #E8A4B8, #A4B8E8, #2F6FAE, #4A90D9)',
              animation: 'prismatic-spin 8s linear infinite',
              opacity: 0,
              transition: 'opacity 0.2s',
              zIndex: 0,
            }}
          />
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
              fontSize: '14px',
              fontWeight: 600,
              padding: '12px 24px',
              background: colors.gold,
              color: '#111111',
              borderRadius: '8px',
              textDecoration: 'none',
              transition: 'background 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = colors.goldLight;
              e.currentTarget.style.boxShadow = colors.shadows?.glow ?? '0 0 30px rgba(74,144,217,0.2)';
              if (prismaticRef.current) prismaticRef.current.style.opacity = '0.65';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = colors.gold;
              e.currentTarget.style.boxShadow = 'none';
              if (prismaticRef.current) prismaticRef.current.style.opacity = '0';
            }}
          >
            {VOICE_COPY.ctas.requestAccess}
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
