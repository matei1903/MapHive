package com.example.MapHive.service;

import com.example.MapHive.dto.RecenzieDto;
import com.example.MapHive.model.Locatie;
import com.example.MapHive.model.Recenzie;
import com.example.MapHive.model.Utilizator;
import com.example.MapHive.repository.LocatieRepository;
import com.example.MapHive.repository.RecenzieRepository;
import com.example.MapHive.repository.UtilizatorRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RecenzieService {

    @Autowired
    private RecenzieRepository recenzieRepository;

    @Autowired
    private LocatieRepository locatieRepository;

    @Autowired
    private UtilizatorRepository utilizatorRepository;

    // Metodă pentru a adăuga o recenzie
    @Transactional
    public Recenzie adaugaRecenzie(RecenzieDto recenzieDTO, Integer utilizatorId) {
        Utilizator utilizator = utilizatorRepository.findById(utilizatorId)
                .orElseThrow(() -> new RuntimeException("Utilizatorul nu a fost găsit"));

        Locatie locatie = locatieRepository.findById(recenzieDTO.getLocatieId())
                .orElseThrow(() -> new RuntimeException("Locația nu a fost găsită"));

        // Verificăm dacă utilizatorul a mai adăugat o recenzie pentru locația respectivă
        if (recenzieRepository.existsByUtilizatorAndLocatie(utilizator, locatie)) {
            throw new RuntimeException("Utilizatorul a mai adăugat o recenzie pentru această locație");
        }

        Recenzie recenzie = new Recenzie();
        recenzie.setUtilizator(utilizator);
        recenzie.setLocatie(locatie);
        recenzie.setRating(recenzieDTO.getRating());
        recenzie.setComentariu(recenzieDTO.getComentariu());

        return recenzieRepository.save(recenzie);
    }

    // Metodă care șterge recenzia postată de un utilizator pentru o locație
    @Transactional
    public void stergeRecenzie(Integer utilizatorId, Integer recenzieId) {
        Recenzie recenzie = recenzieRepository.findById(recenzieId)
                .orElseThrow(() -> new RuntimeException("Recenzia nu a fost găsită"));

        // Verifică dacă utilizatorul care încearcă să șteargă recenzia este acela care a postat-o
        if (!recenzie.getUtilizator().getId().equals(utilizatorId)) {
            throw new RuntimeException("Utilizatorul nu are permisiunea de a șterge această recenzie");
        }

        recenzieRepository.deleteById(recenzieId);
    }
    // Metodă pentru a obține toate recenziile pentru o locație
    public List<Recenzie> getRecenziiLocatie(Integer locatieId) {
        return recenzieRepository.findAll().stream()
                .filter(recenzie -> recenzie.getLocatie().getId().equals(locatieId))
                .toList();
    }

    // Metodă pentru a obține recenziile unui utilizator
    public List<Recenzie> getRecenziiUtilizator(Integer utilizatorId) {
        return recenzieRepository.findAll().stream()
                .filter(recenzie -> recenzie.getUtilizator().getId().equals(utilizatorId))
                .toList();
    }

    // Metodă pentru a obține o recenzie după ID
    public Optional<Recenzie> getRecenzieById(Integer id) {
        return recenzieRepository.findById(id);
    }

    public List<Recenzie> getAllRecenzii() {
        return recenzieRepository.findAll();
    }
    // Metodă pentru a șterge o recenzie
    public void stergeRecenzie(Integer id) {
        recenzieRepository.deleteById(id);
    }
}
