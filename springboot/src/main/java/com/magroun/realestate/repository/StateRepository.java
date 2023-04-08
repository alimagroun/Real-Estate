package com.magroun.realestate.repository;

import com.magroun.realestate.model.State;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StateRepository extends JpaRepository<State, Long> {
  
}