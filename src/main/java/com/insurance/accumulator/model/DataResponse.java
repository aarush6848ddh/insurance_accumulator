package com.insurance.accumulator.model;

import java.util.List;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Data response containing plan information")
public class DataResponse {
  @Schema(description = "List of insurance plans")
  private List<Plan> plans;

  @Schema(description = "Member associated with the request, when looked up by memberId")
  private MemberInfo member;

  public List<Plan> getPlans() {
    return plans;
  }

  public void setPlans(List<Plan> plans) {
    this.plans = plans;
  }

  public MemberInfo getMember() {
    return member;
  }

  public void setMember(MemberInfo member) {
    this.member = member;
  }
}
