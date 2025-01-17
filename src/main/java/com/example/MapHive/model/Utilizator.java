package com.example.MapHive.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.firebase.database.annotations.NotNull;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "utilizatori")
public class Utilizator {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String parola;

    @Column(name = "created_at", columnDefinition = "TIMESTAMP")
    private LocalDateTime createdAt = LocalDateTime.now();

    private Boolean deleted = false;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getParola() {
        return parola;
    }

    public void setParola(String parola) {
        this.parola = parola;
    }

    public Boolean getDeleted() {
        return deleted;
    }

    public void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }

    public Utilizator(Integer id, String username, String email, String parola, LocalDateTime createdAt, Boolean deleted) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.parola = parola;
        this.createdAt = createdAt;
        this.deleted = deleted;
    }

    public Utilizator() {
    }

    // Constructor cu parametri pentru crearea unui utilizator
    public Utilizator(String username, String email, String parola) {
        this.username = username;
        this.email = email;
        this.parola = parola;
    }
}
