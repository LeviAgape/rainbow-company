package com.example.rainbowcompany.domain.user;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "users")
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private String id;

    @Column(name = "name")
    private String name;

    @Column(name = "cpf", unique = true)
    private String cpf;

    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "color")
    private String color;

    @Column(name = "note")
    private String note;

    public User(RequestUser requestuser) {
        this.name = requestuser.name();
        this.cpf = requestuser.cpf();
        this.email = requestuser.email();
        this.color = requestuser.color();
        this.note = requestuser.note();
    }
}
