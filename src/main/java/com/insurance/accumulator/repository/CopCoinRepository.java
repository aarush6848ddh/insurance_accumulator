package com.insurance.accumulator.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.insurance.accumulator.entity.CopCoin;

@Repository
public interface CopCoinRepository extends JpaRepository<CopCoin, Integer> {
    
    @Query("SELECT c FROM CopCoin c WHERE c.bnfId = :bnfId")
    List<CopCoin> findByBnfId(@Param("bnfId") String bnfId);
}