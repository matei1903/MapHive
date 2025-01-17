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

    @JsonProperty("locatie_adresa")
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

    public void setNume(String nume) {
        this.nume = nume;
    }

    public Integer getId() {
        return id;
    }

    public String getDescriere() {
        return descriere;
    }

    public String getAdresa() {
        return adresa;
    }

    public Double getLatitudine() {
        return latitudine;
    }

    public Double getLongitudine() {
        return longitudine;
    }

    public TipLocatie getTipLocatie() {
        return tipLocatie;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setDescriere(String descriere) {
        this.descriere = descriere;
    }

    public void setAdresa(String adresa) {
        this.adresa = adresa;
    }

    public void setLatitudine(Double latitudine) {
        this.latitudine = latitudine;
    }

    public void setLongitudine(Double longitudine) {
        this.longitudine = longitudine;
    }

    public void setTipLocatie(TipLocatie tipLocatie) {
        this.tipLocatie = tipLocatie;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public void setId(Integer id) {
        this.id = id;
    }

// Getteri și setteri
}
