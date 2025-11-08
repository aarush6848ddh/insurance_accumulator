"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchBenefitPlans, type BenefitPlanRequest } from "../../lib/api";
import LoadingSpinner from "../components/LoadingSpinner";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  FileText,
  AlertCircle,
  CheckCircle,
  Clock,
  Eye,
  EyeOff,
  Activity,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  X,
} from "lucide-react";

type Plan = {
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
};

type ResponseWrapper = {
  status: string;
  code: string;
  message: string;
  data?: {
    member?: {
      id: number;
      memberId: string;
      memberName: string;
      memberDob: string;
      productId: string;
      address?: string;
      memberEffDt?: string;
      memberTermDt?: string;
    };
    plans?: Plan[];
  } | null;
};

interface AccumulatorData {
  id: string;
  name: string;
  type: string;
  currentAmount: number;
  maxAmount: number;
  deductible: number;
  deductibleMet: number;
  outOfPocket: number;
  outOfPocketMet: number;
  claims: number;
  lastUpdated: Date;
  status: "active" | "pending" | "inactive";
  trend: number;
  planId: string;
  coverage?: { coverageStartDate: string; coverageEndDate: string };
}

const CircleProgress = ({
  value,
  maxValue,
  size = 120,
  strokeWidth = 8,
}: {
  value: number;
  maxValue: number;
  size?: number;
  strokeWidth?: number;
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const fillPercentage = Math.min(value / maxValue, 1);
  const strokeDashoffset = circumference * (1 - fillPercentage);

  const getColor = () => {
    if (fillPercentage < 0.5) return "#10b981";
    if (fillPercentage < 0.8) return "#f59e0b";
    return "#ef4444";
  };

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        className="fill-transparent stroke-gray-200"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        className="fill-transparent transition-all duration-500"
        stroke={getColor()}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
      />
    </svg>
  );
};

// Transform backend plan data into accumulator format
const transformPlanToAccumulator = (plan: Plan, index: number): AccumulatorData => {
  // Extract deductible and OOP from costshares
  const deductible = plan.costshares?.find(cs => 
    cs.costShareType.toLowerCase().includes('deductible') || 
    cs.costShareName.toLowerCase().includes('deductible')
  );
  const oop = plan.costshares?.find(cs => 
    cs.costShareType.toLowerCase().includes('oop') || 
    cs.costShareName.toLowerCase().includes('out-of-pocket') ||
    cs.costShareName.toLowerCase().includes('out of pocket')
  );

  const deductibleValue = deductible?.indvCostShareValue || deductible?.familyCostShareValue || 5000;
  const oopValue = oop?.indvCostShareValue || oop?.familyCostShareValue || 8000;
  
  // Calculate current amounts (mock for now - in real app, this would come from accumulator tracking)
  // Use a consistent percentage based on plan index for demo purposes
  const progressPercent = 0.3 + (index * 0.15); // 30% to 60% based on plan
  const deductibleMet = deductibleValue * progressPercent;
  const oopMet = oopValue * (progressPercent * 0.8);
  const currentAmount = deductibleMet;
  const maxAmount = deductibleValue;

  return {
    id: plan.planId,
    name: plan.planName,
    type: deductible?.familyCostShareValue ? "Family" : "Individual",
    currentAmount,
    maxAmount,
    deductible: deductibleValue,
    deductibleMet,
    outOfPocket: oopValue,
    outOfPocketMet: oopMet,
    claims: plan.benefits?.length || 0,
    lastUpdated: new Date(),
    status: "active" as const,
    trend: (Math.random() * 20 - 10), // Mock trend
    planId: plan.planId,
    coverage: plan.coverage,
  };
};

