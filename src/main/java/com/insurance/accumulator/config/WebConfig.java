package com.insurance.accumulator.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(@NonNull CorsRegistry registry) {
        // Allow the Netlify site and local dev; credentials disabled
        registry.addMapping("/**")
                .allowedOriginPatterns(
                    "https://insurance-accumulator.netlify.app",
                    "http://localhost:3000",
                    "http://127.0.0.1:3000",
                    "http://localhost:3002",
                    "http://127.0.0.1:3002"
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(false)
                .maxAge(3600);
    }
}
