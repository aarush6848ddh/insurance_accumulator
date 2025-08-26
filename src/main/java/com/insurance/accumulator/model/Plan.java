package com.insurance.accumulator.model;

import java.util.List;

public class Plan {

  private String planId;
  private String planName;
  private CoveragePeriod coverage;
  private List<Costshare> costshares;
  private List<Benefit> benefits;

  public String getPlanId() {
    return planId;
  }

  public void setPlanId(String planId) {
    this.planId = planId;
  }

  public String getPlanName() {
    return planName;
  }

  public void setPlanName(String planName) {
    this.planName = planName;
  }

  public CoveragePeriod getCoverage() {
    return coverage;
  }

  public void setCoverage(CoveragePeriod coverage) { this.coverage = coverage; }

  public List<Costshare> getCostshares() {
    return costshares;
  }

  public void setCostshares(List<Costshare> costshares) {
    this.costshares = costshares;
  }

  public List<Benefit> getBenefits() {
    return benefits;
  }

  public void setBenefits(List<Benefit> benefits) {
    this.benefits = benefits;
  }
}
