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

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNume() {
        return nume;
    }

    public void setNume(String nume) {
        this.nume = nume;
    }
}
