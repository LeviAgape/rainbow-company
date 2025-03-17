package com.example.rainbowcompany.controller;

import com.example.rainbowcompany.domain.user.RequestUser;
import com.example.rainbowcompany.domain.user.User;
import com.example.rainbowcompany.domain.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
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
    public ResponseEntity<Page<User>> getAllUsers(
            @PageableDefault(size = 10, sort = "name", direction = Sort.Direction.ASC) Pageable pageable) {
        return ResponseEntity.ok(userService.getAllUsers(pageable));
    }

    @PostMapping
    public ResponseEntity registerUser(@Validated @RequestBody RequestUser data) {
        return userService.registerUser(data);
    }

    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity updateUser(@PathVariable String id, @Validated @RequestBody RequestUser data) {
        return userService.updateUser(id, data);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteUserById(@PathVariable String id) {
        return userService.deleteUserById(id);
    }
}

