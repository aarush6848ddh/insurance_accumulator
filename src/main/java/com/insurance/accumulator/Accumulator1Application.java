package com.insurance.accumulator;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

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

    @Configuration
    static class CorsConfig implements WebMvcConfigurer {
        @Value("${app.cors.allowed-origins:https://insurance-accumulator.netlify.app,http://localhost:3000}")
        private String allowedOriginsProp;

        @Override
        public void addCorsMappings(CorsRegistry registry) {
            List<String> origins = Arrays.stream(allowedOriginsProp.split(","))
                    .map(String::trim)
                    .filter(s -> !s.isEmpty())
                    .collect(Collectors.toList());

            registry.addMapping("/**")
                    // Use patterns to support exact origins or wildcard subdomains if provided
                    .allowedOriginPatterns(origins.toArray(new String[0]))
                    .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
                    .allowedHeaders("*")
                    .allowCredentials(true)
                    .maxAge(3600);
        }
    }
}