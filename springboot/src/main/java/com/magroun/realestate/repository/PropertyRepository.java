package com.magroun.realestate.repository;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.magroun.realestate.model.Property;
import com.magroun.realestate.projection.PropertyProjection;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

@Repository
public interface PropertyRepository extends JpaRepository<Property, Long> {
	
	
	Page<Property> findAll(Specification<Property> specification, Pageable pageable);
	


    @Query("SELECT p FROM Property p WHERE " +
            "(p.name LIKE %:filter% OR " +
            "p.description LIKE %:filter% OR " +
            "p.status LIKE %:filter% OR " +
            "CAST(p.bedrooms AS STRING) LIKE %:filter% OR " +
            "CAST(p.bathrooms AS STRING) LIKE %:filter% OR " +
            "CAST(p.size AS STRING) LIKE %:filter% OR " +
            "CAST(p.price AS STRING) LIKE %:filter%)")
    Page<Property> findByFilter(String filter, Pageable pageable);
    
    List<Property> findByStatus(String status);
    
    @Query("SELECT p FROM Property p ORDER BY p.createdAt DESC LIMIT 4")
    List<Property> findLast4Properties(); 
    
    

	
	  @Query("SELECT p.id AS id, p.name AS name,p.status as status, p.price AS price, p.bedrooms AS bedrooms, p.bathrooms AS bathrooms, p.size AS size, ph.filepath AS filePath, c.name AS cityName, s.name AS stateName "
	  + "FROM Property p " + "JOIN p.photos ph " + "JOIN p.city c " +
	  "JOIN c.state s " + "WHERE p.user.id = :userId " + "GROUP BY p.id")
	  Page<PropertyProjection> findPropertiesUserId(@Param("userId") Long userId,
	  Pageable pageable);
	 
    
}
