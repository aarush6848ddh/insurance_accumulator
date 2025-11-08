"use client";

import { motion } from 'framer-motion';
import { FloatingHeader } from './ui/floating-header';

export default function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Floating Header Navigation */}
      <div className="sticky top-0 z-50 pt-5 pb-2 px-4">
        <FloatingHeader />
      </div>

      {/* Main Content */}
      <motion.main
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {children}
      </motion.main>

      {/* Professional Footer */}
      <motion.footer
        className="border-t border-gray-200 bg-white mt-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Insurance Accumulator. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span>Powered by</span>
              <span className="font-medium text-gray-600">Spring Boot</span>
              <span>+</span>
              <span className="font-medium text-gray-600">Next.js</span>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
