package com.insurance.accumulator.model;

import java.time.LocalDate;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Basic member information to display in UI")
public class MemberInfo {
  @Schema(description = "System id")
  private Long id;

  @Schema(description = "Member identifier")
  private String memberId;

  @Schema(description = "Full name")
  private String memberName;

  @Schema(description = "Date of birth (YYYY-MM-DD)")
  private LocalDate memberDob;

  @Schema(description = "Product ID associated with member")
  private String productId;

  @Schema(description = "Address")
  private String address;

  @Schema(description = "Effective date")
  private LocalDate memberEffDt;

  @Schema(description = "Termination date")
  private LocalDate memberTermDt;

  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }
  public String getMemberId() { return memberId; }
  public void setMemberId(String memberId) { this.memberId = memberId; }
  public String getMemberName() { return memberName; }
  public void setMemberName(String memberName) { this.memberName = memberName; }
  public LocalDate getMemberDob() { return memberDob; }
  public void setMemberDob(LocalDate memberDob) { this.memberDob = memberDob; }
  public String getProductId() { return productId; }
  public void setProductId(String productId) { this.productId = productId; }
  public String getAddress() { return address; }
  public void setAddress(String address) { this.address = address; }
  public LocalDate getMemberEffDt() { return memberEffDt; }
  public void setMemberEffDt(LocalDate memberEffDt) { this.memberEffDt = memberEffDt; }
  public LocalDate getMemberTermDt() { return memberTermDt; }
  public void setMemberTermDt(LocalDate memberTermDt) { this.memberTermDt = memberTermDt; }
}
