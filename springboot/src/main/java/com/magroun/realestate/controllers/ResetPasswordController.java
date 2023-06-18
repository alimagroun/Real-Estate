package com.magroun.realestate.controllers;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.magroun.realestate.model.User;
import com.magroun.realestate.model.UserCredentials;
import com.magroun.realestate.payload.response.MessageResponse;
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
    
    @Autowired
    PasswordEncoder encoder;

    @PostMapping("send-reset-code")
    public ResponseEntity<Boolean> sendResetCodeEmail(@RequestParam("email") String email) {
        User user = userRepository.getUserByEmail(email);

        if (user != null) {
            // Generate reset code and save the user
            userService.generateResetCodeAndSaveUser(user);

            // Send reset code email
            emailService.sendResetCodeEmail(email, user.getResetCode());

            // Return success response to Angular
            return ResponseEntity.ok(true);
        } else {
            // Return error response to Angular
            return ResponseEntity.ok(false);
        }
    }
    
    @PostMapping("checkResetCode")
    public ResponseEntity<MessageResponse> checkResetCode(@RequestBody UserCredentials credentials) {
        String email = credentials.getEmail();
        Integer resetCode = credentials.getResetCode();
        System.out.println(email + resetCode);

        // Retrieve user from the database using the email (assuming you have a UserDetailsService implementation)
        User user = userRepository.getUserByEmail(email);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new MessageResponse("User not found"));
        }

        // Check if the reset code time is not older than 20 minutes
        LocalDateTime resetCodeTime = user.getResetCodeTime();
        LocalDateTime currentDateTime = LocalDateTime.now();
        long minutesElapsed = ChronoUnit.MINUTES.between(resetCodeTime, currentDateTime);
        if (minutesElapsed > 20) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageResponse("Reset code expired"));
        }

        // Check if the reset code matches the one stored in the database
        Integer storedResetCode = user.getResetCode();
        if (!resetCode.equals(storedResetCode)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageResponse("Incorrect reset code"));
        }

        return ResponseEntity.ok(new MessageResponse("ok")); // Return "Well done" for a successful response
    }

    
    @PostMapping("/updatePassword")
    public ResponseEntity<MessageResponse> updatePassword(@RequestBody UserCredentials credentials) {
        String email = credentials.getEmail();
        String newPassword = credentials.getPassword();
        Integer resetCode = credentials.getResetCode();
        
        // Retrieve user from the database using the email
        User user = userRepository.getUserByEmail(email);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new MessageResponse("User not found"));
        }

        // Check if the reset code matches the one stored in the database
        Integer storedResetCode = user.getResetCode();
        if (!resetCode.equals(storedResetCode)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageResponse("Incorrect reset code"));
        }

        String encodedPassword = encoder.encode(newPassword);
        user.setPassword(encodedPassword);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("Password updated successfully"));
    }

}


