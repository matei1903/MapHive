package com.example.MapHive.controller;

import com.example.MapHive.dto.LoginResponseDto;
import com.example.MapHive.dto.UtilizatorDto;
import com.example.MapHive.model.Utilizator;
import com.example.MapHive.repository.UtilizatorRepository;
import com.example.MapHive.service.PasswordService;
import com.example.MapHive.service.UtilizatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/utilizatori")
@CrossOrigin(origins = "https://maphive-6ebff.web.app/") // Originea permisă
public class UtilizatorController {

    @Autowired
    private UtilizatorService utilizatorService;

    @Autowired
    private UtilizatorRepository utilizatorRepository;

    @Autowired
    private PasswordService passwordService;

    @GetMapping
    public List<Utilizator> getAllUtilizatori() {
        return utilizatorService.getAllUtilizatori();
    }


    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody UtilizatorDto utilizatorDto) {
        // Verifică dacă email-ul este deja folosit
        if (utilizatorRepository.existsByEmail(utilizatorDto.getEmail())) {
            return ResponseEntity.badRequest().body("Email-ul este deja folosit!");
        }

        // Verifică dacă username-ul este deja folosit
        if (utilizatorRepository.existsByUsername(utilizatorDto.getUsername())) {
            return ResponseEntity.badRequest().body("Username-ul este deja folosit!");
        }

        Utilizator utilizator = new Utilizator();
        utilizator.setUsername(utilizatorDto.getUsername());
        utilizator.setEmail(utilizatorDto.getEmail());

        // Criptare parolă înainte de salvare folosind PasswordService
        utilizator.setParola(passwordService.hashPassword(utilizatorDto.getParola()));
        utilizator.setCreatedAt(LocalDateTime.now());

        utilizatorRepository.save(utilizator);

        return ResponseEntity.ok("Utilizator creat cu succes!");
    }




    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UtilizatorDto utilizatorDto) {
        Optional<Utilizator> optionalUtilizator = utilizatorRepository.findByEmail(utilizatorDto.getEmail());

        if (optionalUtilizator.isPresent()) {
            Utilizator utilizator = optionalUtilizator.get();
            boolean isAuthenticated = passwordService.verifyPassword(utilizatorDto.getParola(), utilizator.getParola());

            if (isAuthenticated) {
                // Creează răspunsul cu ID-ul utilizatorului
                LoginResponseDto response = new LoginResponseDto(utilizator.getId(), "Autentificare reușită!");
                return ResponseEntity.ok(response);
            }
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new LoginResponseDto(null, "Email sau parolă incorectă."));
    }





    @GetMapping("/{id}")
    public ResponseEntity<Utilizator> getUtilizatorById(@PathVariable Integer id) {
        Utilizator utilizator = utilizatorService.getUtilizatorById(id);
        if (utilizator != null) {
            return ResponseEntity.ok(utilizator);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Utilizator> createUtilizator(@RequestBody Utilizator utilizator) {
        Utilizator createdUtilizator = utilizatorService.createUtilizator(utilizator);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUtilizator);
    }

//    @PutMapping("/{id}")
//    public ResponseEntity<Utilizator> updateUtilizator(@PathVariable Integer id, @RequestBody Utilizator utilizatorDetails) {
//        Utilizator updatedUtilizator = utilizatorService.updateUtilizator(id, utilizatorDetails);
//        if (updatedUtilizator != null) {
//            return ResponseEntity.ok(updatedUtilizator);
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUtilizator(@PathVariable Integer id) {
        boolean isDeleted = utilizatorService.deleteUtilizator(id);
        if (isDeleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
