package com.example.MapHive.dto;

public class LoginResponseDto {
    private Integer id;
    private String message;

    public LoginResponseDto(Integer id, String message) {
        this.id = id;
        this.message = message;
    }

    // Getteri și setteri
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}

