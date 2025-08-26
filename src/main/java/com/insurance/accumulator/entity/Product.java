package com.insurance.accumulator.entity;

import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;
import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "product")
public class Product {
  @Id
  @Size(max = 4)
  @Column(name = "product_id", nullable = false, length = 4)
  private String productId;

  @Size(max = 50)
  @NotNull
  @Column(name = "product_name", nullable = false, length = 50)
  private String productName;

  @NotNull
  @Column(name = "product_eff_dt", nullable = false)
  private LocalDate productEffDt;

  @NotNull
  @ColumnDefault("'9999-12-31'")
  @Column(name = "product_term_dt", nullable = false)
  private LocalDate productTermDt;

  @Size(max = 10)
  @ColumnDefault("'aarush'")
  @Column(name = "created_by", length = 10)
  private String createdBy;

  @Size(max = 10)
  @Column(name = "updated_by", length = 10)
  private String updatedBy;

  @ColumnDefault("CURRENT_DATE")
  @Column(name = "create_dt")
  private Instant createDt;

  @Column(name = "update_dt")
  private Instant updateDt;

  public String getProductId() {
    return productId;
  }

  public void setProductId(String productId) {
    this.productId = productId;
  }

  public String getProductName() {
    return productName;
  }

  public void setProductName(String productName) {
    this.productName = productName;
  }

  public LocalDate getProductEffDt() {
    return productEffDt;
  }

  public void setProductEffDt(LocalDate productEffDt) {
    this.productEffDt = productEffDt;
  }

  public LocalDate getProductTermDt() {
    return productTermDt;
  }

  public void setProductTermDt(LocalDate productTermDt) {
    this.productTermDt = productTermDt;
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