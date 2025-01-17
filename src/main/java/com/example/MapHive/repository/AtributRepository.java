package com.example.MapHive.repository;

import com.example.MapHive.model.Atribut;
import com.example.MapHive.model.LocatieAtribut;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AtributRepository extends JpaRepository<Atribut, Integer> {
    Atribut findByNume(String nume);


}
