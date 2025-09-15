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

        @Value("${app.cors.permissive:false}")
        private boolean permissive;

        @Override
        public void addCorsMappings(CorsRegistry registry) {
            if (permissive) {
                System.out.println("[CORS] Permissive mode enabled: allowing all origins, no credentials");
                registry.addMapping("/**")
                        .allowedOriginPatterns("*")
                        .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(false)
                        .maxAge(3600);
                return;
            }

            List<String> origins = Arrays.stream(allowedOriginsProp.split(","))
                    .map(String::trim)
                    .filter(s -> !s.isEmpty())
                    .collect(Collectors.toList());

            System.out.println("[CORS] Restricted mode: allowed origins " + origins + ", credentials=true");

            registry.addMapping("/**")
                    .allowedOrigins(origins.toArray(new String[0]))
                    .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
                    .allowedHeaders("*")
                    .allowCredentials(true)
                    .maxAge(3600);
        }
    }
}