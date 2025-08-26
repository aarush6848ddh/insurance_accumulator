package com.insurance.accumulator.service;

import com.insurance.accumulator.model.Response;

import java.util.Date;
import java.util.List;

public interface PlanBenefitIntf {
  Response findPLanBenefits(String productId, List<String> hipaaCodes, Date covgStartDt, Date covgEndDt);
}
