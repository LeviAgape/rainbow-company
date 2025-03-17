package com.example.rainbowcompany.domain.user;

public record RequestUser(
        String id,
        String name,
        String cpf,
        String color,
        String email,
        String note
) {
}
