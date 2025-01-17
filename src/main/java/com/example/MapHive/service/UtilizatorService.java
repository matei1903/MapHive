package com.example.MapHive.service;

import com.example.MapHive.model.Utilizator;
import com.example.MapHive.repository.UtilizatorRepository;
import com.google.auto.value.AutoOneOf;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UtilizatorService {

    @Autowired
    private UtilizatorRepository utilizatorRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private PasswordService passwordService;

    public List<Utilizator> getAllUtilizatori() {
        return utilizatorRepository.findAll();
    }

    public Utilizator getUtilizatorById(Integer id) {
        Optional<Utilizator> utilizator = utilizatorRepository.findById(id);
        return utilizator.orElse(null);
    }

    public Utilizator createUtilizator(Utilizator utilizator) {
        return utilizatorRepository.save(utilizator);
    }


    public boolean registerUtilizator(Utilizator utilizator) {
        // Verifică dacă emailul este deja utilizat
        if (utilizatorRepository.findByEmail(utilizator.getEmail()).isPresent()) {
            return false; // Email deja folosit
        }

        // Verifică dacă parola este setată
        if (utilizator.getParola() == null || utilizator.getParola().isEmpty()) {
            throw new IllegalArgumentException("Parola nu poate fi nulă sau goală");
        }

        // Salvează utilizatorul
        utilizatorRepository.save(utilizator);
        return true;
    }




    public boolean authenticateUtilizator(String email, String parola) {
        Optional<Utilizator> optionalUtilizator = utilizatorRepository.findByEmail(email);
        if (optionalUtilizator.isPresent()) {
            Utilizator utilizator = optionalUtilizator.get();
            // Verifică dacă parola introdusă se potrivește cu parola criptată din baza de date
            return passwordService.verifyPassword(parola, utilizator.getParola());
        }
        return false;
    }



//    public Utilizator updateUtilizator(Integer id, Utilizator utilizatorDetails) {
//        Optional<Utilizator> optionalUtilizator = utilizatorRepository.findById(id);
//        if (optionalUtilizator.isPresent()) {
//            Utilizator utilizator = optionalUtilizator.get();
//            utilizator.setUsername(utilizatorDetails.getUsername());
//            utilizator.setEmail(utilizatorDetails.getEmail());
//            // Hash the password if updated
//            if (utilizatorDetails.getParola() != null) {
//                utilizator.setParola(passwordService.hashPassword(utilizatorDetails.getParola()));
//            }
//            return utilizatorRepository.save(utilizator);
//        }
//        return null;
//    }

    public boolean deleteUtilizator(Integer id) {
        if (utilizatorRepository.existsById(id)) {
            utilizatorRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
