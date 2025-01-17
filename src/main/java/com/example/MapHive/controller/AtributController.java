package com.example.MapHive.controller;

import com.example.MapHive.model.Atribut;
import com.example.MapHive.model.Locatie;
import com.example.MapHive.service.AtributService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/atribute")
@CrossOrigin(origins = "https://maphive-6ebff.web.app/") // Originea permisă
public class AtributController {

    @Autowired
    private AtributService atributService;


//    @GetMapping("/locatii")
//    public List<Locatie> getLocatiiByAtribut(@RequestParam String numeAtribut) {
//        return atributService.getLocatiiByAtribut(numeAtribut);
//    }

    @GetMapping("/locatii")
    public List<Locatie> getLocatiiByAtribute(@RequestParam List<String> numeAtribute) {
        return atributService.getLocatiiByAtribute(numeAtribute);
    }

    // Obține toate atributele
    @GetMapping
    public List<Atribut> getAllAtribute() {
        return atributService.getAllAtribute();
    }

    // Obține un atribut după ID
    @GetMapping("/{id}")
    public ResponseEntity<Atribut> getAtributById(@PathVariable Integer id) {
        Atribut atribut = atributService.getAtributById(id);
        if (atribut != null) {
            return ResponseEntity.ok(atribut);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Creează un atribut nou
    @PostMapping
    public Atribut createAtribut(@RequestBody Atribut atribut) {
        return atributService.createAtribut(atribut);
    }

    // Actualizează un atribut
    @PutMapping("/{id}")
    public ResponseEntity<Atribut> updateAtribut(@PathVariable Integer id, @RequestBody Atribut atributDetails) {
        Atribut updatedAtribut = atributService.updateAtribut(id, atributDetails);
        if (updatedAtribut != null) {
            return ResponseEntity.ok(updatedAtribut);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Șterge un atribut
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAtribut(@PathVariable Integer id) {
        boolean isDeleted = atributService.deleteAtribut(id);
        if (isDeleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
