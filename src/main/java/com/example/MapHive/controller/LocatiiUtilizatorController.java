package com.example.MapHive.controller;

import com.example.MapHive.dto.LocatiiUtilizatorDto;
import com.example.MapHive.model.LocatiiUtilizator;
import com.example.MapHive.service.LocatiiUtilizatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/locatii-utilizator")
public class LocatiiUtilizatorController {

    private final LocatiiUtilizatorService locatiiUtilizatorService;

    @Autowired
    public LocatiiUtilizatorController(LocatiiUtilizatorService locatiiUtilizatorService) {
        this.locatiiUtilizatorService = locatiiUtilizatorService;
    }

    // Endpoint pentru adăugarea unei locații de către un utilizator
    @PostMapping("/adaugare")
    public ResponseEntity<LocatiiUtilizator> addLocatieUtilizator(@RequestBody LocatiiUtilizatorDto locatieDto) {
        LocatiiUtilizator locatieUtilizator = locatiiUtilizatorService.addLocatieUtilizator(
                locatieDto.getUtilizatorId(),
                locatieDto.getNume(),
                locatieDto.getDescriere(),
                locatieDto.getAdresa(),
                locatieDto.getLatitudine(),
                locatieDto.getLongitudine(),
                locatieDto.getRating(), // adăugăm rating-ul
                locatieDto.getComentariu() // adăugăm comentariul
        );
        return new ResponseEntity<>(locatieUtilizator, HttpStatus.CREATED);
    }

    @DeleteMapping("/sterge/{utilizatorId}/{locatieId}")
    public ResponseEntity<Void> deleteLocatieUtilizator(
            @PathVariable Integer utilizatorId,
            @PathVariable Integer locatieId) {
        boolean deleted = locatiiUtilizatorService.deleteLocatieUtilizator(utilizatorId, locatieId);
        if (deleted) {
            return ResponseEntity.noContent().build(); // 204 No Content dacă ștergerea a fost cu succes
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // 403 Forbidden dacă locația nu aparține utilizatorului
        }
    }

    // Endpoint pentru a obține toate locațiile unui utilizator după ID
    @GetMapping("/locatii/utilizator/{utilizatorId}")
    public ResponseEntity<List<LocatiiUtilizator>> getLocatiiByUtilizatorId(@PathVariable Integer utilizatorId) {
        List<LocatiiUtilizator> locatii = locatiiUtilizatorService.getLocatiiByUtilizatorId(utilizatorId);
        if (locatii.isEmpty()) {
            return ResponseEntity.noContent().build(); // Returnează un răspuns 204 dacă nu sunt locații
        }
        return ResponseEntity.ok(locatii); // Returnează locațiile cu un răspuns 200
    }
}
