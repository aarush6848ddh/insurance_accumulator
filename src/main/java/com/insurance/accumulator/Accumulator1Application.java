package com.insurance.accumulator;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.context.annotation.Bean;
import org.springframework.core.Ordered;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

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
                System.out.println("[CORS] Permissive mode enabled (WebMvcConfigurer): allowing all origins, no credentials");
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

            System.out.println("[CORS] Restricted mode (WebMvcConfigurer): allowed origins " + origins + ", credentials=true");

            registry.addMapping("/**")
                    .allowedOrigins(origins.toArray(new String[0]))
                    .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
                    .allowedHeaders("*")
                    .allowCredentials(true)
                    .maxAge(3600);
        }

        @Bean
        public FilterRegistrationBean<CorsFilter> corsFilterRegistration() {
            UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
            CorsConfiguration config = new CorsConfiguration();

            if (permissive) {
                System.out.println("[CORS] Permissive mode enabled (CorsFilter): allowing all origins, no credentials");
                config.addAllowedOriginPattern("*");
                config.setAllowCredentials(false);
            } else {
                List<String> origins = Arrays.stream(allowedOriginsProp.split(","))
                        .map(String::trim)
                        .filter(s -> !s.isEmpty())
                        .collect(Collectors.toList());
                System.out.println("[CORS] Restricted mode (CorsFilter): allowed origins " + origins + ", credentials=true");
                origins.forEach(config::addAllowedOrigin);
                config.setAllowCredentials(true);
            }

            config.addAllowedHeader("*");
            config.addAllowedMethod("*");
            // Optional exposed headers if needed by frontend
            // config.addExposedHeader("Location");

            source.registerCorsConfiguration("/**", config);
            CorsFilter filter = new CorsFilter(source);

            FilterRegistrationBean<CorsFilter> bean = new FilterRegistrationBean<>(filter);
            bean.setOrder(Ordered.HIGHEST_PRECEDENCE);
            return bean;
        }
    }
}