package com.insurance.accumulator.entity;

import java.math.BigDecimal;
import java.time.Instant;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "deduct")
public class Deduct {
  @Id
  @Column(name = "dect_id", nullable = false)
  private Integer id;

  @Size(max = 4)
  @Column(name = "dect_pfx", length = 4)
  private String dectPfx;

  @Column(name = "accum_number")
  private Integer accumNumber;

  @Size(max = 50)
  @Column(name = "dect_name", length = 50)
  private String dectName;

  @Column(name = "dect_fam_amt", precision = 10, scale = 2)
  private BigDecimal dectFamAmt;

  @Column(name = "dect_indv_amt", precision = 10, scale = 2)
  private BigDecimal dectIndvAmt;

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

  public String getDectPfx() {
    return dectPfx;
  }

  public void setDectPfx(String dectPfx) {
    this.dectPfx = dectPfx;
  }

  public Integer getAccumNumber() {
    return accumNumber;
  }

  public void setAccumNumber(Integer accumNumber) {
    this.accumNumber = accumNumber;
  }

  public String getDectName() {
    return dectName;
  }

  public void setDectName(String dectName) {
    this.dectName = dectName;
  }

  public BigDecimal getDectFamAmt() {
    return dectFamAmt;
  }

  public void setDectFamAmt(BigDecimal dectFamAmt) {
    this.dectFamAmt = dectFamAmt;
  }

  public BigDecimal getDectIndvAmt() {
    return dectIndvAmt;
  }

  public void setDectIndvAmt(BigDecimal dectIndvAmt) {
    this.dectIndvAmt = dectIndvAmt;
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