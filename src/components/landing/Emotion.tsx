import ScrollReveal from './ScrollReveal';
import { colors } from '@/lib/tokens';

export default function LandingEmotion() {
  return (
    <section style={{
      padding: 'clamp(80px, 12vw, 120px) 24px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      position: 'relative',
      background: 'radial-gradient(ellipse at 50% 50%, #151515 0%, #111111 100%)',
      overflow: 'hidden',
    }}>
      {/* Constellation pattern */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.08,
          pointerEvents: 'none',
          animation: 'shimmer 4s ease-in-out infinite',
        }}
        aria-hidden="true"
      >
        <defs>
          <filter id="blur-dots">
            <feGaussianBlur stdDeviation="0.5" />
          </filter>
        </defs>
        {[
          [80, 60, 240, 120], [240, 120, 400, 80], [400, 80, 560, 160],
          [560, 160, 700, 100], [700, 100, 840, 180], [120, 200, 280, 250],
          [280, 250, 440, 220], [440, 220, 600, 280], [600, 280, 760, 240],
          [80, 60, 120, 200], [400, 80, 440, 220], [700, 100, 760, 240],
          [240, 120, 280, 250], [560, 160, 600, 280],
        ].map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#4A90D9" strokeWidth="0.6" />
        ))}
        {[
          [80, 60], [240, 120], [400, 80], [560, 160], [700, 100], [840, 180],
          [120, 200], [280, 250], [440, 220], [600, 280], [760, 240],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="2.5" fill="#4A90D9" filter="url(#blur-dots)" />
        ))}
      </svg>

      <ScrollReveal>
        <div style={{ maxWidth: '680px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{
            width: '48px',
            height: '2px',
            background: `linear-gradient(90deg, transparent, ${colors.gold}, transparent)`,
            margin: '0 auto 28px',
          }} />
          <h2 style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: 'clamp(28px, 5vw, 48px)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            marginBottom: '12px',
            color: colors.textPrimary,
          }}>
            You fell in love with sports.
          </h2>
          <h3 style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: 'clamp(20px, 3vw, 32px)',
            fontWeight: 700,
            letterSpacing: '-0.01em',
            lineHeight: 1.2,
            color: colors.textSecondary,
            marginBottom: '48px',
          }}>
            Not with refreshing the same feeds as every other show at 4 AM.
          </h3>
          <p style={{
            fontSize: '16px',
            color: colors.textPrimary,
            lineHeight: 1.7,
            maxWidth: '512px',
            margin: '0 auto 20px',
            fontFamily: "'Source Sans 3', system-ui, sans-serif",
            fontWeight: 400,
          }}>
            Cypher gives you back the hours you lose to compilation — so you can spend them on the thing you&apos;re actually great at.
          </p>
          <p style={{
            fontSize: '16px',
            color: colors.textSecondary,
            lineHeight: 1.7,
            maxWidth: '512px',
            margin: '0 auto 20px',
            fontFamily: "'Source Sans 3', system-ui, sans-serif",
          }}>
            Other shows are still scrolling. Yours is already prepared.
          </p>
          <p style={{
            fontSize: '16px',
            color: colors.textPrimary,
            lineHeight: 1.7,
            maxWidth: '512px',
            margin: '0 auto 32px',
            fontFamily: "'Source Sans 3', system-ui, sans-serif",
          }}>
            From pattern to pitch. From signal to segment. From doing homework to walking in prepared.
          </p>
          <div style={{
            width: '32px',
            height: '1px',
            background: colors.gold,
            margin: '0 auto 24px',
            opacity: 0.4,
          }} />
          <p style={{
            fontSize: '18px',
            fontWeight: 600,
            color: colors.textPrimary,
            lineHeight: 1.5,
            maxWidth: '480px',
            margin: '0 auto',
            fontFamily: "'Source Sans 3', system-ui, sans-serif",
          }}>
            The smartest person in the room isn&apos;t working harder. They&apos;re using Cypher.
          </p>
        </div>
      </ScrollReveal>
    </section>
  );
}
