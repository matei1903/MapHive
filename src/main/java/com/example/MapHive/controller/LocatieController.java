package com.example.MapHive.controller;

import com.example.MapHive.model.Locatie;
import com.example.MapHive.service.LocatieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/locatii")
public class LocatieController {

    @Autowired
    private LocatieService locatieService;

    @GetMapping("/cautare")
    public List<Locatie> cautaLocatiiDupaTip(@RequestParam String tip) {
        System.out.println("Căutare locații după tip: " + tip); // pentru debugging
        return locatieService.getLocatiiByTip(tip);
    }


    @GetMapping("/locatii-nume")
    public List<String> getAllLocatiiNume() {
        return locatieService.getAllLocatiiNume();
    }

    @GetMapping("/locatii-cu-tipuri")
    public List<Object[]> getLocatiiCuTipuri() {
        return locatieService.getLocatiiCuTipuri();
    }
}
