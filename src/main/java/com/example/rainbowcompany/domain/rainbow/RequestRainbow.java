package com.example.rainbowcompany.domain.rainbow;

public record RequestRainbow(
        String id,
        String name,
        String cpf,
        String color,
        String email,
        String note
) {
}
