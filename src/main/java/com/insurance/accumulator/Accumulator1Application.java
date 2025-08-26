package com.insurance.accumulator;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

/**
 * Main Spring Boot application class for the Insurance Accumulator System.
 * 
 * This application provides comprehensive insurance accumulator tracking including:
 * - Member management and policy configuration
 * - Real-time accumulator calculations
 * - Claims processing and automatic updates
 * - Reporting and analytics capabilities
 */
@SpringBootApplication
@EnableJpaAuditing
public class Accumulator1Application {

    public static void main(String[] args) {
        SpringApplication.run(Accumulator1Application.class, args);
    }
} 