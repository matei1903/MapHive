package com.example.MapHive.service;

import com.example.MapHive.model.Atribut;
import com.example.MapHive.model.Locatie;
import com.example.MapHive.model.LocatieAtribut;
import com.example.MapHive.repository.AtributRepository;
import com.example.MapHive.repository.LocatieAtributRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AtributService {

    @Autowired
    private AtributRepository atributRepository;

    @Autowired
    private LocatieAtributRepository locatieAtributRepository;

//    public List<Locatie> getLocatiiByAtribut(String numeAtribut) {
//        List<LocatieAtribut> locatieAtribute = locatieAtributRepository.findByAtributNume(numeAtribut);
//        return locatieAtribute.stream()
//                .map(LocatieAtribut::getLocatie)
//                .collect(Collectors.toList());
//    }
    public List<Locatie> getLocatiiByAtribute(List<String> numeAtribute) {
        List<LocatieAtribut> locatieAtribute = locatieAtributRepository.findByAtributNumeIn(numeAtribute);
        return locatieAtribute.stream()
                .map(LocatieAtribut::getLocatie)
                .distinct() // Opțional, dacă vrei să elimini locațiile duplicate
                .collect(Collectors.toList());
    }


    public List<Atribut> getAllAtribute() {
        return atributRepository.findAll();
    }

    public Atribut getAtributById(Integer id) {
        Optional<Atribut> atribut = atributRepository.findById(id);
        return atribut.orElse(null);
    }

    public Atribut createAtribut(Atribut atribut) {
        return atributRepository.save(atribut);
    }

    public Atribut updateAtribut(Integer id, Atribut atributDetails) {
        Optional<Atribut> optionalAtribut = atributRepository.findById(id);
        if (optionalAtribut.isPresent()) {
            Atribut atribut = optionalAtribut.get();
            atribut.setNume(atributDetails.getNume());
            return atributRepository.save(atribut);
        }
        return null;
    }

    public boolean deleteAtribut(Integer id) {
        if (atributRepository.existsById(id)) {
            atributRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
