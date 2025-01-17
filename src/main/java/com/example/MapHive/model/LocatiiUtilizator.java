package com.example.MapHive.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "locatii_utilizator")
public class LocatiiUtilizator {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "utilizator_id", nullable = false)
    private Integer utilizatorId;

    @Column(name = "nume", nullable = false)
    private String nume;

    @Column(name = "descriere")
    private String descriere;

    @Column(name = "adresa")
    private String adresa;

    @Column(name = "latitudine")
    private Double latitudine;

    @Column(name = "longitudine")
    private Double longitudine;

    @Column(name = "rating")
    private Integer rating; // Noul câmp pentru rating

    @Column(name = "comentariu", length = 500)
    private String comentariu; // Noul câmp pentru comentariu

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    // Getters and setters

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUtilizatorId() {
        return utilizatorId;
    }

    public void setUtilizatorId(Integer utilizatorId) {
        this.utilizatorId = utilizatorId;
    }

    public String getNume() {
        return nume;
    }

    public void setNume(String nume) {
        this.nume = nume;
    }

    public String getDescriere() {
        return descriere;
    }

    public void setDescriere(String descriere) {
        this.descriere = descriere;
    }

    public String getAdresa() {
        return adresa;
    }

    public void setAdresa(String adresa) {
        this.adresa = adresa;
    }

    public Double getLatitudine() {
        return latitudine;
    }

    public void setLatitudine(Double latitudine) {
        this.latitudine = latitudine;
    }

    public Double getLongitudine() {
        return longitudine;
    }

    public void setLongitudine(Double longitudine) {
        this.longitudine = longitudine;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getComentariu() {
        return comentariu;
    }

    public void setComentariu(String comentariu) {
        this.comentariu = comentariu;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
