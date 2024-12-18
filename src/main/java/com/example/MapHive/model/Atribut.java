package com.example.MapHive.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "atribute")
public class Atribut {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String nume;

    // Getteri și setteri
}
