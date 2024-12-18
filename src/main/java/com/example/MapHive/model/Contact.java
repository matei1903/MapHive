package com.example.MapHive.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "contacte")
public class Contact {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "locatie_id")
    private Locatie locatie;

    private String telefon;
    private String email;
    private String website;

    // Getteri și setteri
}
