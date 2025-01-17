package com.example.MapHive.repository;

import com.example.MapHive.model.Locatie;
import com.example.MapHive.model.LocatieAtribut;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LocatieRepository extends JpaRepository<Locatie, Integer> {



    @Query("SELECT l FROM Locatie l JOIN l.tipLocatie t WHERE t.nume = :tipLocatie")
    List<Locatie> findByTipLocatie(@Param("tipLocatie") String tipLocatie);

    @Query("SELECT l.nume FROM Locatie l")
    List<String> findAllLocatiiNume();

    @Query("SELECT l.nume AS numeLocatie, t.nume AS numeTipLocatie FROM Locatie l JOIN l.tipLocatie t")
    List<Object[]> findLocatiiCuTipuri();
}
