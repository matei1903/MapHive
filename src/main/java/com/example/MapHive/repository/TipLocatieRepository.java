package com.example.MapHive.repository;

import com.example.MapHive.model.TipLocatie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TipLocatieRepository extends JpaRepository<TipLocatie, Integer> {
}