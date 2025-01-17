package com.example.MapHive.repository;

import com.example.MapHive.model.LocatieAtribut;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LocatieAtributRepository extends JpaRepository<LocatieAtribut, Integer> {
    List<LocatieAtribut> findByAtributNume(String numeAtribut);
    List<LocatieAtribut> findByAtributNumeIn(List<String> numeAtribute);

}

