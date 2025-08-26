import axios from 'axios';

// Use Next.js API route by default to avoid CORS in the browser.
// Set NEXT_PUBLIC_API_BASE to call backend directly if needed.
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || '';

export type BenefitPlanRequest = {
  memberId?: string;
  productId?: string;
  hipaaCodes?: string[];
  covgStartDt: string; // yyyy-MM-dd
  covgEndDt: string;   // yyyy-MM-dd
};

export async function fetchBenefitPlans(req: BenefitPlanRequest) {
  const params = new URLSearchParams();
  
  // Add required parameters
  params.append('covgStartDt', req.covgStartDt);
  params.append('covgEndDt', req.covgEndDt);
  
  // Add optional parameters if they exist
  if (req.memberId) params.append('memberId', req.memberId);
  if (req.productId) params.append('productId', req.productId);
  if (req.hipaaCodes && req.hipaaCodes.length > 0) {
    req.hipaaCodes.forEach(code => params.append('hipaaCodes', code));
  }

  const url = API_BASE
    ? `${API_BASE}/benefitPlans?${params.toString()}` // direct to backend
    : `/api/benefitPlans?${params.toString()}`;       // Next.js proxy
    
  const { data } = await axios.get(url);
  return data as any; // backend returns Response wrapper
}
