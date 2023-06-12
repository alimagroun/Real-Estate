package com.magroun.realestate.controllers;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import redis.clients.jedis.Jedis;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.magroun.realestate.repository.UserRepository;
import com.magroun.realestate.services.EmailService;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials="true")
@RestController
@RequestMapping("/api/")
public class ResetPasswordController {

    private final UserRepository userRepository;
    private final EmailService emailService;
    private Jedis jedis; // Removed final modifier

    @Autowired
    public ResetPasswordController(UserRepository userRepository, EmailService emailService) {
        this.userRepository = userRepository;
        this.emailService = emailService;
    }

    @Autowired
    public void setJedis(Jedis jedis) {
        this.jedis = jedis;
    }

    @PostMapping("send-reset-code")
    public ResponseEntity<String> sendResetCodeEmail(@RequestParam("email") String email) {
        boolean emailExists = userRepository.existsByEmail(email);

        if (emailExists) {
            String resetCode = generateResetCode();
            String otpKey = "otp:" + email;
            jedis.setex(otpKey, 1200, resetCode);

            emailService.sendResetCodeEmail(email, resetCode);
            return ResponseEntity.ok("Email sent successfully");
        } else {
            return ResponseEntity.badRequest().body("Email does not exist");
        }
    }

    private String generateResetCode() {
        int otp = new Random().nextInt(900000) + 100000;
        return String.valueOf(otp);
    }
}
