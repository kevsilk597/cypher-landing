"use client";

import LandingNavbar from './Navbar';
import LandingHero from './Hero';
import LandingSameness from './Sameness';
import LandingConvergenceFunnel from './ConvergenceFunnel';
import LandingDelivery from './Delivery';
import LandingSignalToSegment from './SignalToSegment';
import LandingEmotion from './Emotion';
import LandingAudience from './Audience';
import LandingFinalCTA from './FinalCTA';

function SectionDivider() {
  return <div className="section-divider" style={{ margin: '0 auto' }} />;
}

export function LandingPage() {
  return (
    <div style={{
      background: '#111111',
      color: '#F5F3EF',
      minHeight: '100vh',
      fontFamily: "'Source Sans 3', system-ui, sans-serif",
      scrollBehavior: 'smooth',
      position: 'relative',
    }}>
      {/* Noise texture overlay — entire page */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
          opacity: 0.025,
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'overlay',
        }}
      />

      <LandingNavbar />
      <LandingHero />

      <SectionDivider />
      <LandingSameness />

      <SectionDivider />
      <LandingConvergenceFunnel />

      <SectionDivider />
      <LandingSignalToSegment />

      <SectionDivider />
      <LandingDelivery />

      <SectionDivider />
      <LandingEmotion />

      <SectionDivider />
      <LandingAudience />

      <LandingFinalCTA />
    </div>
  );
}
