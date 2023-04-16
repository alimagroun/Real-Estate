package com.magroun.realestate.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.magroun.realestate.model.City;

@Repository
public interface CityRepository extends JpaRepository<City, Long> {
	
	List<City> findByStateId(long stateId);
 
}
