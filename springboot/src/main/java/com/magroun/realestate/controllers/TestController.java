package com.magroun.realestate.controllers;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.magroun.realestate.security.services.UserDetailsImpl;

import java.util.HashMap;
import java.util.Map;
import org.springframework.security.core.Authentication;

//@CrossOrigin(origins = "*", maxAge = 3600)
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials="true")
@RestController
@RequestMapping("/api/test")
public class TestController {
  @GetMapping("/all")
  public String allAccess() {
    return "Public Content.";
  }

	/*
	 * @GetMapping("/user")
	 * 
	 * @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	 * public String userAccess() { return "User Content."; }
	 */



  @GetMapping("/user")
  @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
  public Map<String, Object> userAccess(Authentication authentication) {
      UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
      Long userId = userDetails.getId();

      Map<String, Object> response = new HashMap<>();
      response.put("userId", userId);
      response.put("message", "User Content.");

      return response;
  }


  
  
  
 
  
  
  

  @GetMapping("/mod")
  @PreAuthorize("hasRole('MODERATOR')")
  public String moderatorAccess() {
    return "Moderator Board.";
  }

  @GetMapping("/admin")
  @PreAuthorize("hasRole('ADMIN')")
  public String adminAccess() {
    return "Admin Board.";
  }
}