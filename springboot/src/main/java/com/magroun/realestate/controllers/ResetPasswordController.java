package com.magroun.realestate.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.magroun.realestate.model.User;
import com.magroun.realestate.repository.UserRepository;
import com.magroun.realestate.services.EmailService;
import com.magroun.realestate.services.UserService;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials="true")
@RestController
@RequestMapping("/api/")
public class ResetPasswordController {

	 @Autowired
	 private UserService userService;
    @Autowired
    private EmailService emailService;

    @Autowired
    private  UserRepository userRepository;

    @PostMapping("send-reset-code")
    public ResponseEntity<String> sendResetCodeEmail(@RequestParam("email") String email) {
        // Get the user by email
        User user = userRepository.getUserByEmail(email);

        if (user != null) {
            // Generate reset code and save the user
            userService.generateResetCodeAndSaveUser(user);

            // Send reset code email
            emailService.sendResetCodeEmail(email, user.getResetCode());

            // Return success response to Angular
            return ResponseEntity.ok("Email sent successfully");
        } else {
            // Return error response to Angular
            return ResponseEntity.badRequest().body("Email does not exist");
        }
    }
}
