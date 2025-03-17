package com.example.rainbowcompany.controller;

import com.example.rainbowcompany.domain.user.RequestUser;
import com.example.rainbowcompany.domain.user.User;
import com.example.rainbowcompany.domain.user.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(SpringExtension.class)
@WebMvcTest(UserController.class)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Autowired
    private ObjectMapper objectMapper;

    private RequestUser requestUser;
    private User user;

    @BeforeEach
    void setUp() {
        requestUser = new RequestUser("1", "John Doe", "123.456.789-00", "john@example.com", "Blue", "Test Note");
        user = new User(requestUser);
    }


    @Test
    void shouldGetAllUsers() throws Exception {
        mockMvc.perform(get("/user"))
                .andExpect(status().isOk());
    }

    @Test
    void shouldRegisterUser() throws Exception {
        Mockito.when(userService.registerUser(any(RequestUser.class)))
                .thenReturn(ResponseEntity.ok("User registered"));

        mockMvc.perform(post("/user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(requestUser)))
                .andExpect(status().isOk())
                .andExpect(content().string("User registered"));
    }

    @Test
    void shouldUpdateUser() throws Exception {
        String userId = UUID.randomUUID().toString();

        Mockito.when(userService.updateUser(any(), any()))
                .thenReturn(ResponseEntity.ok("User updated"));

        mockMvc.perform(put("/user/" + userId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(requestUser)))
                .andExpect(status().isOk())
                .andExpect(content().string("User updated"));
    }

    @Test
    void shouldDeleteUser() throws Exception {
        String userId = UUID.randomUUID().toString();

        Mockito.when(userService.deleteUserById(userId))
                .thenReturn(ResponseEntity.ok("User deleted"));

        mockMvc.perform(delete("/user/" + userId))
                .andExpect(status().isOk())
                .andExpect(content().string("User deleted"));
    }
}
