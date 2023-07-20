package com.magroun.realestate.services;
import com.magroun.realestate.model.User;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.magroun.realestate.repository.UserRepository;
import com.magroun.realestate.security.jwt.JwtUtils;
import com.magroun.realestate.security.services.UserDetailsImpl;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

@Service
public class AuthService {
	
	  @Autowired
	  private JwtUtils jwtUtils;
	    @Autowired
	    private UserRepository userRepository;
	
    public boolean isAuthenticated(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        String jwtToken = null;
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("cookie")) {
                    jwtToken = cookie.getValue();
                    break;
                }
            }
        }

        return jwtToken != null && jwtUtils.validateJwtToken(jwtToken);
    }

    public UserDetailsImpl getUserDetailsByUsername(String username) {

        Optional<User> userOptional = userRepository.findByUsername(username);

        User user = userOptional.orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));

        return UserDetailsImpl.build(user);
    }
    
    public boolean isAdmin(HttpServletRequest request) {
        // Check if the user is authenticated
        if (!isAuthenticated(request)) {
            return false; // If the user is not authenticated, they cannot be an admin
        }

        String jwtToken = jwtUtils.getJwtFromCookies(request);
        if (jwtToken != null && jwtUtils.validateJwtToken(jwtToken)) {
            String username = jwtUtils.getUserNameFromJwtToken(jwtToken);
            UserDetailsImpl userDetails = getUserDetailsByUsername(username);

            // Check if the user has the "ROLE_ADMIN" authority
            return userDetails.getAuthorities().stream()
                    .anyMatch(auth -> auth.getAuthority().equals("ROLE_ADMIN"));
        }

        return false;
    }

}
