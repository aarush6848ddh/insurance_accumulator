import axios from 'axios';

// Backend API base URL - can be overridden with NEXT_PUBLIC_API_BASE env var
// Default to the Render backend URL used in production
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'https://insurance-accumulator-latest.onrender.com';

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

  // Always use direct backend URL (static export doesn't support API routes)
  const url = `${API_BASE}/benefitPlans?${params.toString()}`;
    
  const { data } = await axios.get(url);
  return data as any; // backend returns Response wrapper
}
