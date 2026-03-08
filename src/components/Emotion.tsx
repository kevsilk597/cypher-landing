"use client";

import ScrollReveal from "./ScrollReveal";

export default function Emotion() {
  return (
    <section
      className="px-6 flex flex-col items-center justify-center text-center"
      style={{
        paddingTop: "clamp(80px, 12vw, 140px)",
        paddingBottom: "clamp(80px, 12vw, 140px)",
        background:
          "radial-gradient(ellipse at 50% 50%, #151515 0%, #111111 100%)",
      }}
    >
      <ScrollReveal className="max-w-3xl mx-auto">
        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15] mb-4">
          You fell in love with this game.
        </h2>
        <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-[1.2] text-text-secondary mb-10">
          Not with refreshing the same feeds as every other show at 4 AM.
        </h3>
        <p className="text-base md:text-lg text-text-secondary leading-relaxed max-w-xl mx-auto mb-6">
          Cipher gives you back the hours you lose to compilation — so you can
          spend them on the thing you&apos;re actually great at.
        </p>
        <p className="text-base md:text-lg text-text-secondary leading-relaxed max-w-xl mx-auto">
          Other shows are still scrolling. Yours is already prepared.
        </p>
      </ScrollReveal>
    </section>
  );
}
