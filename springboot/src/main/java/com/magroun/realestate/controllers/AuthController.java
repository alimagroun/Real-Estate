package com.magroun.realestate.controllers;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.magroun.realestate.model.ERole;
import com.magroun.realestate.model.Property;
import com.magroun.realestate.model.Role;
import com.magroun.realestate.model.User;
import com.magroun.realestate.dto.LoginRequest;
import com.magroun.realestate.dto.SignupRequest;
import com.magroun.realestate.dto.UpdatePasswordRequest;
import com.magroun.realestate.dto.MessageResponse;
import com.magroun.realestate.dto.UserInfoResponse;
import com.magroun.realestate.repository.RoleRepository;
import com.magroun.realestate.repository.UserRepository;
import com.magroun.realestate.security.jwt.JwtUtils;
import com.magroun.realestate.security.services.UserDetailsImpl;
import com.magroun.realestate.services.AuthService;
import com.magroun.realestate.services.PropertyService;
import com.magroun.realestate.services.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials="true")
@RestController
@RequestMapping("/api/auth")
public class AuthController {
	
  @Autowired
  private AuthenticationManager authenticationManager;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private RoleRepository roleRepository;

  @Autowired
  private PasswordEncoder encoder;
     
  @Autowired
  private AuthService authService;
 
  @Autowired
  private UserService userService;
  
  @Autowired
  private PropertyService propertyService;

  @Autowired
  private JwtUtils jwtUtils;
       
  @PostMapping("/signin")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

    Authentication authentication = authenticationManager
        .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);

    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

    ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails);

    List<String> roles = userDetails.getAuthorities().stream()
        .map(item -> item.getAuthority())
        .collect(Collectors.toList());
    return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
        .body(new UserInfoResponse(userDetails.getId(),
                                     userDetails.getUsername(),
                                     userDetails.getEmail(),
                                     userDetails.getName(),
                                     userDetails.getContactNumber(),
                                     roles));
  }

  @PostMapping("/signup")
  public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
    if (userRepository.existsByUsername(signUpRequest.getUsername())) {
      return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
    }

    if (userRepository.existsByEmail(signUpRequest.getEmail())) {
      return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
    }

    User user = new User(signUpRequest.getUsername(),
                         signUpRequest.getEmail(),
                         signUpRequest.getName(),
                         signUpRequest.getContactNumber(),
                         encoder.encode(signUpRequest.getPassword()));

    Set<String> strRoles = signUpRequest.getRole();
    Set<Role> roles = new HashSet<>();

    if (strRoles == null) {
      Role userRole = roleRepository.findByName(ERole.ROLE_USER)
          .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
      roles.add(userRole);
    } else {
      strRoles.forEach(role -> {
        switch (role) {
        case "admin":
          Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
          roles.add(adminRole);

          break;
        case "mod":
          Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
          roles.add(modRole);

          break;
        default:
          Role userRole = roleRepository.findByName(ERole.ROLE_USER)
              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
          roles.add(userRole);
        }
      });
    }

    user.setRoles(roles);
    userRepository.save(user);

    return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
  }
  
  @PostMapping("/signout")
  public ResponseEntity<?> logoutUser() {
    ResponseCookie cookie = jwtUtils.getCleanJwtCookie();
    return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString())
        .body(new MessageResponse("You've been signed out!"));
  }
  
  @GetMapping("/check-auth")
  public ResponseEntity<Boolean> checkAuthentication(HttpServletRequest request) {
      boolean isAuthenticated = authService.isAuthenticated(request);
      return ResponseEntity.ok(isAuthenticated);
  }
  
  @GetMapping("/isadmin")
  public ResponseEntity<Boolean> checkIsAdmin(HttpServletRequest request) {
      boolean isAdmin = authService.isAdmin(request);
      return ResponseEntity.ok(isAdmin);
  }

  @PutMapping("updateuser/{userId}")
  public ResponseEntity<?> updateUser(@PathVariable Long userId, @RequestBody User updatedUser) {
    try {
      User user = userService.updateUser(userId, updatedUser.getName(), updatedUser.getEmail(), updatedUser.getContactNumber());
      if (user != null) {
        return ResponseEntity.ok(user);
      } else {
        return ResponseEntity.notFound().build();
      }
    } catch (IllegalArgumentException e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }

  @PutMapping("updatePassword/{userId}")
  public ResponseEntity<MessageResponse> updatePassword(
          @PathVariable Long userId,
          @RequestBody UpdatePasswordRequest request) {

      boolean passwordUpdated = userService.updatePassword(userId, request.getCurrentPassword(), request.getNewPassword());

      if (passwordUpdated) {
    	  return ResponseEntity.ok(new MessageResponse("Password updated successfully"));
            
      } else {
          return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageResponse("Failed to update password."));
      }
  }
  
  @GetMapping("/isAuthorized/{propertyId}")
  public boolean isAuthorized(@PathVariable Long propertyId, Authentication authentication) {
      Long userId = ((UserDetailsImpl) authentication.getPrincipal()).getId();
      boolean isAdmin = authentication.getAuthorities().stream().anyMatch(role -> role.getAuthority().equals("ROLE_ADMIN"));
      Property existingProperty = propertyService.getPropertyById(propertyId);
      return existingProperty != null && (existingProperty.getUser().getId().equals(userId) || isAdmin);
  }

}