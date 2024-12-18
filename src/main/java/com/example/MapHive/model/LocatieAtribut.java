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
}
