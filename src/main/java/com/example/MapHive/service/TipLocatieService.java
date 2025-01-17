package com.example.MapHive.service;

import com.example.MapHive.model.TipLocatie;
import com.example.MapHive.repository.TipLocatieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TipLocatieService {

    @Autowired
    private TipLocatieRepository tipLocatieRepository;

    public List<TipLocatie> getAllTipuriLocatie() {
        return tipLocatieRepository.findAll();
    }

    public TipLocatie getTipLocatieById(Integer id) {
        Optional<TipLocatie> optionalTipLocatie = tipLocatieRepository.findById(id);
        return optionalTipLocatie.orElse(null);
    }

    public TipLocatie createTipLocatie(TipLocatie tipLocatie) {
        return tipLocatieRepository.save(tipLocatie);
    }

    public TipLocatie updateTipLocatie(Integer id, TipLocatie tipLocatieDetails) {
        Optional<TipLocatie> optionalTipLocatie = tipLocatieRepository.findById(id);
        if (optionalTipLocatie.isPresent()) {
            TipLocatie existingTipLocatie = optionalTipLocatie.get();
            existingTipLocatie.setNume(tipLocatieDetails.getNume());
            return tipLocatieRepository.save(existingTipLocatie);
        }
        return null;
    }

    public boolean deleteTipLocatie(Integer id) {
        if (tipLocatieRepository.existsById(id)) {
            tipLocatieRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
