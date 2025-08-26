package com.insurance.accumulator.entity;

import java.math.BigDecimal;
import java.time.Instant;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "cop_coins")
public class CopCoin {
  @Id
  @Column(name = "cop_coins_id", nullable = false)
  private Integer id;

  @Size(max = 4)
  @Column(name = "bnf_id", length = 4)
  private String bnfId;

  @Column(name = "bnf_allow_amt", precision = 10, scale = 2)
  private BigDecimal bnfAllowAmt;

  @Column(name = "bnf_allow_ctr")
  private Integer bnfAllowCtr;

  @Column(name = "bnf_cop_amt", precision = 10, scale = 2)
  private BigDecimal bnfCopAmt;

  @Column(name = "bnf_coins_pct")
  private Integer bnfCoinsPct;

  @Column(name = "accum_number")
  private Integer accumNumber;

  @Size(max = 10)
  @Column(name = "created_by", length = 10)
  private String createdBy;

  @Size(max = 10)
  @Column(name = "updated_by", length = 10)
  private String updatedBy;

  @Column(name = "create_dt")
  private Instant createDt;

  @Column(name = "update_dt")
  private Instant updateDt;

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getBnfId() {
    return bnfId;
  }

  public void setBnfId(String bnfId) {
    this.bnfId = bnfId;
  }

  public BigDecimal getBnfAllowAmt() {
    return bnfAllowAmt;
  }

  public void setBnfAllowAmt(BigDecimal bnfAllowAmt) {
    this.bnfAllowAmt = bnfAllowAmt;
  }

  public Integer getBnfAllowCtr() {
    return bnfAllowCtr;
  }

  public void setBnfAllowCtr(Integer bnfAllowCtr) {
    this.bnfAllowCtr = bnfAllowCtr;
  }

  public BigDecimal getBnfCopAmt() {
    return bnfCopAmt;
  }

  public void setBnfCopAmt(BigDecimal bnfCopAmt) {
    this.bnfCopAmt = bnfCopAmt;
  }

  public Integer getBnfCoinsPct() {
    return bnfCoinsPct;
  }

  public void setBnfCoinsPct(Integer bnfCoinsPct) {
    this.bnfCoinsPct = bnfCoinsPct;
  }

  public Integer getAccumNumber() {
    return accumNumber;
  }

  public void setAccumNumber(Integer accumNumber) {
    this.accumNumber = accumNumber;
  }

  public String getCreatedBy() {
    return createdBy;
  }

  public void setCreatedBy(String createdBy) {
    this.createdBy = createdBy;
  }

  public String getUpdatedBy() {
    return updatedBy;
  }

  public void setUpdatedBy(String updatedBy) {
    this.updatedBy = updatedBy;
  }

  public Instant getCreateDt() {
    return createDt;
  }

  public void setCreateDt(Instant createDt) {
    this.createDt = createDt;
  }

  public Instant getUpdateDt() {
    return updateDt;
  }

  public void setUpdateDt(Instant updateDt) {
    this.updateDt = updateDt;
  }

}