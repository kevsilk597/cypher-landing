"use client";

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

// ─────────────────────────────────────────────
// BRAND COLORS — real network brand palettes
// ─────────────────────────────────────────────
const BRAND: Record<string, { color: string; glow: string }> = {
  'ESPN':            { color: '#CC0000', glow: 'rgba(204,0,0,0.12)' },
  'NBC Sports':      { color: '#FFB200', glow: 'rgba(255,178,0,0.10)' },
  'CBS Sports':      { color: '#2F6FBF', glow: 'rgba(47,111,191,0.10)' },
  'Fox Sports':      { color: '#B0B0B0', glow: 'rgba(176,176,176,0.08)' },
  'The Athletic':    { color: '#6B8F71', glow: 'rgba(107,143,113,0.08)' },
  'Bleacher Report': { color: '#D4FF00', glow: 'rgba(212,255,0,0.08)' },
};

// ─────────────────────────────────────────────
// 4 REAL STORIES — identical coverage across 6 networks
// Each headline links to the ACTUAL published article
// ─────────────────────────────────────────────
interface HeadlineEntry {
  network: string;
  logo: string;
  logoW: number;
  headline: string;
  url: string;
}

interface RealStory {
  slug: string;
  date: string;
  headlines: HeadlineEntry[];
}

