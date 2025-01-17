package com.example.MapHive.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**") // Permite toate rutele care încep cu /api/
                        .allowedOrigins("https://maphive-6ebff.web.app/") // Originea frontend-ului (React sau altă aplicație)
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Metodele permise
                        .allowedHeaders("*") // Toate headerele permise
                        .allowCredentials(true); // Permite cookie-uri, dacă este necesar
            }
        };
    }
}
