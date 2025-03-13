package com.example.rainbowcompany.domain.user;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public ResponseEntity getAllUsers(){
        var getUsers = userRepository.findAll();
        return ResponseEntity.ok(getUsers);
    }

    public ResponseEntity registerUser(@Validated @RequestBody RequestUser data){
        try {
            User newUser = new User(data);
            userRepository.save(newUser);
            return ResponseEntity.ok().body("New user register");
        }catch (Exception e){
            throw new EntityNotFoundException("User not register");
        }
    }

    public ResponseEntity updateUser(@Validated @RequestBody RequestUser data){
        Optional<User> optionalUser = userRepository.findById(data.id());
        if ( optionalUser.isPresent()){
            User user = optionalUser.get();
            user.setName(data.name());
            user.setCpf(data.cpf());
            user.setEmail(data.email());
            user.setColor(data.color());
            user.setNote(data.note());
            userRepository.save(user);
            return ResponseEntity.ok().body("User is update");
        }else {
            throw new EntityNotFoundException("User is not found");
        }
    }

    public ResponseEntity deleteUserById(String id){
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()){
            userRepository.deleteById(id);
            return ResponseEntity.ok().body("User successfully deleted");
        }else {
            throw new EntityNotFoundException("User not found");
        }
    }
}
