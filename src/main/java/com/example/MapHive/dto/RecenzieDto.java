package com.example.MapHive.dto;


public class RecenzieDto {

    private Integer locatieId;
    private Integer rating;
    private String comentariu;

    // Getters and setters

    public Integer getLocatieId() {
        return locatieId;
    }

    public void setLocatieId(Integer locatieId) {
        this.locatieId = locatieId;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getComentariu() {
        return comentariu;
    }

    public void setComentariu(String comentariu) {
        this.comentariu = comentariu;
    }
}
