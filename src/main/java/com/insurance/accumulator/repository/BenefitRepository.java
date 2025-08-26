package com.insurance.accumulator.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.insurance.accumulator.entity.Benefit;

@Repository
public interface BenefitRepository extends JpaRepository<Benefit, Integer> {
    
    @Query("SELECT b FROM Benefit b WHERE b.bnfPfx = :bnfPfx AND (:hipaaCodes IS NULL OR b.hipaaCd IN :hipaaCodes)")
    List<Benefit> findByBnfPfxAndHipaaCodes(@Param("bnfPfx") String bnfPfx, @Param("hipaaCodes") List<String> hipaaCodes);
}