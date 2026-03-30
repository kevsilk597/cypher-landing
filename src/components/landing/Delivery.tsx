"use client";

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { VOICE_COPY } from '@/lib/voice';

// ─────────────────────────────────────────────
// INTELLIGENCE DATA PER FILTER
// ─────────────────────────────────────────────
interface IntelCard {
  badge: string;
  badgeColor: string;
  headline: string;
  preview: string;
  entities: string[];
  timeRelevance: string;
  confidence?: number;
}

interface FilterData {
  label: string;
  greeting: string;
  subtitle: string;
  cards: IntelCard[];
}

const FILTERS: FilterData[] = [
  {
    label: 'NBA',
    greeting: '6 things for your day',
    subtitle: '3 games tonight \u00b7 4 signals active',
    cards: [
      {
        badge: 'CONVERGENCE', badgeColor: '#4A90D9',
        headline: 'Six Signals Converging on Tatum Tonight',
        preview: 'Fatigue anomaly, referee bias, free throw routine change \u2014 this combination has surfaced 4 times in 2 seasons. Each time, Tatum\'s foul rate doubled in Q2.',
        entities: ['Celtics', 'Tatum', 'Tony Brothers'], timeRelevance: 'Tonight', confidence: 74,
      },
      {
        badge: 'CONTRADICTION', badgeColor: '#C41230',
        headline: 'Media Says LeBron Is Slowing Down. The Numbers Disagree.',
        preview: 'True shooting at 61.2% \u2014 a 4-year high. On/off differential at +8.4. Court speed: 92nd percentile. The \'Father Time\' narrative has zero data support.',
        entities: ['Lakers', 'LeBron'], timeRelevance: 'Developing',
      },
      {
        badge: 'PATTERN', badgeColor: '#3DADFF',
        headline: 'The Trade Deadline Move Still Disrupting Phoenix',
        preview: 'Durant\'s points in the paint dropped 34%. Booker\'s pull-up frequency spiked to compensate. 4 fourth-quarter leads surrendered in 5 games.',
        entities: ['Suns', 'Durant', 'Booker'], timeRelevance: 'This Week',
      },
    ],
  },
  {
    label: 'NFL',
    greeting: '3 patterns to watch',
    subtitle: 'Week 12 \u00b7 2 signals developing',
    cards: [
      {
        badge: 'PREDICTION', badgeColor: '#4A90D9',
        headline: 'West Coast Team, East Coast 1PM Game: The Pattern Is Brutal',
        preview: 'West Coast teams cover the spread 31% of the time in this setup. On a short week, that drops to 24%.',
        entities: ['49ers', 'Eagles'], timeRelevance: 'Sunday', confidence: 71,
      },
      {
        badge: 'CONVERGENCE', badgeColor: '#4A90D9',
        headline: '4 of 4 Historical Markers Matched. Benching Probability: High.',
        preview: 'Intended air yards dropping every week for a month. Q4 passer rating cratered to 61. Coach referred to him as \'the quarterback\' three times.',
        entities: ['Cowboys', 'Prescott'], timeRelevance: 'This Week', confidence: 82,
      },
      {
        badge: 'COUNTER-NARRATIVE', badgeColor: '#22C55E',
        headline: 'The Case Against the Cowboys Being Done',
        preview: 'Both losses came against top-4 defensive DVOA teams. Pressure rate at 48% \u2014 he\'s playing behind an injury-depleted line, not declining.',
        entities: ['Cowboys', 'Prescott', 'Lamb'], timeRelevance: 'Developing',
      },
    ],
  },
  {
    label: 'NHL',
    greeting: '2 signals active',
    subtitle: '4 games tonight \u00b7 1 prediction live',
    cards: [
      {
        badge: 'PREDICTION', badgeColor: '#4A90D9',
        headline: 'Avalanche Power Play Primed to Break Out Tonight',
        preview: '0-for-9 over 4 games, but shot quality index is 0.847 (elite is 0.720). This pattern preceded a 2+ goal PP explosion 8 of 9 times.',
        entities: ['Avalanche', 'MacKinnon', 'Makar'], timeRelevance: 'Tonight', confidence: 68,
      },
      {
        badge: 'CAUSAL CHAIN', badgeColor: '#3DADFF',
        headline: 'Toronto\'s Goalie Controversy Is Killing Their Power Forward Deployment',
        preview: 'New defensive zone structure \u2192 practice time diverted \u2192 PP efficiency dropped from 24.1% to 17.3% \u2192 offensive zone time down 22%.',
        entities: ['Maple Leafs', 'Matthews'], timeRelevance: 'Developing',
      },
      {
        badge: 'PATTERN', badgeColor: '#4A90D9',
        headline: 'Goalie Rotation Pattern Detected Across 3 Teams',
        preview: 'Three playoff-contending teams shifted to a 60/40 goalie split. Historical data shows this predicts a starter injury in 71% of cases.',
        entities: ['Rangers', 'Panthers', 'Stars'], timeRelevance: 'This Week', confidence: 63,
      },
    ],
  },
  {
    label: 'LeBron',
    greeting: 'Beat: LeBron James',
    subtitle: '5 data points \u00b7 2 signals active',
    cards: [
      {
        badge: 'CONTRADICTION', badgeColor: '#C41230',
        headline: 'The \'Father Time\' Take Has Zero Data Support',
        preview: 'True shooting: 61.2% (4-year high). On/off: +8.4 (best since 2020). Court speed: 92nd percentile.',
        entities: ['LeBron', 'Lakers'], timeRelevance: 'Developing',
      },
      {
        badge: 'PATTERN', badgeColor: '#4A90D9',
        headline: 'LeBron\'s Minutes Pattern Matches His Last 3 Playoff Runs',
        preview: 'Current minute distribution is identical to the load management curve he used in 2020, 2023, and 2025. The dip is the strategy, not the decline.',
        entities: ['LeBron', 'Lakers'], timeRelevance: 'Historical', confidence: 77,
      },
      {
        badge: 'CROSS-REF', badgeColor: '#3DADFF',
        headline: 'LeBron\'s Post-Game Body Language Score Shifted This Week',
        preview: 'Engagement in huddles up 18% since Tuesday. The last time this pattern appeared, the Lakers went on a 9-2 run.',
        entities: ['LeBron', 'Lakers'], timeRelevance: 'This Week',
      },
    ],
  },
];

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="3" stroke="#4A90D9" strokeWidth="1.3" />
      <path d="M8 1.5V3M8 13v1.5M1.5 8H3M13 8h1.5M3.5 3.5l1.1 1.1M11.4 11.4l1.1 1.1M3.5 12.5l1.1-1.1M11.4 4.6l1.1-1.1" stroke="#4A90D9" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
function BoltIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M9 2L4 9h5l-2 5 7-8H9L11 2z" stroke="#4A90D9" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function PulseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M1 8h2.5l2-4 3 8 2-5 1.5 1H15" stroke="#4A90D9" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function GlobeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6" stroke="#4A90D9" strokeWidth="1.3" />
      <ellipse cx="8" cy="8" rx="2.5" ry="6" stroke="#4A90D9" strokeWidth="1.3" />
      <path d="M2 8h12" stroke="#4A90D9" strokeWidth="1.3" />
    </svg>
  );
}

const features = [
  { Icon: SunIcon,   title: VOICE_COPY.landing.features.morningBriefTitle, body: VOICE_COPY.landing.features.morningBriefBody },
  { Icon: BoltIcon,  title: VOICE_COPY.landing.features.breakingSignalsTitle, body: VOICE_COPY.landing.features.breakingSignalsBody },
  { Icon: PulseIcon, title: VOICE_COPY.landing.features.developingStoriesTitle, body: VOICE_COPY.landing.features.developingStoriesBody },
  { Icon: GlobeIcon, title: VOICE_COPY.landing.features.crossLeagueTitle, body: VOICE_COPY.landing.features.crossLeagueBody },
];

const stats = [
  { num: '14', label: 'games monitored' },
  { num: '2,847', label: 'data points' },
  { num: '8', label: 'insights surfaced' },
];

