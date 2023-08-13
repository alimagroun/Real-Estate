package com.magroun.realestate.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.magroun.realestate.model.City;
import com.magroun.realestate.repository.CityRepository;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials="true")
@RestController
@RequestMapping("/api/cities")
public class CityController {
	
	  @Autowired
	  private CityRepository cityRepository;
	
	  @GetMapping("/getCitiesByState")
	  public ResponseEntity<List<City>> getCitiesByState(@RequestParam("stateId") int stateId) {
	      List<City> cities = cityRepository.findByStateId(stateId);
	      return new ResponseEntity<>(cities, HttpStatus.OK);
	  }

}
