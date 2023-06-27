package com.magroun.realestate.services;

import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.magroun.realestate.model.User;
import com.magroun.realestate.repository.UserRepository;

import java.time.LocalDateTime;
@Service
public class UserService {
	
	  @Autowired
	  PasswordEncoder encoder;
    private UserRepository userRepository;

    // Constructor
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void generateResetCodeAndSaveUser(User user) {
        // Generate a random 6-digit number
    	Integer resetCode = generateRandomSixDigitNumber();

        // Set the generated number to the user's resetCode field
        System.out.println("Reset Code: " + resetCode);
        user.setResetCode(resetCode);

        // Set the current time to the user's resetCodeTime field
        LocalDateTime currentTime = LocalDateTime.now();
        user.setResetCodeTime(currentTime);

        // Save the user using the UserRepository
        userRepository.save(user);
    }

    private Integer generateRandomSixDigitNumber() {
        // Generate a random 6-digit number
        Random random = new Random();
        return random.nextInt(900000) + 100000; // Generates a number between 100,000 and 999,999
    }
    @Transactional
    public User updateUser(Long userId, String newName, String newEmail, String newContactNumber) {
      Optional<User> optionalUser = userRepository.findById(userId);
      if (optionalUser.isPresent()) {
        User user = optionalUser.get();
        
        // Check if the newEmail already exists in the database
        Optional<User> existingUserWithEmail = userRepository.findByEmail(newEmail);
        if (existingUserWithEmail.isPresent() && !existingUserWithEmail.get().getId().equals(userId)) {
          // An existing user with the newEmail already exists and it's not the same user being updated
          throw new IllegalArgumentException("Email is already taken.");
        }
        
        user.setName(newName);
        user.setEmail(newEmail);
        user.setContactNumber(newContactNumber);
        return userRepository.save(user);
      }
      return null; // or throw a custom exception, handle accordingly
    }
    public boolean updatePassword(Long userId, String currentPassword, String newPassword) {
        Optional<User> userOptional = userRepository.findById(userId);

        if (userOptional.isEmpty()) {
            return false; // User not found
        }

        User user = userOptional.get();

        if (!encoder.matches(currentPassword, user.getPassword())) {

            return false;
        }
        String encodedNewPassword = encoder.encode(newPassword);
        user.setPassword(encodedNewPassword);
        userRepository.save(user);
        return true; // Password update successful
    }

}

