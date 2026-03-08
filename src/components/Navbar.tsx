"use client";

import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 bg-background/80 backdrop-blur-md border-b border-card-border/50"
    >
      {/* Left: Logo */}
      <div className="flex items-center">
        <span className="font-serif text-xl font-bold tracking-wide text-foreground">
          CIPHER
        </span>
      </div>

      {/* Center: Tagline */}
      <p className="hidden md:block text-sm text-text-muted italic">
        Finds what nobody&apos;s looking for.
      </p>

      {/* Right: Actions */}
      <div className="flex items-center gap-6">
        <a
          href="https://game-tape-digest.vercel.app"
          className="text-sm text-text-secondary hover:text-foreground transition-colors"
        >
          Sign In
        </a>
        <a
          href="#cta"
          className="text-sm font-semibold px-5 py-2.5 bg-gold text-background rounded-lg hover:bg-gold-light transition-colors"
        >
          Request Access
        </a>
      </div>
    </motion.nav>
  );
}
