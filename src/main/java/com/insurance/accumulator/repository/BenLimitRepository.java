package com.insurance.accumulator.repository;

import com.insurance.accumulator.entity.BenLimit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BenLimitRepository extends JpaRepository<BenLimit, Integer> {
}