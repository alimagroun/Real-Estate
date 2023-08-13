package com.magroun.realestate.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.util.List;


import com.magroun.realestate.model.State;
import com.magroun.realestate.repository.StateRepository;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials="true")
@RestController
@RequestMapping("/api/states")
public class StateController {
	
	  @Autowired
	  private StateRepository stateRepository;
	  
	    @GetMapping
	    public ResponseEntity<List<State>> getAllStates() {
	        List<State> states = stateRepository.findAll();
	        return new ResponseEntity<>(states, HttpStatus.OK);
	    }

}
