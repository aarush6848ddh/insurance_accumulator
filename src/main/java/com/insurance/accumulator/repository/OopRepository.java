package com.insurance.accumulator.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.insurance.accumulator.entity.Oop;

@Repository
public interface OopRepository extends JpaRepository<Oop, Integer> {
    
    @Query("SELECT o FROM Oop o WHERE o.oopPfx = :oopPfx")
    Oop findByOopPfx(@Param("oopPfx") String oopPfx);
}