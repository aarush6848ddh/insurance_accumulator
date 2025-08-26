"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchBenefitPlans, type BenefitPlanRequest } from "../lib/api";

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
    plans?: Array<{
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
    }>;
  } | null;
};

export default function Home() {
  const [memberId, setMemberId] = useState("");
  const [covgStartDt, setCovgStartDt] = useState("2024-01-01");
  const [covgEndDt, setCovgEndDt] = useState("2024-12-31");
  const [hipaaInput, setHipaaInput] = useState("");
  const [hipaaCodes, setHipaaCodes] = useState<string[]>(["30", "35"]);
  const [loading, setLoading] = useState(false);
  const [resp, setResp] = useState<ResponseWrapper | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Animation variants
  const container = {
    hidden: { opacity: 0, y: 8 },
    show: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.06, delayChildren: 0.05 }
    }
  };
  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  const spring = { type: "spring", stiffness: 300, damping: 24 } as const;
  const resultsContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.05 }
    }
  };
  const resultsItem = {
    hidden: { opacity: 0, y: 16, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: spring }
  };

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
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || "Request failed");
    } finally {
      setLoading(false);
    }
  };

  const hasPlans = resp?.data?.plans && resp.data.plans.length > 0;
  const member = resp?.data?.member;

  return (
    <div className="space-y-8">
      <header className="text-center space-y-3">
        <motion.h1
          className="text-3xl md:text-4xl font-semibold"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Find Your Insurance Benefits
        </motion.h1>
        <motion.p
          className="text-white/70"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          Enter your member ID and coverage dates to view plan details, cost shares, and benefits.
        </motion.p>
      </header>

      <section className="card p-5 md:p-6">
        <motion.form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end" variants={container} initial="hidden" animate="show">
          <motion.div variants={item}>
            <label className="label">Member ID</label>
            <input
              className="input"
              placeholder="e.g. M001"
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
            />
          </motion.div>
          <motion.div variants={item}>
            <label className="label">Coverage Start</label>
            <input
              type="date"
              className="input"
              value={covgStartDt}
              onChange={(e) => setCovgStartDt(e.target.value)}
            />
          </motion.div>
          <motion.div variants={item}>
            <label className="label">Coverage End</label>
            <input
              type="date"
              className="input"
              value={covgEndDt}
              onChange={(e) => setCovgEndDt(e.target.value)}
            />
          </motion.div>
          <motion.div className="md:col-span-4" variants={item}>
            <label className="label">HIPAA Codes</label>
            <div className="flex items-center gap-2">
              <input
                className="input"
                placeholder="Add HIPAA code and press +"
                value={hipaaInput}
                onChange={(e) => setHipaaInput(e.target.value)}
              />
              <motion.button type="button" className="btn-primary" onClick={addHipaa} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                + Add
              </motion.button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {hipaaCodes.map((c) => (
                <motion.span
                  key={c}
                  layout
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-sm"
                >
                  <span className="mr-2">{c}</span>
                  <button
                    type="button"
                    className="text-white/60 hover:text-white"
                    onClick={() => removeHipaa(c)}
                  >
                    ×
                  </button>
                </motion.span>
              ))}
            </div>
          </motion.div>
          <motion.div className="md:col-span-4 flex gap-3" variants={item}>
            <motion.button type="submit" className="btn-primary" disabled={loading} whileHover={{ scale: loading ? 1 : 1.02 }} whileTap={{ scale: loading ? 1 : 0.98 }}>
              {loading ? "Searching..." : "Search"}
            </motion.button>
            <motion.button
              type="button"
              className="inline-flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white font-medium px-4 py-2"
              onClick={() => {
                setResp(null);
                setError(null);
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Clear
            </motion.button>
          </motion.div>
        </motion.form>
      </section>

      <AnimatePresence>
        {error && (
          <motion.div
            className="card p-4 border-red-500/30"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <div className="text-red-400">{error}</div>
          </motion.div>
        )}
      </AnimatePresence>

      {resp && (
        <motion.section
          key="results"
          className="space-y-4"
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={spring}
        >
          <motion.div variants={resultsContainer} initial="hidden" animate="show" className="space-y-4">
            {member && (
              <motion.div className="card p-5" variants={resultsItem}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-lg font-semibold">{member.memberName}</div>
                    <div className="text-white/60 text-sm">Member ID: {member.memberId}</div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full md:w-auto">
                    {member.memberDob && (
                      <motion.div className="px-3 py-2 rounded-xl bg-white/5 border border-white/10" initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={spring}>
                        <div className="text-white/60 text-sm">DOB</div>
                        <div className="font-medium">{member.memberDob}</div>
                      </motion.div>
                    )}
                    <motion.div className="px-3 py-2 rounded-xl bg-white/5 border border-white/10" initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={spring}>
                      <div className="text-white/60 text-sm">Product</div>
                      <div className="font-medium">{member.productId}</div>
                    </motion.div>
                    {member.address && (
                      <motion.div className="px-3 py-2 rounded-xl bg-white/5 border border-white/10" initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={spring}>
                        <div className="text-white/60 text-sm">Address</div>
                        <div className="font-medium truncate" title={member.address}>{member.address}</div>
                      </motion.div>
                    )}
                  </div>
                </div>
                {(member.memberEffDt || member.memberTermDt) && (
                  <div className="mt-3 text-white/60 text-sm">
                    {member.memberEffDt && <>Effective: {member.memberEffDt}</>}
                    {member.memberEffDt && member.memberTermDt && " \u00B7 "}
                    {member.memberTermDt && <>Termination: {member.memberTermDt}</>}
                  </div>
                )}
              </motion.div>
            )}

            <motion.div className="card p-5" variants={resultsItem}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                <span className="px-2 py-1 rounded bg-white/10 border border-white/10">Status: {resp.status}</span>
                <span className="px-2 py-1 rounded bg-white/10 border border-white/10">Code: {resp.code}</span>
                <span className="px-2 py-1 rounded bg-white/10 border border-white/10">Message: {resp.message}</span>
              </div>
            </motion.div>

          {hasPlans ? (
            <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-4" variants={resultsItem}>
              {resp!.data!.plans!.map((p, idx) => (
                <motion.div
                  key={p.planId + idx}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ y: -3 }}
                  className="card p-5 shadow-[0_0_0_0_rgba(0,0,0,0)] hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg font-semibold">{p.planName}</div>
                      {p.coverage && (
                        <div className="text-white/60 text-sm">
                          Coverage: {p.coverage.coverageStartDate} → {p.coverage.coverageEndDate}
                        </div>
                      )}
                    </div>
                    <div className="text-white/50 text-sm">Plan ID: {p.planId}</div>
                  </div>

                  {p.costshares && p.costshares.length > 0 && (
                    <div className="mt-4">
                      <div className="text-white/70 text-sm mb-2">Plan Cost Shares</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {p.costshares.map((cs, i) => (
                          <motion.div
                            key={i}
                            className="p-3 rounded-xl bg-white/5 border border-white/10"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={spring}
                            whileHover={{ scale: 1.01 }}
                          >
                            <div className="font-medium">{cs.costShareName}</div>
                            <div className="text-white/60 text-sm">Type: {cs.costShareType}</div>
                            <div className="text-white/60 text-sm">Unit: {cs.costShareUnt}</div>
                            <div className="text-white/60 text-sm">Individual: {cs.indvCostShareValue}</div>
                            <div className="text-white/60 text-sm">Family: {cs.familyCostShareValue}</div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {p.benefits && p.benefits.length > 0 && (
                    <div className="mt-4">
                      <div className="text-white/70 text-sm mb-2">Benefits</div>
                      <div className="space-y-2">
                        {p.benefits.map((b, i) => (
                          <motion.div
                            key={i}
                            className="p-3 rounded-xl bg-white/5 border border-white/10"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={spring}
                          >
                            <div className="font-medium">{b.benefitName}</div>
                            {b.costshare && b.costshare.length > 0 && (
                              <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {b.costshare.map((cs, j) => (
                                  <div key={j} className="p-2 rounded-lg bg-white/5 border border-white/10 text-sm">
                                    <div className="font-medium">{cs.costShareType}</div>
                                    <div className="text-white/60">{cs.costShareName} ({cs.costShareUnt})</div>
                                    <div className="text-white/60">Value: {cs.indvCostShareValue}</div>
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
              ))}
            </motion.div>
          ) : (
            <div className="card p-5 text-white/70">No plans found.</div>
          )}
          </motion.div>
        </motion.section>
      )}
    </div>
  );
}