function PhoneCard({ card, index }: { card: IntelCard; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.35, delay: index * 0.08 }}
      style={{
        borderRadius: '12px', padding: '12px 14px', marginBottom: '8px',
        background: 'linear-gradient(135deg, #1A1A1A 0%, #161616 100%)',
        border: '1px solid rgba(42,42,42,0.3)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '7px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: card.badgeColor, boxShadow: `0 0 4px ${card.badgeColor}80` }} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: card.badgeColor }}>{card.badge}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {card.confidence && <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', color: 'rgba(74,144,217,0.6)' }}>{card.confidence}%</span>}
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', padding: '2px 6px', borderRadius: '9999px', color: card.timeRelevance === 'Tonight' || card.timeRelevance === 'Sunday' ? '#22C55E' : 'rgba(245,243,239,0.35)', background: card.timeRelevance === 'Tonight' || card.timeRelevance === 'Sunday' ? 'rgba(34,197,94,0.08)' : 'transparent' }}>{card.timeRelevance}</span>
        </div>
      </div>
      <p style={{ fontSize: '11px', fontWeight: 600, color: '#F5F3EF', lineHeight: 1.45, marginBottom: '5px' }}>{card.headline}</p>
      <p style={{ fontSize: '9.5px', color: '#888', lineHeight: 1.5, marginBottom: '7px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' }}>{card.preview}</p>
      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' as const }}>
        {card.entities.map((entity) => (
          <span key={entity} style={{ fontSize: '8px', fontWeight: 500, padding: '2px 6px', borderRadius: '9999px', background: 'rgba(30,30,30,0.8)', color: 'rgba(245,243,239,0.4)', border: '1px solid rgba(42,42,42,0.5)' }}>{entity}</span>
        ))}
      </div>
    </motion.div>
  );
}

