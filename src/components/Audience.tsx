"use client";

import ScrollReveal from "./ScrollReveal";

const personas = [
  {
    label: "For the producers and researchers",
    body: "Who prepare the conversation before it happens — and need ammunition no other show has.",
  },
  {
    label: "For the hosts and analysts",
    body: "Who are tired of reacting to the same angles — and want to lead with something nobody saw coming.",
  },
  {
    label: "For the sports obsessives",
    body: "Who care about the game beneath the game — not just what's trending.",
  },
];

export default function Audience() {
  return (
    <section className="px-6 py-24 md:py-32 max-w-6xl mx-auto">
      <ScrollReveal>
        <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-center mb-16 leading-tight">
          Built for anyone who refuses
          <br />
          <span className="text-text-secondary">
            to sound like everyone else.
          </span>
        </h2>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {personas.map((p, i) => (
          <ScrollReveal key={p.label} delay={i * 0.1}>
            <div
              className="rounded-xl p-6 md:p-8 h-full"
              style={{
                background: "#1A1A1A",
                borderLeft: "3px solid #B8952A",
              }}
            >
              <h3 className="text-[15px] font-bold text-foreground mb-3">
                {p.label}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {p.body}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Closing line */}
      <ScrollReveal className="mt-16 text-center max-w-2xl mx-auto">
        <p
          className="text-[18px] md:text-xl leading-relaxed"
          style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            color: "rgba(245,243,239,0.6)",
            fontStyle: "italic",
          }}
        >
          If you&apos;ve ever watched a segment and thought &ldquo;I saw that
          coming three days ago&rdquo; — imagine if you actually had.
        </p>
      </ScrollReveal>
    </section>
  );
}
