package com.insurance.accumulator.model;

import java.util.Date;
import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class BenefitPlanRequest {
    
    @NotBlank(message = "Member ID is required")
    @Size(min = 1, max = 20, message = "Member ID must be between 1 and 20 characters")
    private String memberId;
    
    private List<String> hipaaCodes;
    
    @NotNull(message = "Coverage start date is required")
    private Date covgStartDt;
    
    @NotNull(message = "Coverage end date is required")
    private Date covgEndDt;
    
    // Default constructor
    public BenefitPlanRequest() {}
    
    // Constructor with all fields
    public BenefitPlanRequest(String memberId, List<String> hipaaCodes, Date covgStartDt, Date covgEndDt) {
        this.memberId = memberId;
        this.hipaaCodes = hipaaCodes;
        this.covgStartDt = covgStartDt;
        this.covgEndDt = covgEndDt;
    }
    
    // Getters and Setters
    public String getMemberId() {
        return memberId;
    }
    
    public void setMemberId(String memberId) {
        this.memberId = memberId;
    }
    
    public List<String> getHipaaCodes() {
        return hipaaCodes;
    }
    
    public void setHipaaCodes(List<String> hipaaCodes) {
        this.hipaaCodes = hipaaCodes;
    }
    
    public Date getCovgStartDt() {
        return covgStartDt;
    }
    
    public void setCovgStartDt(Date covgStartDt) {
        this.covgStartDt = covgStartDt;
    }
    
    public Date getCovgEndDt() {
        return covgEndDt;
    }
    
    public void setCovgEndDt(Date covgEndDt) {
        this.covgEndDt = covgEndDt;
    }
    
    // Validation method
    public boolean isValidDateRange() {
        return covgStartDt != null && covgEndDt != null && covgStartDt.before(covgEndDt);
    }
}

