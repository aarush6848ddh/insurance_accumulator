package com.insurance.accumulator.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.insurance.accumulator.model.Response;
import com.insurance.accumulator.repository.PlanRepository;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@Tag(name = "Health Check", description = "Health check endpoints")
public class HealthController {

    @Autowired
    private PlanRepository planRepository;

    @GetMapping("/health")
    @Operation(summary = "Application health check", description = "Returns the health status of the application")
    public ResponseEntity<Map<String, Object>> health() {
        Map<String, Object> health = new HashMap<>();
        health.put("status", "UP");
        health.put("timestamp", new Date());
        health.put("service", "Insurance Accumulator API");
        health.put("version", "1.0.0");
        
        return ResponseEntity.ok(health);
    }

    @GetMapping("/health/db")
    @Operation(summary = "Database health check", description = "Returns the database connection status")
    public ResponseEntity<Response> databaseHealth() {
        Response response = new Response();
        
        try {
            // Simple database connectivity test using PlanRepository
            planRepository.count();
            response.setCode("200");
            response.setStatus("SUCCESS");
            response.setMessage("Database connection is healthy");
            response.setTimestamp(new Date());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.setCode("503");
            response.setStatus("ERROR");
            response.setMessage("Database connection failed: " + e.getMessage());
            response.setTimestamp(new Date());
            return ResponseEntity.status(503).body(response);
        }
    }
}

