package com.example.MapHive.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "locatii")
public class Locatie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String nume;

    private String descriere;

    @Column(nullable = false)
    private String adresa;

    private Double latitudine;
    private Double longitudine;

    @ManyToOne
    @JoinColumn(name = "tip_id")
    private TipLocatie tipLocatie;

    @Column(name = "created_at", columnDefinition = "TIMESTAMP")
    private LocalDateTime createdAt = LocalDateTime.now();

    @JsonProperty("locatie_nume")
    public String getNume() {
        return nume;
    }
    // Getteri și setteri
}
