package com.insurance.accumulator.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.insurance.accumulator.entity.Plan;

@Repository
public interface PlanRepository extends JpaRepository<Plan, Integer> {

  @Query("select p from Plan p where p.id = ?1")
  Plan findByPlanId(int id);
  
  @Query("SELECT p FROM Plan p WHERE p.productId = :productId")
  List<Plan> findByProductId(@Param("productId") String productId);
}