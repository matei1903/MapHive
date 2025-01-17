package com.example.MapHive.service;

import com.example.MapHive.model.Locatie;
import com.example.MapHive.repository.LocatieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class LocatieService {

    @Autowired
    private LocatieRepository locatieRepository;

    public List<Locatie> getLocatiiByTip(String tipLocatie) {
        return locatieRepository.findByTipLocatie(tipLocatie);
    }

    public Locatie getLocatieById(Integer id) {
        return locatieRepository.findById(id).orElse(null);
    }


    public Locatie createLocatie(Locatie locatie) {
        return locatieRepository.save(locatie);
    }


    public Locatie updateLocatie(Integer id, Locatie locatieDetails) {
        Locatie locatie = locatieRepository.findById(id).orElse(null);
        if (locatie != null) {
            locatie.setNume(locatieDetails.getNume());
            locatie.setAdresa(locatieDetails.getAdresa());
            locatie.setDescriere(locatieDetails.getDescriere());
            locatie.setLatitudine(locatieDetails.getLatitudine());
            locatie.setLongitudine(locatieDetails.getLongitudine());
            locatie.setTipLocatie(locatieDetails.getTipLocatie());
            return locatieRepository.save(locatie);
        }
        return null;
    }


    public boolean deleteLocatie(Integer id) {
        if (locatieRepository.existsById(id)) {
            locatieRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public List<String> getAllLocatiiNume() {
        return locatieRepository.findAllLocatiiNume();
    }

    public List<Locatie> getAllLocatii() {
        return locatieRepository.findAll();
    }

    public List<Object[]> getLocatiiCuTipuri() {
        return locatieRepository.findLocatiiCuTipuri();
    }
}
