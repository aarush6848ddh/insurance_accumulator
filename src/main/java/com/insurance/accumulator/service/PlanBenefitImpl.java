package com.insurance.accumulator.service;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.insurance.accumulator.entity.Benefit;
import com.insurance.accumulator.entity.CopCoin;
import com.insurance.accumulator.entity.Deduct;
import com.insurance.accumulator.entity.Oop;
import com.insurance.accumulator.entity.Plan;
import com.insurance.accumulator.model.Costshare;
import com.insurance.accumulator.model.CoveragePeriod;
import com.insurance.accumulator.model.DataResponse;
import com.insurance.accumulator.model.Response;
import com.insurance.accumulator.repository.BenefitRepository;
import com.insurance.accumulator.repository.CopCoinRepository;
import com.insurance.accumulator.repository.DeductRepository;
import com.insurance.accumulator.repository.OopRepository;
import com.insurance.accumulator.repository.PlanRepository;

@Service
public class PlanBenefitImpl implements PlanBenefitIntf {

  @Autowired
  private PlanRepository planRepository;
  
  @Autowired
  private BenefitRepository benefitRepository;
  
  @Autowired
  private DeductRepository deductRepository;
  
  @Autowired
  private OopRepository oopRepository;
  
  @Autowired
  private CopCoinRepository copCoinRepository;

  @Override
  public Response findPLanBenefits(String productId, List<String> hipaaCodes, Date covgStartDt, Date covgEndDt) {
    Response response = new Response();
    DataResponse dataResponse = new DataResponse();
    List<com.insurance.accumulator.model.Plan> planList = new ArrayList<>();
    
    try {
      // Get plans by product ID
      List<Plan> entityPlans = planRepository.findByProductId(productId);
      
      if (entityPlans == null || entityPlans.isEmpty()) {
        response.setCode("404");
        response.setStatus("NOT_FOUND");
        response.setMessage("No plans found for product ID: " + productId);
        response.setTimestamp(new Date());
        return response;
      }
      
      for (Plan entityPlan : entityPlans) {
        // Date validation: coverage dates must be within plan effective and termination dates
        if (!isCoverageDateValid(entityPlan, covgStartDt, covgEndDt)) {
          continue; // Skip this plan if coverage dates are not valid
        }
        com.insurance.accumulator.model.Plan plan = new com.insurance.accumulator.model.Plan();
        plan.setPlanId(String.valueOf(entityPlan.getId()));
        plan.setPlanName(entityPlan.getPlanName());
        
        // Step 2: Map plan.coveragePeriod with request params coverageStartDate and coverageEndDate
        CoveragePeriod coverage = new CoveragePeriod();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        coverage.setCoverageStartDate(sdf.format(covgStartDt));
        coverage.setCoverageEndDate(sdf.format(covgEndDt));
        plan.setCoverage(coverage);
        
        // Step 2: Get the prefixes from Plan Table
        String dectPfx = entityPlan.getDectPfx();
        String oopPfx = entityPlan.getOopPfx();
        String bnfPfx = entityPlan.getBnfPfx();
        
        // Plan Level CostShare Mapping
        // Step 1: Read Deduct and OOP tables based on dectPfx and oopPfx
        List<Costshare> planCostshares = new ArrayList<>();
        
        // Map Deduct information
        Deduct deduct = deductRepository.findByDectPfx(dectPfx);
        if (deduct != null) {
          Costshare deductCostshare = new Costshare();
          deductCostshare.setCostShareType("DEDUCTIBLE");
          deductCostshare.setCostShareName(deduct.getDectName());
          deductCostshare.setCostShareUnt("DOLLAR");
          deductCostshare.setIndvCostShareValue(deduct.getDectIndvAmt() != null ? deduct.getDectIndvAmt().floatValue() : 0.0f);
          deductCostshare.setFamilyCostShareValue(deduct.getDectFamAmt() != null ? deduct.getDectFamAmt().floatValue() : 0.0f);
          planCostshares.add(deductCostshare);
        }
        
        // Map OOP information
        Oop oop = oopRepository.findByOopPfx(oopPfx);
        if (oop != null) {
          Costshare oopCostshare = new Costshare();
          oopCostshare.setCostShareType("OUT_OF_POCKET");
          oopCostshare.setCostShareName(oop.getOopName());
          oopCostshare.setCostShareUnt("DOLLAR");
          oopCostshare.setIndvCostShareValue(oop.getOopIndvAmt() != null ? oop.getOopIndvAmt().floatValue() : 0.0f);
          oopCostshare.setFamilyCostShareValue(oop.getOopFamAmt() != null ? oop.getOopFamAmt().floatValue() : 0.0f);
          planCostshares.add(oopCostshare);
        }
        
        plan.setCostshares(planCostshares);
        
        // Map Benefits and CostShare
        // Step 1: Read Benefit table based on bnf_pfx from plan table and HipaaCode request param
        List<Benefit> entityBenefits = benefitRepository.findByBnfPfxAndHipaaCodes(bnfPfx, hipaaCodes);
        
        List<com.insurance.accumulator.model.Benefit> benefits = new ArrayList<>();
        for (Benefit entityBenefit : entityBenefits) {
          // Date validation: benefit must be active during coverage period
          if (!isBenefitDateValid(entityBenefit, covgStartDt, covgEndDt)) {
            continue; // Skip this benefit if not active during coverage period
          }
          
          com.insurance.accumulator.model.Benefit benefit = new com.insurance.accumulator.model.Benefit();
          benefit.setBenefitId(String.valueOf(entityBenefit.getId()));
          benefit.setBenefitName(entityBenefit.getBnfName());
          
          // Benefit Level CostShare Mapping
          // Step 1: Read CopCoin table based on benefitId
          List<CopCoin> copCoins = copCoinRepository.findByBnfId(String.valueOf(entityBenefit.getId()));
          
          List<Costshare> benefitCostshares = new ArrayList<>();
          for (CopCoin copCoin : copCoins) {
            Costshare copayCostshare = new Costshare();
            copayCostshare.setCostShareType("COPAY");
            copayCostshare.setCostShareName("Copay");
            copayCostshare.setCostShareUnt("DOLLAR");
            copayCostshare.setIndvCostShareValue(copCoin.getBnfCopAmt() != null ? copCoin.getBnfCopAmt().floatValue() : 0.0f);
            copayCostshare.setFamilyCostShareValue(0.0f); // Copay is typically individual
            
            benefitCostshares.add(copayCostshare);
            
            // Add coinsurance if applicable
            if (copCoin.getBnfCoinsPct() != null && copCoin.getBnfCoinsPct() > 0) {
              Costshare coinsuranceCostshare = new Costshare();
              coinsuranceCostshare.setCostShareType("COINSURANCE");
              coinsuranceCostshare.setCostShareName("Coinsurance");
              coinsuranceCostshare.setCostShareUnt("PERCENT");
              coinsuranceCostshare.setIndvCostShareValue(copCoin.getBnfCoinsPct().floatValue());
              coinsuranceCostshare.setFamilyCostShareValue(0.0f); // Coinsurance is typically individual
              
              benefitCostshares.add(coinsuranceCostshare);
            }
          }
          
          benefit.setCostshare(benefitCostshares);
          benefits.add(benefit);
        }
        
        plan.setBenefits(benefits);
        planList.add(plan);
      }
      
      dataResponse.setPlans(planList);
      response.setData(dataResponse);
      response.setCode("200");
      response.setStatus("SUCCESS");
      response.setMessage("Plan benefits retrieved successfully");
      response.setTimestamp(new Date());
      
    } catch (Exception e) {
      response.setCode("500");
      response.setStatus("ERROR");
      response.setMessage("Error retrieving plan benefits: " + e.getMessage());
      response.setTimestamp(new Date());
    }
    
    return response;
  }
  
