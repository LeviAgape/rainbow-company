package com.example.rainbowcompany.domain.rainbow;

import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class RainbowService {
    @Autowired
    private RainbowRepository rainbowRepository;

    public ResponseEntity findAllRegister(){
        var findAllRegister = rainbowRepository.findAll();
        return ResponseEntity.ok(findAllRegister);
    }
}
