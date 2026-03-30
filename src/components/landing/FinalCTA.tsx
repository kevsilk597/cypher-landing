"use client";

import ScrollReveal from './ScrollReveal';
import { colors } from '@/lib/tokens';
import { VOICE_COPY, openRequestAccess, requestAccessHref } from '@/lib/voice';

export default function LandingFinalCTA() {
  return (
    <>
      <div style={{ padding: '56px 24px', textAlign: 'center' }}>
        <ScrollReveal>
          <p style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: '14px',
            fontStyle: 'italic',
            color: 'rgba(74,144,217,0.45)',
            maxWidth: '480px',
            margin: '0 auto',
            lineHeight: 1.7,
          }}>
            {VOICE_COPY.landing.noBias} Including the stories no one else thinks to look for.
          </p>
        </ScrollReveal>
      </div>

      <div className="section-divider" />

      <section
        id="cta"
        style={{
          padding: '120px 24px 80px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          background: '#0A0A0A',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 50%, rgba(74,144,217,0.1) 0%, transparent 50%)',
          pointerEvents: 'none',
        }} />

        <ScrollReveal>
          <div style={{ maxWidth: '480px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <h2 style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: 'clamp(28px, 3.5vw, 40px)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: colors.textPrimary,
              marginBottom: '20px',
              lineHeight: 1.15,
            }}>
              Request access.
            </h2>
            <p style={{
              fontSize: '16px',
              color: colors.textSecondary,
              lineHeight: 1.7,
              maxWidth: '480px',
              margin: '0 auto 48px',
              fontFamily: "'Source Sans 3', system-ui, sans-serif",
            }}>
              We&apos;re onboarding a limited number of subscribers who want to see what sports intelligence actually looks like.
            </p>

            <div style={{ display: 'inline-block', position: 'relative' }}>
              <div style={{
                position: 'absolute',
                inset: -12,
                borderRadius: '20px',
                background: 'radial-gradient(ellipse, rgba(74,144,217,0.2) 0%, transparent 70%)',
                animation: 'glow-pulse 3s ease-in-out infinite',
                zIndex: 0,
              }} />
              <div style={{
                position: 'absolute',
                inset: -2,
                borderRadius: '14px',
                background: 'conic-gradient(from 0deg, #4A90D9, #E8A4B8, #A4B8E8, #2F6FAE, #4A90D9)',
                animation: 'prismatic-spin 8s linear infinite',
                opacity: 0.8,
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
                  padding: '20px 48px',
                  background: colors.gold,
                  color: '#111111',
                  fontWeight: 700,
                  fontSize: '18px',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  transition: 'background 0.2s',
                  fontFamily: "'Source Sans 3', system-ui, sans-serif",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = colors.goldLight)}
                onMouseLeave={e => (e.currentTarget.style.background = colors.gold)}
              >
                {VOICE_COPY.ctas.requestAccess}
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <footer style={{
        paddingBottom: '40px',
        textAlign: 'center',
        background: '#0A0A0A',
      }}>
        <p style={{
          fontSize: '12px',
          letterSpacing: '0.02em',
          color: colors.textMuted,
          fontFamily: "'Source Sans 3', system-ui, sans-serif",
        }}>
          © 2026 Cypher
        </p>
      </footer>
    </>
  );
}
