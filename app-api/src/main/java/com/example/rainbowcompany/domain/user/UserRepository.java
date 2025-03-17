package com.example.rainbowcompany.domain.user;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
    boolean existsByCpfAndIdNot(String cpf, String id);
    boolean existsByEmailAndIdNot(String email, String id);
}
