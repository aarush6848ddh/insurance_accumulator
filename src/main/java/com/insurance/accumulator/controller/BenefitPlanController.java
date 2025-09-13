package com.insurance.accumulator.controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.insurance.accumulator.entity.Member;
import com.insurance.accumulator.model.Response;
import com.insurance.accumulator.model.DataResponse;
import com.insurance.accumulator.model.MemberInfo;
import com.insurance.accumulator.repository.MemberRepository;
import com.insurance.accumulator.service.PlanBenefitIntf;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.NotNull;

@RestController
@Tag(name = "BenefitPlan Management", description = "APIs for managing insurance benefitPlans")
public class BenefitPlanController {
  @Autowired
  private PlanBenefitIntf planBenefitService;
  
  @Autowired
  private MemberRepository memberRepository;

  @CrossOrigin(origins = "https://insurance-accumulator.netlify.app")
  @GetMapping("/benefitPlans")
  @Operation(summary = "Get Plan Benefits for a product", description = "Retrieve plan benefits including coverage details, cost shares, and benefits for a specific product")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Successfully retrieved plan benefits",
          content = @Content(schema = @Schema(implementation = Response.class))),
      @ApiResponse(responseCode = "400", description = "Invalid request parameters",
          content = @Content(schema = @Schema(implementation = Response.class))),
      @ApiResponse(responseCode = "404", description = "Product not found",
          content = @Content(schema = @Schema(implementation = Response.class))),
      @ApiResponse(responseCode = "500", description = "Internal server error",
          content = @Content(schema = @Schema(implementation = Response.class)))
  })
  public ResponseEntity<Response> getBenefitPlans(
      @Parameter(description = "Product ID", example = "P001", required = true)
      @RequestParam(name = "productId", required = false) String productId,
      @Parameter(description = "Deprecated. Use productId instead.")
      @RequestParam(name = "memberId", required = false) String memberIdDeprecated,
      
      @Parameter(description = "List of HIPAA codes", example = "[\"30\", \"35\"]")
      @RequestParam(required = false) List<String> hipaaCodes,
      
      @Parameter(description = "Coverage start date (yyyy-MM-dd)", example = "2024-01-01")
      @RequestParam(required = true) @NotNull(message = "Coverage start date is required") 
      @DateTimeFormat(pattern = "yyyy-MM-dd") Date covgStartDt,
      
      @Parameter(description = "Coverage end date (yyyy-MM-dd)", example = "2024-12-31")
      @RequestParam(required = true) @NotNull(message = "Coverage end date is required") 
      @DateTimeFormat(pattern = "yyyy-MM-dd") Date covgEndDt
  ) {
    // Resolve effective productId
    String effectiveProductId = null;
    if (productId != null && !productId.isBlank()) {
      effectiveProductId = productId;
    } else if (memberIdDeprecated != null && !memberIdDeprecated.isBlank()) {
      Member member = memberRepository.findByMemberId(memberIdDeprecated);
      if (member == null) {
        Response response = new Response();
        response.setCode(String.valueOf(HttpStatus.NOT_FOUND.value()));
        response.setStatus("NOT_FOUND");
        response.setMessage("Member not found: " + memberIdDeprecated);
        response.setTimestamp(new Date());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
      }
      effectiveProductId = member.getProductId();
    } else {
      Response response = new Response();
      response.setCode(String.valueOf(HttpStatus.BAD_REQUEST.value()));
      response.setStatus(HttpStatus.BAD_REQUEST.toString());
      response.setMessage("Product ID is required (use productId, or provide memberId to resolve)");
      response.setTimestamp(new Date());
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    boolean isValidDate = validateCoverageDates(covgStartDt,covgEndDt);
    if (isValidDate) {
      Response serviceResp = planBenefitService.findPLanBenefits(effectiveProductId, hipaaCodes, covgStartDt, covgEndDt);
      // If the request used memberId, enrich the data payload with member info for UI display
      if (memberIdDeprecated != null && !memberIdDeprecated.isBlank()) {
        Member member = memberRepository.findByMemberId(memberIdDeprecated);
        if (member != null && serviceResp.getData() instanceof DataResponse) {
          DataResponse dr = serviceResp.getData(DataResponse.class);
          MemberInfo mi = new MemberInfo();
          mi.setId(member.getId());
          mi.setMemberId(member.getMemberId());
          mi.setMemberName(member.getMemberName());
          mi.setMemberDob(member.getMemberDob());
          mi.setProductId(member.getProductId());
          mi.setAddress(member.getAddress());
          mi.setMemberEffDt(member.getMemberEffDt());
          mi.setMemberTermDt(member.getMemberTermDt());
          dr.setMember(mi);
          serviceResp.setData(dr);
        }
      }
      return ResponseEntity.status(HttpStatus.OK).body(serviceResp);
    } else {
      Response response = new Response();
      response.setCode(String.valueOf(HttpStatus.BAD_REQUEST.value()));
      response.setStatus(HttpStatus.BAD_REQUEST.toString());
      response.setMessage("Invalid Coverage Dates");
      response.setTimestamp(new Date());
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }
  }

  private boolean validateCoverageDates(Date covStartDt, Date covEndDt) {
    if(covStartDt !=null && covEndDt !=null) {
      return covStartDt.before(covEndDt);
    } else {
      return false;
    }
  }
}
