package com.insurance.accumulator.model;

public class CoveragePeriod {
  String coverageStartDate;
  String coverageEndDate;

  public String getCoverageStartDate() {
    return coverageStartDate;
  }

  public void setCoverageStartDate(String covergeStartDate) {
    this.coverageStartDate = covergeStartDate;
  }

  public String getCoverageEndDate() {
    return coverageEndDate;
  }

  public void setCoverageEndDate(String covergeEndDate) {
    this.coverageEndDate = covergeEndDate;
  }
}
