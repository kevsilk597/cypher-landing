"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const cyclingHeadlines = [
  "LeBron Scores 30 to Lead Lakers Comeback Win",
  "Cowboys Upset in Sunday Night Drama",
  "Trade Deadline Approaching — Stars on the Move",
  "Championship Favorites Emerge After Mid-Season Break",
  "Coach on Hot Seat as Front Office Tension Grows",
];

const networkCards = [
  { network: "ESPN", logo: "/logos/espn.svg", logoW: 50, logoH: 18 },
  {
    network: "The Athletic",
    logo: "/logos/the-athletic.svg",
    logoW: 90,
    logoH: 22,
  },
  { network: "TNT", logo: "/logos/tnt.svg", logoW: 50, logoH: 18 },
  { network: "CBS", logo: "/logos/cbs.svg", logoW: 60, logoH: 20 },
  { network: "FS1", logo: "/logos/fs1.svg", logoW: 50, logoH: 20 },
  { network: "NBC", logo: "/logos/nbc.svg", logoW: 50, logoH: 18 },
];

export default function Sameness() {
  const [headlineIndex, setHeadlineIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeadlineIndex((i) => (i + 1) % cyclingHeadlines.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="px-6 py-24 md:py-32 max-w-5xl mx-auto">
      <ScrollReveal>
        <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-center mb-4 leading-tight">
          Every show sounds the same.
          <br />
          <span className="text-text-secondary">Yours doesn&apos;t have to.</span>
        </h2>
        <p className="text-center text-sm text-text-muted mb-16 max-w-md mx-auto">
          50+ sports shows on air every day. Watch closely.
        </p>
      </ScrollReveal>

      {/* 3x2 Card Grid — all showing the same cycling headline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {networkCards.map((card) => (
          <div
            key={card.network}
            className="rounded-xl p-5 group transition-all duration-300 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #1A1A1A 0%, #151515 100%)",
              border: "1px solid rgba(42,42,42,0.5)",
            }}
          >
            {/* Subtle hover glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 0%, rgba(184,149,42,0.03) 0%, transparent 70%)",
              }}
            />

            {/* Logo */}
            <div className="mb-4 h-6 flex items-center relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.logo}
                alt={card.network}
                width={card.logoW}
                height={card.logoH}
                className="opacity-50 group-hover:opacity-70 transition-opacity duration-300"
                style={{ filter: "brightness(1.2)" }}
              />
            </div>

            {/* Cycling headline — ALL cards show the same headline simultaneously */}
            <div className="relative min-h-[44px]">
              <AnimatePresence mode="wait">
                <motion.p
                  key={headlineIndex}
                  className="text-[13.5px] font-semibold text-foreground/85 leading-snug"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45 }}
                >
                  {cyclingHeadlines[headlineIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Subtle bottom line */}
            <div
              className="absolute bottom-0 left-5 right-5 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(184,149,42,0.08) 50%, transparent 100%)",
              }}
            />
          </div>
        ))}
      </div>

      {/* Body copy */}
      <ScrollReveal className="mt-12 text-center max-w-xl mx-auto">
        <p className="text-base font-semibold text-foreground mb-3">
          Six networks. One story. The same angle told six ways.
        </p>
        <p className="text-base text-text-secondary mb-3">
          That&apos;s not competition — that&apos;s an echo chamber.
        </p>
        <p className="text-base text-text-secondary">
          Nobody is connecting a referee&apos;s foul rate to a player&apos;s
          free throw surge to a contract incentive clause. That requires holding
          15 data points across 3 domains simultaneously. No human can do that
          at scale.
        </p>
      </ScrollReveal>
    </section>
  );
}
