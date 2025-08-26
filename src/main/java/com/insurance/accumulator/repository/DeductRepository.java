package com.insurance.accumulator.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.insurance.accumulator.entity.Deduct;

@Repository
public interface DeductRepository extends JpaRepository<Deduct, Integer> {
    
    @Query("SELECT d FROM Deduct d WHERE d.dectPfx = :dectPfx")
    Deduct findByDectPfx(@Param("dectPfx") String dectPfx);
}