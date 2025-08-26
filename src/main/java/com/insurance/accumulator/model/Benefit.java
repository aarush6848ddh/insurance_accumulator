package com.insurance.accumulator.model;

import java.util.List;

public class Benefit {
  String benefitId;
  String benefitName;
  List<Costshare> costshare;

  public String getBenefitId() {
    return benefitId;
  }

  public void setBenefitId(String benefitId) {
    this.benefitId = benefitId;
  }

  public String getBenefitName() {
    return benefitName;
  }

  public void setBenefitName(String benefitName) {
    this.benefitName = benefitName;
  }

  public List<Costshare> getCostshare() {
    return costshare;
  }

  public void setCostshare(List<Costshare> costshare) {
    this.costshare = costshare;
  }
}
