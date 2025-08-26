package com.insurance.accumulator.entity;

import java.math.BigDecimal;
import java.time.Instant;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "oop")
public class Oop {
  @Id
  @Column(name = "opp_id", nullable = false)
  private Integer id;

  @Size(max = 4)
  @Column(name = "oop_pfx", length = 4)
  private String oopPfx;

  @Size(max = 50)
  @Column(name = "oop_name", length = 50)
  private String oopName;

  @Column(name = "accum_number")
  private Integer accumNumber;

  @Column(name = "oop_fam_amt", precision = 10, scale = 2)
  private BigDecimal oopFamAmt;

  @Column(name = "oop_indv_amt", precision = 10, scale = 2)
  private BigDecimal oopIndvAmt;

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

  public String getOopPfx() {
    return oopPfx;
  }

  public void setOopPfx(String oopPfx) {
    this.oopPfx = oopPfx;
  }

  public String getOopName() {
    return oopName;
  }

  public void setOopName(String oopName) {
    this.oopName = oopName;
  }

  public Integer getAccumNumber() {
    return accumNumber;
  }

  public void setAccumNumber(Integer accumNumber) {
    this.accumNumber = accumNumber;
  }

  public BigDecimal getOopFamAmt() {
    return oopFamAmt;
  }

  public void setOopFamAmt(BigDecimal oopFamAmt) {
    this.oopFamAmt = oopFamAmt;
  }

  public BigDecimal getOopIndvAmt() {
    return oopIndvAmt;
  }

  public void setOopIndvAmt(BigDecimal oopIndvAmt) {
    this.oopIndvAmt = oopIndvAmt;
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