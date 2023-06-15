package com.magroun.realestate.controllers;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

import org.springframework.beans.factory.annotation.Autowired;
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
          
        System.out.println("Email value: " + email);
        
        // Get the user by email
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
    public String checkResetCode(@RequestBody UserCredentials credentials) {
        String email = credentials.getEmail();
        Integer resetCode = credentials.getResetCode();
        System.out.println(email+resetCode);

        // Retrieve user from the database using the email (assuming you have a UserDetailsService implementation)
        User user = userRepository.getUserByEmail(email);
        if (user == null) {
            return "User not found";
        }

        // Check if the reset code time is not older than 20 minutes
        LocalDateTime resetCodeTime = user.getResetCodeTime();
        LocalDateTime currentDateTime = LocalDateTime.now();
        long minutesElapsed = ChronoUnit.MINUTES.between(resetCodeTime, currentDateTime);
        if (minutesElapsed > 20) {
            return "Reset code expired";
        }

        // Check if the reset code matches the one stored in the database
        Integer storedResetCode = user.getResetCode();
        if (!resetCode.equals(storedResetCode)) {
            return "Invalid reset code";
        }

        return ""; // Return an empty string to indicate success without any specific error message
    }

    
    @PostMapping("/updatePassword")
    public String updatePassword(@RequestBody UserCredentials credentials) {
        String email = credentials.getEmail();
        String newPassword = credentials.getPassword();
        Integer resetCode = credentials.getResetCode();

        // Retrieve user from database using the email (assuming you have a UserDetailsService implementation)
        User user = userRepository.getUserByEmail(email);
        if (user == null) {
            return "User not found";
        }

        // Check if the reset code time is not older than 20 minutes
        LocalDateTime resetCodeTime = user.getResetCodeTime();
        LocalDateTime currentDateTime = LocalDateTime.now();
        long minutesElapsed = ChronoUnit.MINUTES.between(resetCodeTime, currentDateTime);
        if (minutesElapsed > 20) {
            return "Reset code expired";
        }

        // Check if the reset code matches the one stored in the database
        Integer storedResetCode = user.getResetCode();
        if (!resetCode.equals(storedResetCode)) {
            return "Invalid reset code";
        }

        // Encode the new password
        String encodedPassword = encoder.encode(newPassword);

        // Update the user's password
        user.setPassword(encodedPassword);
        userRepository.save(user);

        return "Password updated successfully";
    }
}


