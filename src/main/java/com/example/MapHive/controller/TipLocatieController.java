package com.example.MapHive.controller;

import com.example.MapHive.model.TipLocatie;
import com.example.MapHive.service.TipLocatieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tipuri-locatie")
@CrossOrigin(origins = "https://maphive-6ebff.web.app/") // Originea permisă
public class TipLocatieController {

    @Autowired
    private TipLocatieService tipLocatieService;

    @GetMapping
    public List<TipLocatie> getAllTipuriLocatie() {
        return tipLocatieService.getAllTipuriLocatie();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TipLocatie> getTipLocatieById(@PathVariable Integer id) {
        TipLocatie tipLocatie = tipLocatieService.getTipLocatieById(id);
        if (tipLocatie != null) {
            return ResponseEntity.ok(tipLocatie);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public TipLocatie createTipLocatie(@RequestBody TipLocatie tipLocatie) {
        return tipLocatieService.createTipLocatie(tipLocatie);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TipLocatie> updateTipLocatie(@PathVariable Integer id, @RequestBody TipLocatie tipLocatieDetails) {
        TipLocatie updatedTipLocatie = tipLocatieService.updateTipLocatie(id, tipLocatieDetails);
        if (updatedTipLocatie != null) {
            return ResponseEntity.ok(updatedTipLocatie);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTipLocatie(@PathVariable Integer id) {
        boolean isDeleted = tipLocatieService.deleteTipLocatie(id);
        if (isDeleted) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
