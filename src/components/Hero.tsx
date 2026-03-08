"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-[78vh] flex flex-col items-center justify-center px-6 overflow-hidden pt-20 pb-14">
      {/* Subtle gold ambient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(ellipse at 30% 50%, rgba(184,149,42,0.08) 0%, transparent 50%), radial-gradient(ellipse at 70% 50%, rgba(184,149,42,0.04) 0%, transparent 50%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #F5F3EF 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center max-w-4xl"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-8"
        >
          Know what to talk about
          <br />
          before anyone else does.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          The sports intelligence engine that tracks what nobody&apos;s
          watching — and surfaces the stories nobody else can find.
        </motion.p>

        <motion.a
          href="#cta"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="inline-block px-8 py-4 bg-gold text-background font-semibold rounded-lg hover:bg-gold-light transition-all duration-300 hover:shadow-[0_0_30px_rgba(184,149,42,0.25)] cursor-pointer"
        >
          Request Access
        </motion.a>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-6 text-sm text-text-muted"
        >
          Currently onboarding a limited number of early subscribers.
        </motion.p>
      </motion.div>

    </section>
  );
}