export default function LandingDelivery() {
  const [activeFilter, setActiveFilter] = useState(0);
  const activeData = useMemo(() => FILTERS[activeFilter], [activeFilter]);

  return (
    <section className="delivery-section" style={{ padding: '96px 24px 80px', maxWidth: '1200px', margin: '0 auto' }}>
      <ScrollReveal>
        <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: 700, letterSpacing: '-0.02em', textAlign: 'center', lineHeight: 1.1, marginBottom: '16px' }}>
          <span style={{ color: '#F5F3EF', display: 'block' }}>{VOICE_COPY.landing.deliveryHeadlineTop}</span>
          <span style={{ color: 'rgba(245,243,239,0.45)', display: 'block' }}>{VOICE_COPY.landing.deliveryHeadlineBottom}</span>
        </h2>
        <p style={{ textAlign: 'center', fontSize: '15px', color: '#7A7A7A', maxWidth: '500px', margin: '0 auto 64px', fontFamily: "'Source Sans 3', system-ui, sans-serif", lineHeight: 1.6, textWrap: 'balance' as const }}>
          {VOICE_COPY.landing.deliveryBody}
        </p>
      </ScrollReveal>

      <div className="delivery-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '80px', alignItems: 'center', marginBottom: '80px' }}>
        {/* LEFT: Phone */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', gap: '6px', marginBottom: '24px' }}>
            {FILTERS.map((f, i) => (
              <button
                key={f.label}
                onClick={() => setActiveFilter(i)}
                style={{
                  padding: '10px 20px', borderRadius: '9999px', fontSize: '12px', fontWeight: 600,
                  letterSpacing: '0.02em', textTransform: 'uppercase' as const, cursor: 'pointer',
                  transition: 'all 0.2s', fontFamily: "'JetBrains Mono', monospace",
                  border: i === activeFilter ? 'none' : '1px solid rgba(255,255,255,0.06)',
                  ...(i === activeFilter ? { background: '#4A90D9', color: '#111111' } : { background: 'transparent', color: '#6B6B6B' }),
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', inset: '-80px', pointerEvents: 'none', background: 'radial-gradient(ellipse at 50% 40%, rgba(74,144,217,0.06) 0%, transparent 65%)' }} />
            <motion.div className="phone-wrapper" style={{ width: 'min(280px, 88vw)', position: 'relative', filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.7))', transform: 'rotate(-3deg)' }} animate={{ y: [0, -4, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
              <div style={{ borderRadius: '44px', overflow: 'hidden', background: '#0A0A0A', border: '1px solid rgba(74,144,217,0.15)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03), 0 0 0 1px rgba(0,0,0,0.5)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 28px 6px', background: '#0A0A0A' }}>
                  <span style={{ fontFamily: 'system-ui', fontSize: '12px', fontWeight: 600, color: 'rgba(245,243,239,0.8)' }}>9:41</span>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '2px', alignItems: 'flex-end', height: '11px' }}>
                      {[3, 5, 7, 9].map((h, i) => (<div key={i} style={{ width: '2.5px', height: `${h}px`, borderRadius: '1px', background: `rgba(245,243,239,${i < 3 ? 0.6 : 0.25})` }} />))}
                    </div>
                    <div style={{ width: '22px', height: '10px', borderRadius: '2px', border: '1px solid rgba(245,243,239,0.35)', position: 'relative' }}>
                      <div style={{ position: 'absolute', inset: '1px', borderRadius: '1px', width: '70%', background: 'rgba(245,243,239,0.5)' }} />
                    </div>
                  </div>
                </div>
                <div style={{ padding: '8px 20px 28px', background: '#0A0A0A' }}>
                  <AnimatePresence mode="wait">
                    <motion.div key={`header-${activeFilter}`} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.25 }}>
                      <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', letterSpacing: '0.2em', color: 'rgba(74,144,217,0.5)', textTransform: 'uppercase' as const, marginBottom: '4px' }}>{activeData.subtitle}</p>
                      <h4 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: '22px', fontWeight: 700, color: '#F5F3EF', marginBottom: '16px' }}>{activeData.greeting}</h4>
                    </motion.div>
                  </AnimatePresence>
                  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '14px' }}>
                    {FILTERS.map((f, i) => (<span key={f.label} onClick={() => setActiveFilter(i)} style={{ fontSize: '9px', fontWeight: 600, padding: '4px 10px', borderRadius: '9999px', cursor: 'pointer', transition: 'all 0.2s', ...(i === activeFilter ? { background: '#4A90D9', color: '#111111' } : { background: 'transparent', color: 'rgba(245,243,239,0.4)', border: '1px solid rgba(255,255,255,0.06)' }) }}>{f.label}</span>))}
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.div key={`cards-${activeFilter}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                      {activeData.cards.map((card, i) => (<PhoneCard key={`${activeFilter}-${i}`} card={card} index={i} />))}
                    </motion.div>
                  </AnimatePresence>
                  <div style={{ width: '100px', height: '4px', background: 'rgba(245,243,239,0.2)', borderRadius: '2px', margin: '16px auto 0' }} />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* RIGHT: Features with icons */}
        <div className="delivery-features" style={{ display: 'flex', flexDirection: 'column', gap: '36px', padding: '32px 0' }}>
          {features.map((f, i) => (
            <ScrollReveal key={f.title} delay={i * 0.08}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', maxWidth: '400px' }}>
                <div style={{
                  flexShrink: 0, width: '32px', height: '32px', borderRadius: '8px',
                  background: 'rgba(74,144,217,0.1)', border: '1px solid rgba(74,144,217,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2px',
                }}>
                  <f.Icon />
                </div>
                <div>
                  <h3 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: '20px', fontWeight: 700, color: '#F5F3EF', marginBottom: '8px', lineHeight: 1.3 }}>{f.title}</h3>
                  <p style={{ fontSize: '15px', color: '#A8A8A8', lineHeight: 1.7, fontFamily: "'Source Sans 3', system-ui, sans-serif", textWrap: 'balance' as const }}>{f.body}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Stats */}
      <ScrollReveal>
        <div style={{ borderRadius: '16px', padding: '40px', background: 'linear-gradient(135deg, rgba(26,26,26,0.6) 0%, rgba(20,20,20,0.6) 100%)', border: '1px solid rgba(42,42,42,0.3)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '32px' }}>
          <div>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: 'rgba(74,144,217,0.5)', marginBottom: '20px' }}>A Typical Night</p>
            <div style={{ display: 'flex', gap: '40px' }}>
              {stats.map(stat => (
                <div key={stat.label}>
                  <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: '32px', fontWeight: 700, color: '#5BA7EA', lineHeight: 1, marginBottom: '8px' }}>{stat.num}</p>
                  <p style={{ fontSize: '13px', color: '#7A7A7A', fontFamily: "'Source Sans 3', system-ui, sans-serif" }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          <p style={{ fontSize: '18px', fontWeight: 600, color: '#F5F3EF', textAlign: 'right', maxWidth: '280px', fontFamily: "'Source Sans 3', system-ui, sans-serif" }}>
            Open Cypher. Six things you need to know.{' '}<span style={{ color: '#5BA7EA' }}>Nothing you don&apos;t.</span>
          </p>
        </div>
      </ScrollReveal>

      <style>{`
        @media (max-width: 900px) {
          .delivery-layout { grid-template-columns: 1fr !important; gap: 32px !important; }
          .delivery-layout > div:first-child { align-items: center !important; }
          .phone-wrapper { transform: none !important; }
          .delivery-features { padding: 0 !important; gap: 28px !important; }
          .delivery-features > div > div { max-width: 100% !important; }
        }
        @media (max-width: 600px) {
          .delivery-section { padding: 64px 20px 64px !important; }
        }
      `}</style>
    </section>
  );
}
