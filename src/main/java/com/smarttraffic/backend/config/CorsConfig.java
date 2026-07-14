package com.smarttraffic.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.List;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {

        CorsConfiguration configuration = new CorsConfiguration();

        // Allow credentials (Cookies, Authorization headers)
        configuration.setAllowCredentials(true);

        // React Frontend
        configuration.setAllowedOrigins(List.of(
                "http://localhost:5173"
        ));

        // Allowed HTTP methods
        configuration.setAllowedMethods(List.of(
                "GET",
                "POST",
                "PUT",
                "DELETE",
                "PATCH",
                "OPTIONS"
        ));

        // Allowed request headers
        configuration.setAllowedHeaders(List.of("*"));

        // Exposed response headers
        configuration.setExposedHeaders(List.of("*"));

        // Cache preflight request for 1 hour
        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration(
                "/**",
                configuration
        );

        return new CorsFilter(source);
    }
}