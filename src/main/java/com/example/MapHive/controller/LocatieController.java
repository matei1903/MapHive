package com.example.MapHive.controller;

import com.example.MapHive.model.Locatie;
import com.example.MapHive.service.LocatieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/locatii")
@CrossOrigin(origins = "https://maphive-6ebff.web.app/") // Originea permisă
public class LocatieController {

    @Autowired
    private LocatieService locatieService;

    @GetMapping("/cautare")
    public List<Locatie> cautaLocatiiDupaTip(@RequestParam String tip) {
        System.out.println("Căutare locații după tip: " + tip); // pentru debugging
        return locatieService.getLocatiiByTip(tip);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Locatie> getLocatieById(@PathVariable Integer id) {
        Locatie locatie = locatieService.getLocatieById(id);
        if (locatie != null) {
            return ResponseEntity.ok(locatie);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @PostMapping
    public Locatie createLocatie(@RequestBody Locatie locatie) {
        return locatieService.createLocatie(locatie);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Locatie> updateLocatie(@PathVariable Integer id, @RequestBody Locatie locatieDetails) {
        Locatie updatedLocatie = locatieService.updateLocatie(id, locatieDetails);
        if (updatedLocatie != null) {
            return ResponseEntity.ok(updatedLocatie);
        } else {
            return ResponseEntity.notFound().build();
        }
    }



    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLocatie(@PathVariable Integer id) {
        boolean isDeleted = locatieService.deleteLocatie(id);
        if (isDeleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @GetMapping("/locatii-nume")
    public List<String> getAllLocatiiNume() {
        return locatieService.getAllLocatiiNume();
    }

    @GetMapping
    public List<Locatie> getAllLocatii() {
        return locatieService.getAllLocatii();
    }

    @GetMapping("/locatii-cu-tipuri")
    public List<Object[]> getLocatiiCuTipuri() {
        return locatieService.getLocatiiCuTipuri();
    }
}
