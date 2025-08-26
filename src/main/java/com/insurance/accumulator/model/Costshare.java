package com.insurance.accumulator.model;

public class Costshare {
  String costShareType;
  String costShareName;
  String costShareUnt;
  float indvCostShareValue;
  float familyCostShareValue;

  public String getCostShareType() {
    return costShareType;
  }

  public void setCostShareType(String costShareType) {
    this.costShareType = costShareType;
  }

  public String getCostShareName() {
    return costShareName;
  }

  public void setCostShareName(String costShareName) {
    this.costShareName = costShareName;
  }

  public String getCostShareUnt() {
    return costShareUnt;
  }

  public void setCostShareUnt(String costShareUnt) {
    this.costShareUnt = costShareUnt;
  }

  public float getIndvCostShareValue() {
    return indvCostShareValue;
  }

  public void setIndvCostShareValue(float indvCostShareValue) {
    this.indvCostShareValue = indvCostShareValue;
  }

  public float getFamilyCostShareValue() {
    return familyCostShareValue;
  }

  public void setFamilyCostShareValue(float familyCostShareValue) {
    this.familyCostShareValue = familyCostShareValue;
  }
}
