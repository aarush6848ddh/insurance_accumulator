"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Shell({ children }: { children: React.ReactNode }) {
  const { scrollY } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Parallax effects
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const y3 = useTransform(scrollY, [0, 300], [0, -150]);

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Enhanced animated background with multiple layers */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full blur-3xl floating"
        style={{ 
          background: 'radial-gradient(circle at 30% 30%, rgba(99,102,241,0.25), transparent 60%)',
          y: y1,
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />
      
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-32 h-[28rem] w-[28rem] rounded-full blur-3xl"
        style={{ 
          background: 'radial-gradient(circle at 70% 70%, rgba(56,189,248,0.22), transparent 60%)',
          y: y2,
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, delay: 0.3, ease: "easeOut" }}
      />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 h-64 w-64 rounded-full blur-2xl"
        style={{ 
          background: 'radial-gradient(circle at 50% 50%, rgba(168,85,247,0.15), transparent 70%)',
          y: y3,
        }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.5, delay: 0.6, ease: "easeOut" }}
      />

      {/* Interactive cursor glow effect */}
      <motion.div
        className="pointer-events-none fixed z-10 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(102,126,234,0.3), transparent 70%)',
          x: mousePosition.x - 192,
          y: mousePosition.y - 192,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
      />

      {/* Enhanced navigation with glassmorphism */}
      <motion.nav
        className="sticky top-0 z-20 bg-black/20 backdrop-blur-xl border-b border-white/10"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        }}
      >
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <motion.div
            className="flex items-center gap-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <motion.div
              className="text-white font-bold tracking-wide text-xl"
              whileHover={{ scale: 1.05 }}
            >
              <span className="gradient-text">Accumulator Demo</span>
            </motion.div>
            <motion.nav className="hidden md:flex items-center gap-6">
              <motion.a
                href="/home"
                className="text-white/70 hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                Home
              </motion.a>
              <motion.a
                href="/"
                className="text-white/70 hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                Demo
              </motion.a>
            </motion.nav>
          </motion.div>
          
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <motion.div
              className="text-white/70 text-sm"
              whileHover={{ scale: 1.05 }}
            >
              Powered by Spring + Next.js
            </motion.div>
            
            <motion.div
              className="w-2 h-2 rounded-full bg-green-400 pulse-glow"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, duration: 0.3 }}
            />
          </motion.div>
        </div>
      </motion.nav>

      <motion.main
        className="relative mx-auto max-w-6xl px-4 py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {children}
      </motion.main>

      <motion.footer
        className="mx-auto max-w-6xl px-4 py-8 text-center text-white/40 text-sm"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="inline-block"
        >
          © {new Date().getFullYear()} Accumulator Demo
        </motion.div>
      </motion.footer>
    </div>
  );
}
