package com.example.MapHive.service;

import com.example.MapHive.model.LocatiiUtilizator;
import com.example.MapHive.repository.LocatiiUtilizatorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class LocatiiUtilizatorService {
    private final LocatiiUtilizatorRepository locatiiUtilizatorRepository;

    @Autowired
    public LocatiiUtilizatorService(LocatiiUtilizatorRepository locatiiUtilizatorRepository) {
        this.locatiiUtilizatorRepository = locatiiUtilizatorRepository;
    }
    // Metoda care caută toate locațiile unui utilizator după ID
    public List<LocatiiUtilizator> getLocatiiByUtilizatorId(Integer utilizatorId) {
        return locatiiUtilizatorRepository.findByUtilizatorId(utilizatorId);
    }
    // Metodă pentru adăugarea unei locații de către un utilizator
    public LocatiiUtilizator addLocatieUtilizator(Integer utilizatorId, String nume, String descriere, String adresa, Double latitudine, Double longitudine, Integer rating, String comentariu) {
        LocatiiUtilizator locatieUtilizator = new LocatiiUtilizator();
        locatieUtilizator.setUtilizatorId(utilizatorId);
        locatieUtilizator.setNume(nume);
        locatieUtilizator.setDescriere(descriere);
        locatieUtilizator.setAdresa(adresa);
        locatieUtilizator.setLatitudine(latitudine);
        locatieUtilizator.setLongitudine(longitudine);
        locatieUtilizator.setRating(rating); // setăm rating-ul
        locatieUtilizator.setComentariu(comentariu); // setăm comentariul
        locatieUtilizator.setCreatedAt(LocalDateTime.now());

        return locatiiUtilizatorRepository.save(locatieUtilizator);
    }

    public boolean deleteLocatieUtilizator(Integer utilizatorId, Integer locatieId) {
        // Verificăm dacă locația există și aparține utilizatorului
        return locatiiUtilizatorRepository.findById(locatieId)
                .filter(locatie -> locatie.getUtilizatorId().equals(utilizatorId)) // Verificăm proprietatea locației
                .map(locatie -> {
                    locatiiUtilizatorRepository.delete(locatie); // Ștergem locația
                    return true;
                })
                .orElse(false); // Dacă locația nu există sau nu aparține utilizatorului, returnăm false
    }


}