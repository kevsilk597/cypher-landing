"use client";

import { useState } from 'react';
import ScrollReveal from './ScrollReveal';
import { colors } from '@/lib/tokens';

const personas = [
  {
    label: 'Producers & Researchers',
    body: "You build the segments that make the show. Cypher makes sure you walk in with something nobody else has — every single day.",
  },
  {
    label: 'Hosts & Analysts',
    body: "Your producer just handed you a brief with a headline, a hook, three stats, and a ready-made debate. Where did they get it? Cypher.",
  },
  {
    label: 'Sports Obsessives',
    body: "You don't just watch the game. You study it. Cypher gives you the intelligence to know things your friends won't hear about for three days.",
  },
];

function AudienceCard({ label, body, delay }: { label: string; body: string; delay: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <ScrollReveal delay={delay}>
      <div
        style={{
          borderRadius: '16px',
          padding: '32px',
          background: colors.bgSurface,
          border: `1px solid ${hovered ? colors.borderGold : colors.border}`,
          height: '100%',
          transition: 'border-color 0.25s',
          cursor: 'default',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <h3 style={{
          fontSize: '20px',
          fontWeight: 700,
          color: colors.textPrimary,
          marginBottom: '12px',
          fontFamily: "'DM Serif Display', Georgia, serif",
          lineHeight: 1.3,
        }}>
          {label}
        </h3>
        <p style={{
          fontSize: '14px',
          color: colors.textSecondary,
          lineHeight: 1.6,
          fontFamily: "'Source Sans 3', system-ui, sans-serif",
        }}>
          {body}
        </p>
      </div>
    </ScrollReveal>
  );
}

export default function LandingAudience() {
  return (
    <section style={{ padding: '120px 24px', maxWidth: '1024px', margin: '0 auto' }}>
      <ScrollReveal>
        <h2 style={{
          fontFamily: "'DM Serif Display', Georgia, serif",
          fontSize: 'clamp(28px, 4vw, 40px)',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          textAlign: 'center',
          marginBottom: '64px',
          lineHeight: 1.15,
          color: colors.textPrimary,
        }}>
          Built for anyone who refuses<br />
          <span style={{ color: colors.textSecondary }}>to sound like everyone else.</span>
        </h2>
      </ScrollReveal>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
        {personas.map((p, i) => (
          <AudienceCard key={p.label} label={p.label} body={p.body} delay={i * 0.1} />
        ))}
      </div>

      <ScrollReveal delay={0.15}>
        <p style={{
          textAlign: 'center',
          fontSize: 'clamp(16px, 1.8vw, 20px)',
          color: 'rgba(245,243,239,0.6)',
          fontStyle: 'italic',
          fontFamily: "'DM Serif Display', Georgia, serif",
          maxWidth: '640px',
          margin: '64px auto 0',
          lineHeight: 1.6,
        }}>
          If you&apos;ve ever watched a segment and thought &ldquo;I saw that coming
          three days ago&rdquo; — imagine if you actually had.
        </p>
      </ScrollReveal>
    </section>
  );
}
