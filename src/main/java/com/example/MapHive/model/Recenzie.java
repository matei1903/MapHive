package com.example.MapHive.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "recenzii", uniqueConstraints = @UniqueConstraint(columnNames = {"utilizator_id", "locatie_id"}))
public class Recenzie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "utilizator_id")
    private Utilizator utilizator;

    @ManyToOne
    @JoinColumn(name = "locatie_id")
    private Locatie locatie;

    private Integer rating;

    private String comentariu;

    @Column(name = "created_at", columnDefinition = "TIMESTAMP")
    private LocalDateTime createdAt = LocalDateTime.now();

    // Getteri și setteri
}
