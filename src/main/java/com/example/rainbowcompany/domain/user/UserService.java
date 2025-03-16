package com.example.rainbowcompany.domain.user;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Page<User> getAllUsers(Pageable pageable) {
        return userRepository.findAll(pageable);
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

    public ResponseEntity<String> updateUser(@PathVariable String id, @Validated @RequestBody RequestUser data) {
        Optional<User> optionalUser = userRepository.findById(id);

        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        boolean cpfExists = userRepository.existsByCpfAndIdNot(data.cpf(), id);
        boolean emailExists = userRepository.existsByEmailAndIdNot(data.email(), id);

        if (cpfExists || emailExists) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("CPF or Email already used.");
        }

        User user = optionalUser.get();
        user.setName(data.name());
        user.setCpf(data.cpf());
        user.setEmail(data.email());
        user.setColor(data.color());
        user.setNote(data.note());

        userRepository.save(user);
        return ResponseEntity.ok("User is updated");
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
