package com.insurance.accumulator.entity;

import java.math.BigDecimal;
import java.time.Instant;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "ben_limit")
public class BenLimit {
  @Id
  @Column(name = "lmt_id", nullable = false)
  private Integer id;

  @Size(max = 4)
  @Column(name = "bnf_id", length = 4)
  private String bnfId;

  @Size(max = 50)
  @Column(name = "lmt_name", length = 50)
  private String lmtName;

  @Column(name = "lmt_amt", precision = 10, scale = 2)
  private BigDecimal lmtAmt;

  @Size(max = 1)
  @Column(name = "lmt_type", length = 1)
  private String lmtType;

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

  public String getLmtName() {
    return lmtName;
  }

  public void setLmtName(String lmtName) {
    this.lmtName = lmtName;
  }

  public BigDecimal getLmtAmt() {
    return lmtAmt;
  }

  public void setLmtAmt(BigDecimal lmtAmt) {
    this.lmtAmt = lmtAmt;
  }

  public String getLmtType() {
    return lmtType;
  }

  public void setLmtType(String lmtType) {
    this.lmtType = lmtType;
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