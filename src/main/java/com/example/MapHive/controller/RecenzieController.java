package com.example.MapHive.controller;

import com.example.MapHive.dto.RecenzieDto;
import com.example.MapHive.model.Recenzie;
import com.example.MapHive.service.RecenzieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/recenzii")
@CrossOrigin(origins = "https://maphive-6ebff.web.app/") // Originea permisă
public class RecenzieController {

    @Autowired
    private RecenzieService recenzieService;

    // Endpoint pentru a adăuga o recenzie
    @PostMapping("/adauga/{utilizatorId}")
    public ResponseEntity<Recenzie> adaugaRecenzie(@RequestBody RecenzieDto recenzieDTO, @PathVariable Integer utilizatorId) {
        Recenzie recenzie = recenzieService.adaugaRecenzie(recenzieDTO, utilizatorId);
        return ResponseEntity.ok(recenzie);
    }

    // Endpoint pentru a șterge o recenzie postată de un utilizator
    @DeleteMapping("/recenzii/{recenzieId}/utilizator/{utilizatorId}")
    public ResponseEntity<String> stergeRecenzie(@PathVariable Integer recenzieId, @PathVariable Integer utilizatorId) {
        try {
            recenzieService.stergeRecenzie(utilizatorId, recenzieId);
            return ResponseEntity.ok("Recenzia a fost ștearsă cu succes");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    // Endpoint pentru a obține toate recenziile pentru o locație
    @GetMapping("/locatie/{locatieId}")
    public ResponseEntity<List<Recenzie>> getRecenziiLocatie(@PathVariable Integer locatieId) {
        List<Recenzie> recenzii = recenzieService.getRecenziiLocatie(locatieId);
        return new ResponseEntity<>(recenzii, HttpStatus.OK);
    }

    // Endpoint pentru a obține toate recenziile pentru un utilizator
    @GetMapping("/utilizator/{utilizatorId}")
    public ResponseEntity<List<Recenzie>> getRecenziiUtilizator(@PathVariable Integer utilizatorId) {
        List<Recenzie> recenzii = recenzieService.getRecenziiUtilizator(utilizatorId);
        return new ResponseEntity<>(recenzii, HttpStatus.OK);
    }

    // Endpoint pentru a obține o recenzie după ID
    @GetMapping("/{id}")
    public ResponseEntity<Recenzie> getRecenzieById(@PathVariable Integer id) {
        Optional<Recenzie> recenzie = recenzieService.getRecenzieById(id);
        return recenzie.map(response -> new ResponseEntity<>(response, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    // Endpoint pentru a obține toate recenziile
    @GetMapping
    public List<Recenzie> getAllRecenzii() {
        return recenzieService.getAllRecenzii();
    }

    // Endpoint pentru a șterge o recenzie
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> stergeRecenzie(@PathVariable Integer id) {
        recenzieService.stergeRecenzie(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
