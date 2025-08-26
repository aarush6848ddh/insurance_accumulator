package com.insurance.accumulator.entity;

import java.time.Instant;
import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "benefit")
public class Benefit {
  @Id
  @Column(name = "bnf_id", nullable = false)
  private Integer id;

  @Size(max = 50)
  @Column(name = "bnf_name", length = 50)
  private String bnfName;

  @Size(max = 4)
  @Column(name = "bnf_pfx", length = 4)
  private String bnfPfx;

  @NotNull
  @Column(name = "bnf_eff_dt", nullable = false)
  private LocalDate bnfEffDt;

  @NotNull
  @Column(name = "bnf_term_dt", nullable = false)
  private LocalDate bnfTermDt;

  @Size(max = 10)
  @NotNull
  @Column(name = "bnf_rule_id", nullable = false, length = 10)
  private String bnfRuleId;

  @Size(max = 10)
  @Column(name = "hipaa_cd", length = 10)
  private String hipaaCd;

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

  public String getBnfName() {
    return bnfName;
  }

  public void setBnfName(String bnfName) {
    this.bnfName = bnfName;
  }

  public String getBnfPfx() {
    return bnfPfx;
  }

  public void setBnfPfx(String bnfPfx) {
    this.bnfPfx = bnfPfx;
  }

  public LocalDate getBnfEffDt() {
    return bnfEffDt;
  }

  public void setBnfEffDt(LocalDate bnfEffDt) {
    this.bnfEffDt = bnfEffDt;
  }

  public LocalDate getBnfTermDt() {
    return bnfTermDt;
  }

  public void setBnfTermDt(LocalDate bnfTermDt) {
    this.bnfTermDt = bnfTermDt;
  }

  public String getBnfRuleId() {
    return bnfRuleId;
  }

  public void setBnfRuleId(String bnfRuleId) {
    this.bnfRuleId = bnfRuleId;
  }

  public String getHipaaCd() {
    return hipaaCd;
  }

  public void setHipaaCd(String hipaaCd) {
    this.hipaaCd = hipaaCd;
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