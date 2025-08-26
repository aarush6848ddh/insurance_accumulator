package com.insurance.accumulator.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.insurance.accumulator.entity.Member;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    Member findByMemberId(String memberId);
}
