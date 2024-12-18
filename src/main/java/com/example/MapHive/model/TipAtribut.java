package com.example.MapHive.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "tip_atribute")
public class TipAtribut {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "atribut_id")
    private Atribut atribut;

    // Getteri și setteri
}
