package com.insurance.accumulator.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDate;

@Entity
@Table(name = "member")
public class Member {

    @Id
    @Column(name = "id")
    private Long id;

    @Column(name = "member_id", length = 10, nullable = false, unique = true)
    private String memberId;

    @Column(name = "member_name")
    private String memberName;

    @Column(name = "member_dob")
    private LocalDate memberDob;

    @Column(name = "product_id", length = 4, nullable = false)
    private String productId;

    @Column(name = "address")
    private String address;

    @Column(name = "member_eff_dt")
    private LocalDate memberEffDt;

    @Column(name = "member_term_dt")
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
