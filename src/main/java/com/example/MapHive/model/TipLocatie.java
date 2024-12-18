package com.example.MapHive.model;

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
    private List<Locatie> locatii = new ArrayList<>();

    // Getteri și setteri
}
