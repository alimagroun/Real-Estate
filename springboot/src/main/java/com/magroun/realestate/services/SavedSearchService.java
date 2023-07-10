package com.magroun.realestate.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.magroun.realestate.model.SavedSearch;
import com.magroun.realestate.model.User;
import com.magroun.realestate.repository.SavedSearchRepository;
import com.magroun.realestate.repository.UserRepository;

@Service
public class SavedSearchService {
	
	 @Autowired
	 SavedSearchRepository savedSearchRepository;
	 
	  @Autowired
	  UserRepository userRepository;
	 
	  public SavedSearch save(String status, Long stateId, Float minPrice, Float maxPrice, Integer bedrooms,
              Integer bathrooms, Long cityId, Long userId) {
		  User user = userRepository.findById(userId)
  .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));
	SavedSearch savedSearch = new SavedSearch();
	savedSearch.setStatus(status);
	savedSearch.setStateId(stateId);
	savedSearch.setMinPrice(minPrice);
	savedSearch.setMaxPrice(maxPrice);
	savedSearch.setBedrooms(bedrooms);
	savedSearch.setBathrooms(bathrooms);
	savedSearch.setCityId(cityId);
	savedSearch.setUser(user);

	return savedSearchRepository.save(savedSearch);
	  }



}
