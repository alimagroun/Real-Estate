package com.magroun.realestate.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.magroun.realestate.model.City;
import com.magroun.realestate.model.SavedSearch;
import com.magroun.realestate.model.State;
import com.magroun.realestate.repository.CityRepository;
import com.magroun.realestate.repository.SavedSearchRepository;
import com.magroun.realestate.repository.StateRepository;

@Service
public class SavedSearchService {
	
	 	@Autowired
	 	private SavedSearchRepository savedSearchRepository;
	 	@Autowired
	 	private StateRepository stateRepository;
	 	@Autowired
	 	private CityRepository cityRepository;

	 
	  public SavedSearch save(String status, Long stateId, Float minPrice, Float maxPrice, Integer bedrooms,
              Integer bathrooms, Long cityId, Long userId) {
		  State state = stateRepository.getStateById(stateId);
		  City city = cityRepository.getCityById(cityId);
	SavedSearch savedSearch = new SavedSearch();
	savedSearch.setStatus(status);
	savedSearch.setState(state);
	savedSearch.setMinPrice(minPrice);
	savedSearch.setMaxPrice(maxPrice);
	savedSearch.setBedrooms(bedrooms);
	savedSearch.setBathrooms(bathrooms);
	savedSearch.setCity(city);
	savedSearch.setUserId(userId);

	return savedSearchRepository.save(savedSearch);
	  }

	  public Page<SavedSearch> getSavedSearches(Long userId, Pageable pageable) {
		    return savedSearchRepository.findByUserId(userId, pageable);
		}

}