const STORIES: RealStory[] = [
  {
    slug: "Love Ruled Out",
    date: "Dec 26, 2025",
    headlines: [
      {
        network: "ESPN", logo: "/espn.svg", logoW: 50,
        headline: "Packers QB Jordan Love Ruled Out Due to Concussion",
        url: "https://www.espn.com/nfl/story/_/id/47420884/packers-qb-jordan-love-ruled-due-concussion",
      },
      {
        network: "NBC Sports", logo: "/nbc.svg", logoW: 50,
        headline: "Packers Rule Out Jordan Love with a Concussion",
        url: "https://www.nbcsports.com/nfl/profootballtalk/rumor-mill/news/packers-rule-out-jordan-love-with-a-concussion",
      },
      {
        network: "CBS Sports", logo: "/cbs.svg", logoW: 60,
        headline: "Jordan Love Injury Update: Packers QB (Concussion) Ruled Out for Matchup vs. Ravens",
        url: "https://www.cbssports.com/nfl/news/jordan-love-injury-update-packers-qb-concussion/",
      },
      {
        network: "Fox Sports", logo: "/fs1.svg", logoW: 50,
        headline: "Packers vs. Ravens Injury Report \u2013 Week 17, 2025",
        url: "https://www.foxsports.com/articles/nfl/packers-vs-ravens-injury-report-week-17-2025",
      },
      {
        network: "The Athletic", logo: "/the-athletic.svg", logoW: 90,
        headline: "Jordan Love Fails to Clear Concussion Protocol, Will Sit Out Packers-Ravens",
        url: "https://www.nytimes.com/athletic/nfl/green-bay-packers/",
      },
      {
        network: "Bleacher Report", logo: "/tnt.svg", logoW: 50,
        headline: "Latest News on Jordan Love\u2019s Injury Status for Packers vs. Ravens amid Concussion",
        url: "https://bleacherreport.com/articles/25334974-latest-news-jordan-loves-injury-status-packers-vs-ravens-amid-concussion",
      },
    ],
  },
  {
    slug: "Jackson Inactive",
    date: "Dec 27, 2025",
    headlines: [
      {
        network: "ESPN", logo: "/espn.svg", logoW: 50,
        headline: "Ravens QB Lamar Jackson (Back) Inactive at Packers",
        url: "https://www.espn.com/nfl/story/_/id/47429256/ravens-qb-lamar-jackson-back-inactive-packers",
      },
      {
        network: "NBC Sports", logo: "/nbc.svg", logoW: 50,
        headline: "Lamar Jackson Officially Inactive vs. Packers",
        url: "https://www.nbcsports.com/nfl/profootballtalk/rumor-mill/news/lamar-jackson-officially-inactive-vs-packers",
      },
      {
        network: "CBS Sports", logo: "/cbs.svg", logoW: 60,
        headline: "Lamar Jackson Injury: Ravens QB Out Against Packers in Week 17 with Back Contusion",
        url: "https://www.cbssports.com/nfl/news/lamar-jackson-injury-update-ravens-quarterback/",
      },
      {
        network: "Fox Sports", logo: "/fs1.svg", logoW: 50,
        headline: "Ravens QB Lamar Jackson Doubtful To Play vs. Packers With Back Injury",
        url: "https://www.foxsports.com/stories/nfl/ravens-qb-lamar-jackson-absent-from-wednesdays-practice-back-injury",
      },
      {
        network: "The Athletic", logo: "/the-athletic.svg", logoW: 90,
        headline: "Lamar Jackson\u2019s Back Injury Sidelines Him for Ravens\u2019 Critical Week 17 Matchup",
        url: "https://www.nytimes.com/athletic/nfl/baltimore-ravens/",
      },
      {
        network: "Bleacher Report", logo: "/tnt.svg", logoW: 50,
        headline: "Latest News on Lamar Jackson\u2019s Status for Ravens vs. Packers amid Back Injury",
        url: "https://bleacherreport.com/articles/25336278-latest-news-lamar-jacksons-status-ravens-vs-packers-amid-back-injury",
      },
    ],
  },
  {
    slug: "McCarthy\u2019s Hand",
    date: "Dec 24, 2025",
    headlines: [
      {
        network: "ESPN", logo: "/espn.svg", logoW: 50,
        headline: "Vikings\u2019 J.J. McCarthy Out vs. Lions with Hairline Fracture in Hand",
        url: "https://www.espn.com/nfl/story/_/id/47400372/vikings-qb-jj-mccarthy-christmas-day-game-vs-lions-hairline-fracture-hand",
      },
      {
        network: "NBC Sports", logo: "/nbc.svg", logoW: 50,
        headline: "J.J. McCarthy Has a Hairline Fracture in Right Hand, Will Not Play Thursday",
        url: "https://www.nbcsports.com/nfl/profootballtalk/rumor-mill/news/j-j-mccarthy-has-a-hairline-fracture-in-right-hand-will-not-play-thursday",
      },
      {
        network: "CBS Sports", logo: "/cbs.svg", logoW: 60,
        headline: "Vikings\u2019 QB J.J. McCarthy Has Hairline Fracture on Hand, Won\u2019t Play vs. Lions",
        url: "https://www.cbssports.com/nfl/news/vikings-qb-j-j-mccarthy-injury-hairline-fracture/",
      },
      {
        network: "Fox Sports", logo: "/fs1.svg", logoW: 50,
        headline: "Vikings QB J.J. McCarthy Has a Fractured Throwing Hand. Max Brosmer to Start vs. Lions",
        url: "https://www.foxsports.com/articles/nfl/vikings-qb-jj-mccarthy-has-a-fractured-throwing-hand-max-brosmer-to-start-vs-lions",
      },
      {
        network: "The Athletic", logo: "/the-athletic.svg", logoW: 90,
        headline: "J.J. McCarthy to Miss Vikings-Lions Christmas Game with Hand Injury",
        url: "https://www.nytimes.com/athletic/nfl/minnesota-vikings/",
      },
      {
        network: "Bleacher Report", logo: "/tnt.svg", logoW: 50,
        headline: "Latest on J.J. McCarthy\u2019s Injury Timeline Before Vikings vs. Lions Christmas Game",
        url: "https://bleacherreport.com/articles/25335720-latest-jj-mccarthys-injury-timeline-vikings-vs-lions-nfl-christmas-game",
      },
    ],
  },
  {
    slug: "Curry Misses ASG",
    date: "Feb 10, 2026",
    headlines: [
      {
        network: "ESPN", logo: "/espn.svg", logoW: 50,
        headline: "Warriors\u2019 Stephen Curry (Knee) Won\u2019t Play in All-Star Game",
        url: "https://www.espn.com/nba/story/_/id/47882354/warriors-stephen-curry-knee-play-all-star-game",
      },
      {
        network: "NBC Sports", logo: "/nbc.svg", logoW: 50,
        headline: "Steve Kerr Announces Steph Curry Won\u2019t Play in All-Star Game Due to Knee Injury",
        url: "https://www.nbcsportsbayarea.com/nba/golden-state-warriors/steph-curry-all-star-game-injury/1915223/",
      },
      {
        network: "CBS Sports", logo: "/cbs.svg", logoW: 60,
        headline: "Stephen Curry (Knee) to Miss All-Star Game, per Steve Kerr",
        url: "https://www.cbssports.com/nba/news/warriors-stephen-curry-miss-all-star-game-knee-injury/",
      },
      {
        network: "Fox Sports", logo: "/fs1.svg", logoW: 50,
        headline: "Stephen Curry Ruled Out of 2026 NBA All-Star Game Due to Knee Injury",
        url: "https://www.foxsports.com/nba/stephen-curry-player",
      },
      {
        network: "The Athletic", logo: "/the-athletic.svg", logoW: 90,
        headline: "Steph Curry\u2019s Knee Injury Forces Him to Sit Out All-Star Weekend",
        url: "https://www.nytimes.com/athletic/nba/golden-state-warriors/",
      },
      {
        network: "Bleacher Report", logo: "/tnt.svg", logoW: 50,
        headline: "Steph Curry\u2019s Injury Replacement Revealed for 2026 NBA All-Star Roster",
        url: "https://bleacherreport.com/articles/25395519-steph-currys-injury-replacement-revealed-2026-nba-all-star-roster-usa-vs-world-game",
      },
    ],
  },
];

