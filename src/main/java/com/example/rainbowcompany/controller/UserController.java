package com.example.rainbowcompany.controller;

import com.example.rainbowcompany.domain.user.RequestUser;
import com.example.rainbowcompany.domain.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "${frontend.url}")
@RestController
@RequestMapping("/user")
public class UserController {

    @Value("${frontend.url}")
    private String frontendUrl;

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping
    public ResponseEntity registerUser(@Validated @RequestBody RequestUser data) {
        return userService.registerUser(data);
    }

    @PutMapping
    @Transactional
    public ResponseEntity updateUser(@Validated @RequestBody RequestUser data) {
        return userService.updateUser(data);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteUserById(@PathVariable String id) {
        return userService.deleteUserById(id);
    }
}

