"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HomePage() {
  return (
    <motion.div 
      className="space-y-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <motion.section 
        className="text-center space-y-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="relative inline-block"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold gradient-text mb-4"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Insurance Accumulator
          </motion.h1>
          <motion.h2
            className="text-2xl md:text-3xl font-semibold text-white/80 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            Understanding Healthcare Cost Management
          </motion.h2>
          <motion.div
            className="absolute -inset-8 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl -z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>
        
        <motion.div
          className="max-w-4xl mx-auto space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <motion.p
            className="text-white/90 text-xl leading-relaxed"
            whileHover={{ scale: 1.01 }}
          >
            A comprehensive exploration of healthcare accumulator models developed during my 
            <span className="gradient-text font-semibold"> summer training at Optum</span>, 
            where I delved deep into understanding how insurance companies manage and track 
            member healthcare costs throughout the benefit year.
          </motion.p>
          
          <motion.div
            className="flex justify-center items-center gap-2 text-white/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-green-400"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm">Interactive Demo System</span>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Story Section */}
      <motion.section 
        className="card p-8 md:p-12"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        whileHover={{ y: -4 }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold gradient-text mb-4"
              whileHover={{ scale: 1.05 }}
            >
              My Optum Summer Training Journey
            </motion.h2>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <motion.div
                className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/20 backdrop-blur-sm"
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-3">
                  <motion.span
                    className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    1
                  </motion.span>
                  Deep Dive into Accumulator Models
                </h3>
                <p className="text-white/80 leading-relaxed">
                  During my summer at Optum, I worked extensively with accumulator models that track 
                  member healthcare spending against their deductibles, copays, and out-of-pocket maximums. 
                  This system ensures accurate cost-sharing calculations throughout the benefit year.
                </p>
              </motion.div>

              <motion.div
                className="p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-white/20 backdrop-blur-sm"
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-3">
                  <motion.span
                    className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center text-white font-bold"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 0.5 }}
                  >
                    2
                  </motion.span>
                  Real-World Implementation
                </h3>
                <p className="text-white/80 leading-relaxed">
                  I developed and tested accumulator logic for various insurance products, ensuring 
                  that members' healthcare costs are properly tracked and applied against their 
                  benefit structures. This included working with HIPAA codes, coverage periods, 
                  and complex cost-sharing scenarios.
                </p>
              </motion.div>

              <motion.div
                className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-white/20 backdrop-blur-sm"
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-3">
                  <motion.span
                    className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1 }}
                  >
                    3
                  </motion.span>
                  Building This Demo
                </h3>
                <p className="text-white/80 leading-relaxed">
                  This interactive demo showcases the accumulator concepts I learned, allowing you to 
                  explore how different benefit plans handle cost-sharing and how members' healthcare 
                  expenses accumulate throughout the year.
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <motion.div
                className="p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 border border-white/20 backdrop-blur-xl"
                whileHover={{ scale: 1.02, rotateY: 2 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <h3 className="text-2xl font-bold text-white mb-6 text-center">Key Learnings</h3>
                <div className="space-y-4">
                  {[
                    "Accumulator models track member spending in real-time",
                    "HIPAA codes determine which services count toward deductibles",
                    "Cost-sharing varies by plan type and member tier",
                    "Coverage periods affect benefit calculations",
                    "Family vs individual accumulators have different rules"
                  ].map((learning, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                      whileHover={{ scale: 1.05, x: 5 }}
                    >
                      <motion.div
                        className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                      />
                      <span className="text-white/90 text-sm">{learning}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Educational Section */}
      <motion.section 
        className="space-y-12"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold gradient-text mb-4"
            whileHover={{ scale: 1.05 }}
          >
            Understanding Healthcare Cost-Sharing
          </motion.h2>
          <motion.p
            className="text-white/80 text-lg max-w-3xl mx-auto"
            whileHover={{ scale: 1.01 }}
          >
            Learn how insurance companies manage member healthcare costs through sophisticated 
            accumulator models and cost-sharing mechanisms.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Deductibles",
              description: "The amount you pay before insurance starts covering costs. Accumulators track your progress toward meeting this threshold.",
              icon: "💰",
              color: "from-green-500/20 to-emerald-500/20",
              borderColor: "border-green-500/30"
            },
            {
              title: "Copays",
              description: "Fixed amounts you pay for specific services (like $25 for a doctor visit). These may or may not count toward your deductible.",
              icon: "💳",
              color: "from-blue-500/20 to-cyan-500/20",
              borderColor: "border-blue-500/30"
            },
            {
              title: "Coinsurance",
              description: "A percentage of costs you pay after meeting your deductible (like 20% of a hospital bill).",
              icon: "📊",
              color: "from-purple-500/20 to-pink-500/20",
              borderColor: "border-purple-500/30"
            },
            {
              title: "Out-of-Pocket Maximum",
              description: "The most you'll pay in a year. Once reached, insurance covers 100% of remaining costs.",
              icon: "🛡️",
              color: "from-orange-500/20 to-red-500/20",
              borderColor: "border-orange-500/30"
            },
            {
              title: "HIPAA Codes",
              description: "Standardized codes that determine which services count toward your deductible and how they're categorized.",
              icon: "🏥",
              color: "from-teal-500/20 to-blue-500/20",
              borderColor: "border-teal-500/30"
            },
            {
              title: "Family vs Individual",
              description: "Family plans have separate individual and family deductibles, with complex rules for how costs accumulate.",
              icon: "👨‍👩‍👧‍👦",
              color: "from-indigo-500/20 to-purple-500/20",
              borderColor: "border-indigo-500/30"
            }
          ].map((concept, index) => (
            <motion.div
              key={index}
              className={`card p-6 ${concept.color} ${concept.borderColor} border-2`}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
              whileHover={{ y: -8, scale: 1.02, rotateY: 2 }}
            >
              <motion.div
                className="text-4xl mb-4"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
              >
                {concept.icon}
              </motion.div>
              <h3 className="text-xl font-bold text-white mb-3">{concept.title}</h3>
              <p className="text-white/80 leading-relaxed">{concept.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Interactive Demo Section */}
      <motion.section 
        className="card p-8 md:p-12"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        whileHover={{ y: -4 }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold gradient-text mb-4"
              whileHover={{ scale: 1.05 }}
            >
              Interactive Accumulator Demo
            </motion.h2>
            <motion.p
              className="text-white/80 text-lg max-w-3xl mx-auto"
              whileHover={{ scale: 1.01 }}
            >
              Explore how accumulator models work in practice. Enter a member ID and coverage dates 
              to see how different benefit plans handle cost-sharing and benefit calculations.
            </motion.p>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mt-4"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ delay: 1.1, duration: 0.8 }}
            />
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <Link href="/">
              <motion.button
                className="btn-primary px-12 py-4 text-xl font-semibold"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Try the Interactive Demo
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer Section */}
      <motion.footer 
        className="text-center space-y-8 py-16"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <motion.div
          className="max-w-4xl mx-auto space-y-6"
          whileHover={{ scale: 1.01 }}
        >
          <motion.h3
            className="text-2xl md:text-3xl font-bold gradient-text mb-4"
            whileHover={{ scale: 1.05 }}
          >
            Built with Passion for Healthcare Innovation
          </motion.h3>
          <motion.p
            className="text-white/80 text-lg leading-relaxed"
            whileHover={{ scale: 1.01 }}
          >
            This project represents my journey into understanding complex healthcare systems during my 
            summer training at Optum. It combines real-world industry knowledge with modern web 
            technologies to create an educational and interactive experience.
          </motion.p>
          
          <motion.div
            className="flex flex-wrap justify-center gap-6 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            {[
              { name: "Next.js", color: "from-gray-500 to-gray-700" },
              { name: "React", color: "from-blue-500 to-cyan-500" },
              { name: "Framer Motion", color: "from-purple-500 to-pink-500" },
              { name: "Tailwind CSS", color: "from-teal-500 to-blue-500" },
              { name: "TypeScript", color: "from-blue-600 to-blue-800" },
              { name: "Spring Boot", color: "from-green-500 to-emerald-500" }
            ].map((tech, index) => (
              <motion.span
                key={tech.name}
                className={`px-4 py-2 rounded-full bg-gradient-to-r ${tech.color} text-white text-sm font-medium`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.1, y: -2 }}
              >
                {tech.name}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
        
        <motion.div
          className="pt-8 border-t border-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
        >
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} Insurance Accumulator Demo • Built during Optum Summer Training
          </p>
        </motion.div>
      </motion.footer>
    </motion.div>
  );
}
