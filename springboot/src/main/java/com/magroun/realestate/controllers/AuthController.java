package com.magroun.realestate.controllers;

import java.util.ArrayList;
import org.springframework.web.bind.annotation.RequestParam;
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
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.magroun.realestate.model.City;
import com.magroun.realestate.model.ERole;
import com.magroun.realestate.model.Property;
import com.magroun.realestate.model.Role;
import com.magroun.realestate.model.State;
import com.magroun.realestate.model.User;
import com.magroun.realestate.payload.request.LoginRequest;
import com.magroun.realestate.payload.request.SignupRequest;
import com.magroun.realestate.payload.response.MessageResponse;
import com.magroun.realestate.payload.response.UserInfoResponse;
import com.magroun.realestate.repository.PropertyRepository;
import com.magroun.realestate.repository.RoleRepository;
import com.magroun.realestate.repository.StateRepository;
import com.magroun.realestate.repository.CityRepository;
import com.magroun.realestate.repository.UserRepository;
import com.magroun.realestate.security.jwt.JwtUtils;
import com.magroun.realestate.security.services.UserDetailsImpl;

import jakarta.validation.Valid;

import com.magroun.realestate.model.Property;

// @CrossOrigin(origins = "*", maxAge = 3600)
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials="true")
@RestController
@RequestMapping("/api/auth")
public class AuthController {
  @Autowired
  AuthenticationManager authenticationManager;

  @Autowired
  UserRepository userRepository;

  @Autowired
  RoleRepository roleRepository;

  @Autowired
  PasswordEncoder encoder;
  
  @Autowired
  PropertyRepository propertyRepository;
  
  @Autowired
  private StateRepository stateRepository;
  
  @Autowired
  private CityRepository cityRepository;
  
 

  @Autowired
  JwtUtils jwtUtils;
  
  @GetMapping("/getCitiesByState")
  public ResponseEntity<List<City>> getCitiesByState(@RequestParam("stateId") int stateId) {
      // Get cities from cityRepository based on stateId
      List<City> cities = cityRepository.findByStateId(stateId);

      // Log the received stateId
      System.out.println("Received stateId: " + stateId);

      // Return the cities as response with HTTP status OK
      return new ResponseEntity<>(cities, HttpStatus.OK);
  }
  
  
  @GetMapping("/users")
  public ResponseEntity<List<User>> getAllUsers(){
  try {
	  List<User> users = new ArrayList<User>();
	  userRepository.findAll().forEach(users::add);
	  return new ResponseEntity<>(users, HttpStatus.OK);
	  
	   }
  catch (Exception e) {
 return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
}
  }
  
  @GetMapping("/property")
  public ResponseEntity<List<Property>> getAllProperty(){
  try {
	  List<Property> propertyl = new ArrayList<Property>();
	  propertyRepository.findAll().forEach(propertyl::add);
	  return new ResponseEntity<>(propertyl, HttpStatus.OK);  
	   }
  catch (Exception e) {
 return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
}
  }
  
  @GetMapping("/states")
  public ResponseEntity<List<State>> getAllStates(){
  try {
	  List<State> states = new ArrayList<State>();
	  stateRepository.findAll().forEach(states::add);
	  return new ResponseEntity<>(states, HttpStatus.OK);  
	   }
  catch (Exception e) {
 return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
}
  }
  
  

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

    // Create new user's account
    User user = new User(signUpRequest.getUsername(),
                         signUpRequest.getEmail(),
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

  
  @PostMapping("/createProperty")
  public ResponseEntity<?> createProperty( @RequestBody Property property,@RequestParam("cityId") Long cityId) {

	  
	  System.out.print(cityId);
	  
	City city = new City();
	   city = cityRepository.getCityById(cityId);
	    property.setCity(city);
            
    propertyRepository.save(property);

    
  System.out.print(property.getCity().getName());
    return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  @PostMapping("/signout")
  public ResponseEntity<?> logoutUser() {
    ResponseCookie cookie = jwtUtils.getCleanJwtCookie();
    return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString())
        .body(new MessageResponse("You've been signed out!"));
  }
  

}