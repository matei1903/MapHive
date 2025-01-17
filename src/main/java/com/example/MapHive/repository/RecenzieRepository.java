package com.example.MapHive.repository;

import com.example.MapHive.model.Locatie;
import com.example.MapHive.model.Recenzie;
import com.example.MapHive.model.Utilizator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecenzieRepository extends JpaRepository<Recenzie, Integer> {

    boolean existsByUtilizatorAndLocatie(Utilizator utilizator, Locatie locatie);
}
