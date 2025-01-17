package com.example.MapHive.repository;

import com.example.MapHive.model.LocatiiUtilizator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LocatiiUtilizatorRepository extends JpaRepository<LocatiiUtilizator, Integer> {
    // Metodă pentru a căuta locațiile după utilizatorId
    List<LocatiiUtilizator> findByUtilizatorId(Integer utilizatorId);
}
