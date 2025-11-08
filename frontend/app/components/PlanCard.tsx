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

const PlanCard = memo(({ plan, index }: PlanCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ y: -4 }}
      className="card p-6 hover:shadow-lg transition-shadow"
    >
      {/* Plan Header */}
      <div className="flex items-start justify-between mb-6 pb-4 border-b border-gray-200">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.planName}</h3>
          {plan.coverage && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="status-dot active"></span>
              <span>
                {plan.coverage.coverageStartDate} → {plan.coverage.coverageEndDate}
              </span>
            </div>
          )}
        </div>
        <div className="text-xs text-gray-500 bg-gray-50 px-3 py-1 rounded-md">
          {plan.planId}
        </div>
      </div>

      {/* Cost Shares Section */}
      {plan.costshares && plan.costshares.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
            Plan Cost Shares
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {plan.costshares.map((cs, i) => (
              <motion.div
                key={i}
                className="info-card"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: (index * 0.1) + (i * 0.05) }}
              >
                <div className="info-card-header">
                  <div className="info-card-title">{cs.costShareName}</div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-medium text-gray-900">{cs.costShareType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Unit:</span>
                    <span className="font-medium text-gray-900">{cs.costShareUnt}</span>
                  </div>
                  <div className="pt-2 border-t border-gray-100">
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-600">Individual:</span>
                      <span className="font-semibold text-blue-600">${cs.indvCostShareValue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Family:</span>
                      <span className="font-semibold text-blue-600">${cs.familyCostShareValue.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Benefits Section */}
      {plan.benefits && plan.benefits.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
            Benefits
          </h4>
          <div className="space-y-3">
            {plan.benefits.map((benefit, i) => (
              <motion.div
                key={i}
                className="info-card"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (index * 0.1) + (i * 0.05) }}
              >
                <div className="info-card-title mb-3">{benefit.benefitName}</div>
                {benefit.costshare && benefit.costshare.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {benefit.costshare.map((cs, j) => (
                      <div
                        key={j}
                        className="p-3 rounded-md bg-gray-50 border border-gray-200 text-sm"
                      >
                        <div className="font-medium text-gray-900 mb-1">{cs.costShareType}</div>
                        <div className="text-gray-600 text-xs mb-1">
                          {cs.costShareName} ({cs.costShareUnt})
                        </div>
                        <div className="text-gray-900 font-semibold">
                          ${cs.indvCostShareValue.toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
});

PlanCard.displayName = 'PlanCard';

export default PlanCard;
