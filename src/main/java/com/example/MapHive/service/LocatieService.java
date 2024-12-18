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

    public List<String> getAllLocatiiNume() {
        return locatieRepository.findAllLocatiiNume();
    }

    public List<Object[]> getLocatiiCuTipuri() {
        return locatieRepository.findLocatiiCuTipuri();
    }
}