  /**
   * Validates that coverage dates are within plan effective and termination dates
   */
  private boolean isCoverageDateValid(Plan entityPlan, Date covgStartDt, Date covgEndDt) {
    if (entityPlan.getPlanEffDt() == null || entityPlan.getPlanTermDt() == null || 
        covgStartDt == null || covgEndDt == null) {
      return false;
    }
    
    // Convert Date to LocalDate for comparison
    java.time.LocalDate planStartDate = entityPlan.getPlanEffDt();
    java.time.LocalDate planEndDate = entityPlan.getPlanTermDt();
    java.time.LocalDate coverageStartDate =  covgStartDt.toInstant()
            .atZone(ZoneId.systemDefault())
            .toLocalDate();
    java.time.LocalDate coverageEndDate = covgEndDt.toInstant()
            .atZone(ZoneId.systemDefault())
            .toLocalDate();
    return !coverageStartDate.isBefore(planStartDate) && !coverageEndDate.isAfter(planEndDate);
  }
  
  /**
   * Validates that benefit is active during the coverage period
   */
  private boolean isBenefitDateValid(Benefit entityBenefit, Date covgStartDt, Date covgEndDt) {
    if (entityBenefit.getBnfEffDt() == null || entityBenefit.getBnfTermDt() == null || 
        covgStartDt == null || covgEndDt == null) {
      return false;
    }
    
    // Convert Date to LocalDate for comparison
    java.time.LocalDate benefitStartDate = entityBenefit.getBnfEffDt();
    java.time.LocalDate benefitEndDate = entityBenefit.getBnfTermDt();
    java.time.LocalDate coverageStartDate = covgStartDt.toInstant()
        .atZone(java.time.ZoneId.systemDefault())
        .toLocalDate();
    java.time.LocalDate coverageEndDate = covgEndDt.toInstant()
        .atZone(java.time.ZoneId.systemDefault())
        .toLocalDate();

    return !coverageStartDate.isAfter(benefitEndDate) && !coverageEndDate.isBefore(benefitStartDate);
  }
}
