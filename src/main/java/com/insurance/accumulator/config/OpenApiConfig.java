package com.insurance.accumulator.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;

@Configuration
public class OpenApiConfig {

    @Value("${server.servlet.context-path:}")
    private String contextPath;

    @Bean
    public OpenAPI customOpenAPI() {
        String baseUrl = "/";
        if (contextPath != null && !contextPath.isEmpty()) {
            baseUrl = contextPath;
        }
        
        Server server = new Server()
            .url(baseUrl)
            .description("Current Server");
            
        return new OpenAPI()
                .addServersItem(server)
                .info(new Info()
                        .title("Insurance Accumulator API")
                        .description("API for managing insurance benefit plans, deductibles, and out-of-pocket maximums")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("Insurance Team")
                                .email("support@insurance.com")
                                .url("https://insurance.com"))
                        .license(new License()
                                .name("MIT License")
                                .url("https://opensource.org/licenses/MIT")));
    }
}
