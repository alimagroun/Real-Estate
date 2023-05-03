package com.magroun.realestate.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.magroun.realestate.model.Photo;

public interface PhotoRepository extends JpaRepository<Photo, Long> {
    List<Photo> findByPropertyId(Long propertyId);
}

