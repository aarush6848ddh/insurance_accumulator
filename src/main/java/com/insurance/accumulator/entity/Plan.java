package com.insurance.accumulator.entity;

import java.time.Instant;
import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "plan")
public class Plan {
  @Id
  @Column(name = "plan_id", nullable = false)
  private Integer id;

  @Size(max = 50)
  @Column(name = "plan_name", length = 50)
  private String planName;

  @Size(max = 10)
  @Column(name = "plan_type", length = 10)
  private String planType;

  @NotNull
  @Column(name = "plan_eff_dt", nullable = false)
  private LocalDate planEffDt;

  @NotNull
  @Column(name = "plan_term_dt", nullable = false)
  private LocalDate planTermDt;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "product_id", insertable = false, updatable = false)
  private Product product;
  
  @Column(name = "product_id", length = 4)
  private String productId;

  @Size(max = 4)
  @NotNull
  @Column(name = "dect_pfx", nullable = false, length = 4)
  private String dectPfx;

  @Size(max = 4)
  @NotNull
  @Column(name = "oop_pfx", nullable = false, length = 4)
  private String oopPfx;

  @Size(max = 4)
  @NotNull
  @Column(name = "bnf_pfx", nullable = false, length = 4)
  private String bnfPfx;

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

  public String getPlanType() {
    return planType;
  }

  public void setPlanType(String planType) {
    this.planType = planType;
  }

  public LocalDate getPlanEffDt() {
    return planEffDt;
  }

  public void setPlanEffDt(LocalDate planEffDt) {
    this.planEffDt = planEffDt;
  }

  public LocalDate getPlanTermDt() {
    return planTermDt;
  }

  public void setPlanTermDt(LocalDate planTermDt) {
    this.planTermDt = planTermDt;
  }

  public Product getProduct() {
    return product;
  }

  public void setProduct(Product product) {
    this.product = product;
  }

  public String getDectPfx() {
    return dectPfx;
  }

  public void setDectPfx(String dectPfx) {
    this.dectPfx = dectPfx;
  }

  public String getOopPfx() {
    return oopPfx;
  }

  public void setOopPfx(String oopPfx) {
    this.oopPfx = oopPfx;
  }

  public String getBnfPfx() {
    return bnfPfx;
  }

  public void setBnfPfx(String bnfPfx) {
    this.bnfPfx = bnfPfx;
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

  public String getPlanName() {
    return planName;
  }

  public void setPlanName(String planName) {
    this.planName = planName;
  }

  public String getProductId() {
    return productId;
  }

  public void setProductId(String productId) {
    this.productId = productId;
  }

}