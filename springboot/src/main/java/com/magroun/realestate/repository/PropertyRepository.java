package com.magroun.realestate.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.magroun.realestate.model.Property;



@Repository
public interface PropertyRepository extends JpaRepository<Property, Long> {

}
