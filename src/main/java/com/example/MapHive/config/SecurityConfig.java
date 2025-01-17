package com.example.MapHive.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http
//                .csrf(csrf -> csrf.disable()) // Dezactivează CSRF (opțional pentru testare)
//                .authorizeHttpRequests(auth -> auth
//                        .requestMatchers("/api/**").permitAll() // Permite accesul pentru toate cererile către /api/**
//                        .anyRequest().authenticated() // Alte cereri necesită autentificare
//                )
//                .httpBasic(Customizer.withDefaults()); // Activează HTTP Basic Authentication (opțional)
//
//        return http.build();
//    }

    //Dezactivare securitate

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth.anyRequest().permitAll()); // Permite accesul la toate cererile

        return http.build();
    }
}
