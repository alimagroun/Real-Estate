package com.magroun.realestate.repository;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.magroun.realestate.model.Property;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;



@Repository
public interface PropertyRepository extends JpaRepository<Property, Long> {
	
	
	Page<Property> findAll(Specification<Property> specification, Pageable pageable);

}
