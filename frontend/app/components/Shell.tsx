"use client";

import { motion } from 'framer-motion';

export default function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated background glows */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full blur-3xl"
        style={{ background:
          'radial-gradient(circle at 30% 30%, rgba(99,102,241,0.25), transparent 60%)' }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-32 h-[28rem] w-[28rem] rounded-full blur-3xl"
        style={{ background:
          'radial-gradient(circle at 70% 70%, rgba(56,189,248,0.22), transparent 60%)' }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.2 }}
      />

      <motion.nav
        className="sticky top-0 z-20 bg-black/30 backdrop-blur border-b border-white/10"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <motion.div
            className="text-white font-semibold tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            Benefits Portal
          </motion.div>
          <motion.div
            className="text-white/70 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
          >
            Powered by Spring + Next.js
          </motion.div>
        </div>
      </motion.nav>

      <motion.main
        className="relative mx-auto max-w-6xl px-4 py-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.main>

      <motion.footer
        className="mx-auto max-w-6xl px-4 py-8 text-center text-white/40 text-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        © {new Date().getFullYear()} Benefits Portal
      </motion.footer>
    </div>
  );
}