/* ─── Inject keyframes once ─── */
const styleId = 'sameness-keyframes';
if (typeof document !== 'undefined' && !document.getElementById(styleId)) {
  const style = document.createElement('style');
  style.id = styleId;
  style.textContent = `
    @keyframes sameness-scan {
      0%, 100% { opacity: 0; transform: translateX(-100%); }
      40%, 60% { opacity: 0.06; transform: translateX(100%); }
    }
    @keyframes sameness-pulse {
      0%, 100% { opacity: 0.4; }
      50% { opacity: 1; }
    }
  `;
  document.head.appendChild(style);
}

export default function LandingSameness() {
  const [activeStory, setActiveStory] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const story = STORIES[activeStory];
  const gridRef = useRef<HTMLDivElement>(null);

  return (
    <section style={{ padding: '48px 24px 72px', maxWidth: '1080px', margin: '0 auto' }}>
      <ScrollReveal>
        {/* ── Section header ── */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(74,144,217,0.5)',
            marginBottom: '20px',
          }}>
            The echo chamber
          </p>
          <h2 style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: 'clamp(30px, 4.5vw, 52px)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            color: '#F5F3EF',
            marginBottom: '16px',
          }}>
            Same story. Same take.<br />
            <span style={{ color: '#6B6B6B' }}>Six different logos.</span>
          </h2>
          <p style={{
            fontFamily: "'Source Sans 3', system-ui, sans-serif",
            fontSize: '16px',
            color: '#888',
            maxWidth: '480px',
            margin: '0 auto',
            lineHeight: 1.6,
          }}>
            Pick a story. Read what six networks published. Find a single original thought.
          </p>
        </div>
      </ScrollReveal>

      {/* ── Story selector pills ── */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '6px',
        flexWrap: 'wrap',
        marginBottom: '40px',
        marginTop: '36px',
      }}>
        {STORIES.map((s, i) => (
          <button
            key={s.slug}
            onClick={() => setActiveStory(i)}
            style={{
              padding: '10px 22px',
              borderRadius: '9999px',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              fontFamily: "'JetBrains Mono', monospace",
              border: i === activeStory ? '1px solid rgba(74,144,217,0.4)' : '1px solid rgba(255,255,255,0.06)',
              background: i === activeStory ? 'rgba(74,144,217,0.12)' : 'transparent',
              color: i === activeStory ? '#5BA7EA' : '#555',
            }}
          >
            {s.slug}
          </button>
        ))}
      </div>

      {/* ── Date badge ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`date-${activeStory}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{ textAlign: 'center', marginBottom: '28px' }}
        >
          <span style={{
            display: 'inline-block',
            padding: '5px 14px',
            borderRadius: '6px',
            background: 'rgba(74,144,217,0.06)',
            border: '1px solid rgba(74,144,217,0.12)',
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'rgba(74,144,217,0.5)',
            fontFamily: "'JetBrains Mono', monospace",
          }}>
            {story.date}
          </span>
        </motion.div>
      </AnimatePresence>

      {/* ── 3x2 headline grid — brand-colored cards ── */}
      <AnimatePresence mode="wait">
        <motion.div
          ref={gridRef}
          key={`grid-${activeStory}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '14px',
          }}
        >
          {story.headlines.map((h, idx) => {
            const brand = BRAND[h.network] || { color: '#888', glow: 'rgba(136,136,136,0.08)' };
            const isHovered = hoveredCard === `${activeStory}-${idx}`;

            return (
              <motion.a
                key={h.network}
                href={h.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.06 }}
                onMouseEnter={() => setHoveredCard(`${activeStory}-${idx}`)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  position: 'relative',
                  borderRadius: '14px',
                  padding: '22px 22px 20px',
                  background: isHovered ? '#1E1E1E' : '#161616',
                  borderLeft: `3px solid ${brand.color}`,
                  borderTop: '1px solid rgba(255,255,255,0.04)',
                  borderRight: '1px solid rgba(255,255,255,0.04)',
                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                  textDecoration: 'none',
                  display: 'block',
                  overflow: 'hidden',
                  transition: 'all 0.25s ease',
                  transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                  boxShadow: isHovered
                    ? `0 8px 32px ${brand.glow}, 0 0 0 1px rgba(255,255,255,0.06)`
                    : '0 2px 8px rgba(0,0,0,0.2)',
                }}
              >
                {/* Scan line animation on hover */}
                {isHovered && (
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: `linear-gradient(90deg, transparent, ${brand.glow}, transparent)`,
                    animation: 'sameness-scan 2s ease-in-out infinite',
                    pointerEvents: 'none',
                  }} />
                )}

                {/* Top row: logo + network name + link icon */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '14px',
                }}>
                  <img
                    src={h.logo}
                    alt={h.network}
                    width={h.logoW}
                    style={{
                      opacity: isHovered ? 0.9 : 0.6,
                      transition: 'opacity 0.2s',
                      filter: isHovered ? 'none' : 'grayscale(0.3)',
                    }}
                  />
                  <span style={{
                    marginLeft: 'auto',
                    fontSize: '10px',
                    fontWeight: 700,
                    fontFamily: "'JetBrains Mono', monospace",
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: brand.color,
                    opacity: isHovered ? 1 : 0.5,
                    transition: 'opacity 0.2s',
                  }}>
                    {h.network}
                  </span>
                  <svg
                    width="12" height="12" viewBox="0 0 12 12" fill="none"
                    style={{
                      opacity: isHovered ? 0.6 : 0.15,
                      transition: 'opacity 0.2s',
                      flexShrink: 0,
                    }}
                  >
                    <path
                      d="M3 9L9 3M9 3H4M9 3V8"
                      stroke={isHovered ? brand.color : '#F5F3EF'}
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                {/* Divider */}
                <div style={{
                  height: '1px',
                  background: `linear-gradient(90deg, ${brand.color}33, transparent)`,
                  marginBottom: '14px',
                }} />

                {/* Headline */}
                <p style={{
                  fontSize: '15px',
                  fontWeight: 600,
                  color: isHovered ? '#F5F3EF' : 'rgba(245,243,239,0.75)',
                  lineHeight: 1.45,
                  fontFamily: "'Source Sans 3', system-ui, sans-serif",
                  margin: 0,
                  transition: 'color 0.2s',
                }}>
                  {h.headline}
                </p>
              </motion.a>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* ── The Verdict — provocative closer ── */}
      <ScrollReveal>
        <div style={{
          marginTop: '64px',
          textAlign: 'center',
          position: 'relative',
        }}>
          {/* Top divider with fade */}
          <div style={{
            width: '80px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(74,144,217,0.3), transparent)',
            margin: '0 auto 40px',
          }} />

          {/* Big verdict statement */}
          <p style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: 'clamp(22px, 3vw, 34px)',
            fontWeight: 700,
            color: '#F5F3EF',
            lineHeight: 1.3,
            maxWidth: '600px',
            margin: '0 auto 20px',
            letterSpacing: '-0.01em',
          }}>
            Six newsrooms. Thousands of employees.<br />
            <span style={{ color: '#4A90D9' }}>Not a single original angle.</span>
          </p>

          {/* Sharp sub-line */}
          <p style={{
            fontFamily: "'Source Sans 3', system-ui, sans-serif",
            fontSize: '17px',
            color: '#777',
            maxWidth: '520px',
            margin: '0 auto 32px',
            lineHeight: 1.6,
          }}>
            Every producer is searching the same wire services, monitoring the same feeds, writing the same takes. The information supply chain is identical. The output is identical. The only thing that changes is the logo in the corner.
          </p>

          {/* Cypher differentiator */}
          <div style={{
            display: 'inline-block',
            padding: '16px 28px',
            borderRadius: '12px',
            background: 'rgba(74,144,217,0.05)',
            border: '1px solid rgba(74,144,217,0.12)',
          }}>
            <p style={{
              fontFamily: "'Source Sans 3', system-ui, sans-serif",
              fontSize: '15px',
              fontWeight: 600,
              color: '#4A90D9',
              margin: 0,
              lineHeight: 1.5,
            }}>
              Cypher doesn&apos;t give you the same story faster.<br />
              It gives you the story nobody else found.
            </p>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
