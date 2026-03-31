"use client";

import ScrollReveal from "./ScrollReveal";

export default function FinalCTA() {
  return (
    <>
      {/* Interstitial: No market bias */}
      <div className="px-6 py-14 text-center">
        <ScrollReveal>
          <p
            className="text-[13px] md:text-[14.5px] italic max-w-xl mx-auto leading-relaxed"
            style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              color: "rgba(184,149,42,0.45)",
            }}
          >
            No market bias. No brand loyalty. No defaults. Just the stories that
            matter — including the ones no human would think to look for.
          </p>
        </ScrollReveal>
      </div>

      {/* Gold gradient separator */}
      <div
        className="mx-auto"
        style={{
          height: "1px",
          maxWidth: "600px",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(184,149,42,0.25) 25%, rgba(212,178,69,0.5) 50%, rgba(184,149,42,0.25) 75%, transparent 100%)",
        }}
      />

      <section
        id="cta"
        className="px-6 py-24 md:py-32 flex flex-col items-center justify-center text-center"
      >
        <ScrollReveal className="max-w-lg mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight mb-6">
            Request early access.
          </h2>
          <p className="text-[15px] text-text-secondary leading-relaxed mb-3 max-w-md mx-auto">
            Each deployment is configured to your beats, entities, and coverage
            areas.
          </p>
          <p className="text-[14px] text-text-muted leading-relaxed mb-10 max-w-md mx-auto">
            We&apos;re onboarding a limited number of subscribers who want to
            see what sports intelligence actually looks like.
          </p>
          <a
            href="mailto:kev.silk2@gmail.com"
            className="inline-block px-9 py-3.5 bg-gold text-background font-semibold rounded-lg hover:bg-gold-light transition-all duration-300 hover:shadow-[0_0_30px_rgba(184,149,42,0.25)] cursor-pointer"
          >
            Request Access
          </a>
          <p className="mt-5 text-[13px] text-text-muted">
            Questions? Reach out — we&apos;ll show you exactly how it works.
          </p>
        </ScrollReveal>
      </section>

      {/* Footer */}
      <footer className="pb-10 text-center">
        <p className="text-xs text-foreground/40">© 2026 Cipher</p>
      </footer>
    </>
  );
}
