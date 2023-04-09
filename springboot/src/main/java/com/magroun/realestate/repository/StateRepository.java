package com.magroun.realestate.repository;

import com.magroun.realestate.model.State;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface StateRepository extends JpaRepository<State, Long> {
	
    @Query("SELECT s FROM State s WHERE s.id = ?1")
    State getStateById(Long id);
  
}