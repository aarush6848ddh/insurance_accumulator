"use client";

import { motion } from 'framer-motion';
import { memo } from 'react';

interface Plan {
  planId: string;
  planName: string;
  coverage?: { coverageStartDate: string; coverageEndDate: string };
  costshares?: Array<{
    costShareType: string;
    costShareName: string;
    costShareUnt: string;
    indvCostShareValue: number;
    familyCostShareValue: number;
  }>;
  benefits?: Array<{
    benefitId: string;
    benefitName: string;
    costshare?: Array<{
      costShareType: string;
      costShareName: string;
      costShareUnt: string;
      indvCostShareValue: number;
      familyCostShareValue: number;
    }>;
  }>;
}

interface PlanCardProps {
  plan: Plan;
  index: number;
}

const spring = { type: "spring", stiffness: 300, damping: 24 } as const;

const cardHover = {
  y: -8,
  scale: 1.02,
  rotateY: 2,
  transition: {
    type: "spring",
    stiffness: 300,
    damping: 20
  }
};

const PlanCard = memo(({ plan, index }: PlanCardProps) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, scale: 0.9, rotateX: -10 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      transition={{ 
        delay: index * 0.1,
        duration: 0.6,
        type: "spring",
        stiffness: 200,
        damping: 20
      }}
      whileHover={cardHover}
      className="card p-6 relative overflow-hidden group"
    >
      {/* Gradient overlay on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <motion.div 
              className="text-xl font-bold gradient-text mb-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
            >
              {plan.planName}
            </motion.div>
            {plan.coverage && (
              <motion.div 
                className="text-white/70 text-sm flex items-center gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
              >
                <motion.span 
                  className="w-2 h-2 rounded-full bg-green-400"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                Coverage: {plan.coverage.coverageStartDate} → {plan.coverage.coverageEndDate}
              </motion.div>
            )}
          </div>
          <motion.div 
            className="text-white/50 text-sm px-3 py-1 rounded-full bg-white/5 border border-white/10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
          >
            Plan ID: {plan.planId}
          </motion.div>
        </div>

        {plan.costshares && plan.costshares.length > 0 && (
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
          >
            <motion.div 
              className="text-white/80 text-sm font-semibold mb-3 flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
            >
              <motion.span 
                className="w-1 h-4 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"
                animate={{ scaleY: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              Plan Cost Shares
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {plan.costshares.map((cs, i) => (
                <motion.div
                  key={i}
                  className="p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/10 border border-white/20 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ ...spring, delay: i * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <div className="font-semibold text-white mb-2">{cs.costShareName}</div>
                  <div className="space-y-1 text-sm">
                    <div className="text-white/70">Type: <span className="text-white">{cs.costShareType}</span></div>
                    <div className="text-white/70">Unit: <span className="text-white">{cs.costShareUnt}</span></div>
                    <div className="text-white/70">Individual: <span className="text-green-400 font-medium">{cs.indvCostShareValue}</span></div>
                    <div className="text-white/70">Family: <span className="text-blue-400 font-medium">{cs.familyCostShareValue}</span></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {plan.benefits && plan.benefits.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + index * 0.1, duration: 0.6 }}
          >
            <motion.div 
              className="text-white/80 text-sm font-semibold mb-3 flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
            >
              <motion.span 
                className="w-1 h-4 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"
                animate={{ scaleY: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              />
              Benefits
            </motion.div>
            <div className="space-y-3">
              {plan.benefits.map((b, i) => (
                <motion.div
                  key={i}
                  className="p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/10 border border-white/20 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ ...spring, delay: i * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <div className="font-semibold text-white mb-3">{b.benefitName}</div>
                  {b.costshare && b.costshare.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {b.costshare.map((cs, j) => (
                        <motion.div 
                          key={j} 
                          className="p-3 rounded-lg bg-white/5 border border-white/10 text-sm"
                          whileHover={{ scale: 1.05 }}
                        >
                          <div className="font-medium text-white">{cs.costShareType}</div>
                          <div className="text-white/70">{cs.costShareName} ({cs.costShareUnt})</div>
                          <div className="text-white/70">Value: <span className="text-green-400 font-medium">{cs.indvCostShareValue}</span></div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
});

PlanCard.displayName = 'PlanCard';

export default PlanCard;