export default function Demo() {
  const [memberId, setMemberId] = useState("M001");
  const [covgStartDt, setCovgStartDt] = useState("2024-01-01");
  const [covgEndDt, setCovgEndDt] = useState("2024-12-31");
  const [hipaaInput, setHipaaInput] = useState("");
  const [hipaaCodes, setHipaaCodes] = useState<string[]>(["30", "35"]);
  const [loading, setLoading] = useState(false);
  const [resp, setResp] = useState<ResponseWrapper | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedAccumulator, setSelectedAccumulator] = useState<AccumulatorData | null>(null);
  const [showBalance, setShowBalance] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showSearchForm, setShowSearchForm] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Transform plans to accumulators when data loads
  useEffect(() => {
    if (resp?.data?.plans && resp.data.plans.length > 0) {
      const accumulators = resp.data.plans.map((plan, idx) => transformPlanToAccumulator(plan, idx));
      setSelectedAccumulator(accumulators[0]);
    }
  }, [resp]);

  const addHipaa = () => {
    const v = hipaaInput.trim();
    if (!v) return;
    setHipaaCodes((prev) => Array.from(new Set([...prev, v])));
    setHipaaInput("");
  };

  const removeHipaa = (code: string) => {
    setHipaaCodes((prev) => prev.filter((c) => c !== code));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResp(null);
    setSelectedAccumulator(null);

    if (!memberId) {
      setError("Please enter a member ID.");
      return;
    }

    setLoading(true);
    try {
      const req: BenefitPlanRequest = {
        memberId,
        hipaaCodes,
        covgStartDt,
        covgEndDt,
      };
      const data = await fetchBenefitPlans(req);
      setResp(data);
      setShowSearchForm(false);
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || "Request failed");
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const accumulators = resp?.data?.plans?.map((plan, idx) => transformPlanToAccumulator(plan, idx)) || [];
  const member = resp?.data?.member;
  const totalSpent = accumulators.reduce((acc, item) => acc + item.currentAmount, 0);
  const totalMax = accumulators.reduce((acc, item) => acc + item.maxAmount, 0);

  // If no data loaded yet, show search form
  if (!resp || !selectedAccumulator) {
    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <motion.h1
            className="text-3xl md:text-4xl font-bold text-gray-900"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            Insurance Accumulator Dashboard
          </motion.h1>
          <motion.p
            className="text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            Enter your member ID and coverage dates to view your accumulator status and benefit plans.
          </motion.p>
        </div>

        {/* Search Form */}
        <motion.section
          className="card p-6 md:p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="label">Member ID *</label>
                <input
                  className="input"
                  placeholder="e.g. M001"
                  value={memberId}
                  onChange={(e) => setMemberId(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="label">Coverage Start Date *</label>
                <input
                  type="date"
                  className="input"
                  value={covgStartDt}
                  onChange={(e) => setCovgStartDt(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="label">Coverage End Date *</label>
                <input
                  type="date"
                  className="input"
                  value={covgEndDt}
                  onChange={(e) => setCovgEndDt(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="label">HIPAA Codes</label>
              <div className="flex items-center gap-2">
                <input
                  className="input"
                  placeholder="Enter HIPAA code (e.g., 30, 35)"
                  value={hipaaInput}
                  onChange={(e) => setHipaaInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addHipaa();
                    }
                  }}
                />
                <button
                  type="button"
                  className="btn-secondary whitespace-nowrap"
                  onClick={addHipaa}
                >
                  Add Code
                </button>
              </div>
              {hipaaCodes.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {hipaaCodes.map((c) => (
                    <span
                      key={c}
                      className="badge flex items-center gap-2"
                    >
                      <span>{c}</span>
                      <button
                        type="button"
                        className="text-blue-600 hover:text-blue-700 font-semibold"
                        onClick={() => removeHipaa(c)}
                        aria-label={`Remove ${c}`}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <LoadingSpinner />
                    Loading...
                  </span>
                ) : (
                  "View Dashboard"
                )}
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => {
                  setResp(null);
                  setError(null);
                  setMemberId("M001");
                  setCovgStartDt("2024-01-01");
                  setCovgEndDt("2024-12-31");
                  setHipaaCodes(["30", "35"]);
                }}
              >
                Clear
              </button>
            </div>
          </form>
        </motion.section>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              className="card p-4 border-l-4 border-red-500 bg-red-50"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <span className="text-red-600 font-medium">Error:</span>
                <span className="text-red-700">{error}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Dashboard View
  return (
    <div className="w-full max-w-7xl mx-auto bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200">
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-700 border-b border-blue-800">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Insurance Accumulator Dashboard</h1>
            <p className="text-sm text-white/80 mt-1">Track your healthcare spending and benefits</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSearchForm(true)}
              className="text-white/80 hover:text-white transition-colors text-sm px-3 py-1.5 bg-white/10 rounded-lg"
            >
              New Search
            </button>
            <div className="text-xs text-white/80 flex items-center gap-1 bg-white/10 px-3 py-2 rounded-lg backdrop-blur-sm">
              <Clock size={14} />
              <span>{currentTime.toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Member Info & Total Balance */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div>
              {member && (
                <div className="mb-2">
                  <h2 className="text-lg font-semibold text-white">{member.memberName}</h2>
                  <p className="text-sm text-white/80">Member ID: {member.memberId} • Product: {member.productId}</p>
                </div>
              )}
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-medium text-white/90">Total Healthcare Spending</h3>
                <button
                  className="text-white/70 hover:text-white transition-colors"
                  onClick={() => setShowBalance(!showBalance)}
                >
                  {showBalance ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
              </div>
            </div>
            <div className="badge bg-white/20 text-white border-white/30">
              {accumulators.length} {accumulators.length === 1 ? 'Plan' : 'Plans'}
            </div>
          </div>
          <div className="flex items-end gap-4 mb-4">
            <div className="text-4xl font-bold text-white">
              {showBalance ? formatCurrency(totalSpent) : "••••••"}
            </div>
            <div className="text-sm text-white/80 mb-1">
              of {showBalance ? formatCurrency(totalMax) : "••••••"}
            </div>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2.5">
            <motion.div
              className="bg-white rounded-full h-2.5"
              initial={{ width: 0 }}
              animate={{ width: `${(totalSpent / totalMax) * 100}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>

      {/* Search Form Overlay */}
      <AnimatePresence>
        {showSearchForm && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSearchForm(false)}
          >
            <motion.div
              className="card p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Search Benefits</h2>
                <button
                  onClick={() => setShowSearchForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={onSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="label">Member ID *</label>
                    <input
                      className="input"
                      placeholder="e.g. M001"
                      value={memberId}
                      onChange={(e) => setMemberId(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="label">Coverage Start Date *</label>
                    <input
                      type="date"
                      className="input"
                      value={covgStartDt}
                      onChange={(e) => setCovgStartDt(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="label">Coverage End Date *</label>
                    <input
                      type="date"
                      className="input"
                      value={covgEndDt}
                      onChange={(e) => setCovgEndDt(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="label">HIPAA Codes</label>
                  <div className="flex items-center gap-2">
                    <input
                      className="input"
                      placeholder="Enter HIPAA code"
                      value={hipaaInput}
                      onChange={(e) => setHipaaInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addHipaa();
                        }
                      }}
                    />
                    <button
                      type="button"
                      className="btn-secondary whitespace-nowrap"
                      onClick={addHipaa}
                    >
                      Add
                    </button>
                  </div>
                  {hipaaCodes.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {hipaaCodes.map((c) => (
                        <span key={c} className="badge flex items-center gap-2">
                          <span>{c}</span>
                          <button
                            type="button"
                            className="text-blue-600 hover:text-blue-700 font-semibold"
                            onClick={() => removeHipaa(c)}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-2">
                  <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <LoadingSpinner />
                        Loading...
                      </span>
                    ) : (
                      "Search"
                    )}
                  </button>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => setShowSearchForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            className="m-6 card p-4 border-l-4 border-red-500 bg-red-50"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <span className="text-red-600 font-medium">Error:</span>
              <span className="text-red-700">{error}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        {/* Left Panel - Selected Accumulator Detail */}
        <div className="lg:col-span-2 space-y-6">
          {selectedAccumulator && (
            <motion.div
              className="card p-6 bg-gradient-to-br from-gray-50 to-white border-gray-200 relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-500 opacity-5 blur-3xl rounded-full"></div>
                <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-blue-500 opacity-5 blur-3xl rounded-full"></div>
              </div>
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-2xl font-bold text-gray-900">{selectedAccumulator.name}</h3>
                      <span className="badge bg-green-100 text-green-700 border-green-200">
                        {selectedAccumulator.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{selectedAccumulator.type} Plan</p>
                    {selectedAccumulator.coverage && (
                      <p className="text-xs text-gray-500 mt-1">
                        {selectedAccumulator.coverage.coverageStartDate} → {selectedAccumulator.coverage.coverageEndDate}
                      </p>
                    )}
                  </div>
                  <div className={`flex items-center gap-1 px-3 py-1.5 rounded-lg ${
                    selectedAccumulator.trend >= 0
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}>
                    {selectedAccumulator.trend >= 0 ? (
                      <TrendingUp size={16} />
                    ) : (
                      <TrendingDown size={16} />
                    )}
                    <span className="font-medium text-sm">
                      {selectedAccumulator.trend >= 0 ? "+" : ""}
                      {selectedAccumulator.trend.toFixed(1)}%
                    </span>
                  </div>
                </div>

                {/* Progress Circles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div className="flex flex-col items-center">
                    <div className="relative mb-4">
                      <CircleProgress
                        value={selectedAccumulator.deductibleMet}
                        maxValue={selectedAccumulator.deductible}
                        size={140}
                        strokeWidth={10}
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="text-2xl font-bold text-gray-900">
                          {Math.round((selectedAccumulator.deductibleMet / selectedAccumulator.deductible) * 100)}%
                        </div>
                        <div className="text-xs text-gray-500">Met</div>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium mb-1 text-gray-700">Deductible</div>
                      <div className="text-lg font-bold text-gray-900">
                        {formatCurrency(selectedAccumulator.deductibleMet)}
                      </div>
                      <div className="text-xs text-gray-500">
                        of {formatCurrency(selectedAccumulator.deductible)}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="relative mb-4">
                      <CircleProgress
                        value={selectedAccumulator.outOfPocketMet}
                        maxValue={selectedAccumulator.outOfPocket}
                        size={140}
                        strokeWidth={10}
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="text-2xl font-bold text-gray-900">
                          {Math.round((selectedAccumulator.outOfPocketMet / selectedAccumulator.outOfPocket) * 100)}%
                        </div>
                        <div className="text-xs text-gray-500">Met</div>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium mb-1 text-gray-700">Out-of-Pocket</div>
                      <div className="text-lg font-bold text-gray-900">
                        {formatCurrency(selectedAccumulator.outOfPocketMet)}
                      </div>
                      <div className="text-xs text-gray-500">
                        of {formatCurrency(selectedAccumulator.outOfPocket)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="info-card">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText size={16} className="text-blue-600" />
                      <div className="text-xs text-gray-500">Benefits</div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{selectedAccumulator.claims}</div>
                  </div>
                  <div className="info-card">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign size={16} className="text-green-600" />
                      <div className="text-xs text-gray-500">Remaining</div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {formatCurrency(selectedAccumulator.maxAmount - selectedAccumulator.currentAmount)}
                    </div>
                  </div>
                  <div className="info-card">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity size={16} className="text-purple-600" />
                      <div className="text-xs text-gray-500">Utilization</div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {Math.round((selectedAccumulator.currentAmount / selectedAccumulator.maxAmount) * 100)}%
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Benefits List */}
          {selectedAccumulator && resp?.data?.plans?.find(p => p.planId === selectedAccumulator.planId)?.benefits && (
            <motion.div
              className="card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-900">
                <FileText size={20} />
                Plan Benefits
              </h3>
              <div className="space-y-3">
                {resp.data.plans.find(p => p.planId === selectedAccumulator.planId)?.benefits?.map((benefit, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    className="flex items-center justify-between p-4 rounded-lg bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                        <CheckCircle size={20} />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{benefit.benefitName}</div>
                        {benefit.costshare && benefit.costshare.length > 0 && (
                          <div className="text-sm text-gray-600">
                            {benefit.costshare.map(cs => cs.costShareName).join(", ")}
                          </div>
                        )}
                      </div>
                    </div>
                    {benefit.costshare && benefit.costshare.length > 0 && (
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">
                          {formatCurrency(benefit.costshare[0].indvCostShareValue)}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Right Panel - Plans List */}
        <div className="space-y-6">
          <motion.div
            className="card p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-900">
              <PieChart size={20} />
              All Plans
            </h3>
            <div className="space-y-3">
              {accumulators.map((acc) => (
                <button
                  key={acc.id}
                  onClick={() => setSelectedAccumulator(acc)}
                  className={`w-full p-4 rounded-lg border transition-all text-left ${
                    selectedAccumulator?.id === acc.id
                      ? "bg-blue-50 border-blue-500 ring-2 ring-blue-200"
                      : "bg-white border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium text-gray-900">{acc.name}</div>
                    <div className={`flex items-center gap-1 text-xs ${
                      acc.trend >= 0 ? "text-green-600" : "text-red-600"
                    }`}>
                      {acc.trend >= 0 ? (
                        <ArrowUpRight size={12} />
                      ) : (
                        <ArrowDownRight size={12} />
                      )}
                      {Math.abs(acc.trend).toFixed(1)}%
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">{acc.type}</div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
                    <motion.div
                      className="bg-blue-600 rounded-full h-1.5"
                      initial={{ width: 0 }}
                      animate={{ width: `${(acc.currentAmount / acc.maxAmount) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-gray-900">{formatCurrency(acc.currentAmount)}</span>
                    <span className="text-gray-500">{formatCurrency(acc.maxAmount)}</span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Summary Stats */}
          <motion.div
            className="card p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Year Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Benefits</span>
                <span className="font-bold text-gray-900">
                  {accumulators.reduce((acc, item) => acc + item.claims, 0)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Spent</span>
                <span className="font-bold text-gray-900">{formatCurrency(totalSpent)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Avg per Benefit</span>
                <span className="font-bold text-gray-900">
                  {formatCurrency(
                    totalSpent / Math.max(accumulators.reduce((acc, item) => acc + item.claims, 0), 1)
                  )}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
