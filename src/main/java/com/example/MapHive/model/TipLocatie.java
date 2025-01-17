package com.example.MapHive.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Table(name = "tipuri_locatie")
public class TipLocatie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true)
    private String nume;

    @OneToMany(mappedBy = "tipLocatie", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Locatie> locatii = new ArrayList<>();

    // Getteri și setteri

    public String getNume() {
        return nume;
    }

    public void setNume(String nume) {
        this.nume = nume;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public List<Locatie> getLocatii() {
        return locatii;
    }

    public void setLocatii(List<Locatie> locatii) {
        this.locatii = locatii;
    }
}
