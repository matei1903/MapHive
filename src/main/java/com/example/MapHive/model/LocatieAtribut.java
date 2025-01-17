package com.example.MapHive.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "locatii_atribute")
public class LocatieAtribut {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "locatie_id")
    private Locatie locatie;

    @ManyToOne
    @JoinColumn(name = "atribut_id")
    private Atribut atribut;

    private String valoare;

    // Getteri și setteri

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Locatie getLocatie() {
        return locatie;
    }

    public void setLocatie(Locatie locatie) {
        this.locatie = locatie;
    }

    public Atribut getAtribut() {
        return atribut;
    }

    public void setAtribut(Atribut atribut) {
        this.atribut = atribut;
    }

    public String getValoare() {
        return valoare;
    }

    public void setValoare(String valoare) {
        this.valoare = valoare;
    }
}
