package com.magroun.realestate.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.magroun.realestate.model.Photo;
import com.magroun.realestate.model.Property;
import com.magroun.realestate.model.City;
import com.magroun.realestate.model.State;
import com.magroun.realestate.projection.PropertyProjection;
import com.magroun.realestate.repository.PhotoRepository;
import com.magroun.realestate.repository.PropertyRepository;
import java.util.List;
import java.util.Optional;
import jakarta.persistence.criteria.Join;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;




@Service
public class PropertyService {
	
	 @Autowired
	 private PhotoRepository photoRepository;

	 @Autowired
	 private PropertyRepository propertyRepository;

    public PropertyService(PropertyRepository propertyRepository) {
        this.propertyRepository = propertyRepository;
    }

    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }

    public Property getPropertyById(Long id) {
        Optional<Property> optionalProperty = propertyRepository.findById(id);
        return optionalProperty.orElse(null);
    }

    public Property createProperty(Property property) {
        return propertyRepository.save(property);
    }

    public Property updateProperty(Long id, Property property) {
        Optional<Property> optionalProperty = propertyRepository.findById(id);
        if (optionalProperty.isPresent()) {
            Property existingProperty = optionalProperty.get();
            // Update the existing property with the new property details
            existingProperty.setName(property.getName());
            existingProperty.setDescription(property.getDescription());
            existingProperty.setStatus(property.getStatus());
            existingProperty.setBedrooms(property.getBedrooms());
            existingProperty.setBathrooms(property.getBathrooms());
            existingProperty.setSize(property.getSize());
            existingProperty.setPrice(property.getPrice());
            existingProperty.setCity(property.getCity());
            // Save the updated property
            return propertyRepository.save(existingProperty);
        } else {
            return null;
        }
    }

    public boolean deleteProperty(Long id) {
        Optional<Property> optionalProperty = propertyRepository.findById(id);
        if (optionalProperty.isPresent()) {
            propertyRepository.delete(optionalProperty.get());
            return true;
        } else {
            return false;
        }
    }
    public List<Photo> getPhotosByPropertyId(Long propertyId) {
        return photoRepository.findByPropertyId(propertyId);
    }
    public List<Property> getPropertiesByStatus(String status) {
        return propertyRepository.findByStatus(status);
    }

	
	
	  public Page<Property> getPropertiesByFilter(String status, Long stateId,
	  Float minPrice, Float maxPrice, int bedrooms, int bathrooms, Long cityId,
	  Pageable pageable) { Specification<Property> spec =
	  Specification.where(null);
	  
	  if (status != null) { spec = spec.and((root, query, builder) ->
	  builder.equal(root.get("status"), status)); }
	  
	  if (stateId != null) { spec = spec.and((root, query, builder) -> {
	  Join<Property, City> cityJoin = root.join("city"); Join<City, State>
	  stateJoin = cityJoin.join("state"); return builder.equal(stateJoin.get("id"),
	  stateId); }); }
	  
	  if (minPrice != null) { spec = spec.and((root, query, builder) ->
	  builder.greaterThanOrEqualTo(root.get("price"), minPrice)); }
	  
	  if (maxPrice != null) { spec = spec.and((root, query, builder) ->
	  builder.lessThanOrEqualTo(root.get("price"), maxPrice)); }
	  
	  if (bedrooms != 0) { spec = spec.and((root, query, builder) ->
	  builder.equal(root.get("bedrooms"), bedrooms)); }
	  
	  if (bathrooms != 0) { spec = spec.and((root, query, builder) ->
	  builder.equal(root.get("bathrooms"), bathrooms)); }
	  
	  if (cityId != null) { spec = spec.and((root, query, builder) ->
	  builder.equal(root.join("city").get("id"), cityId)); }
	  
	  return propertyRepository.findAll(spec, pageable); }
	 
	 
    public Photo getFirstPhotoByPropertyId(Long propertyId) {
        List<Photo> photos = photoRepository.findByPropertyId(propertyId);
        if (!photos.isEmpty()) {
            return photos.get(0);
        }
        return null;
    }
    public List<Property> getLast4Properties() {
        return propertyRepository.findLast4Properties();
    }
    public Page<PropertyProjection> getPropertiesByUserId(Long userId, Pageable pageable) {
        return propertyRepository.findPropertiesUserId(userId, pageable);
    }
    public Page<PropertyProjection> findFavoritesProperties(Long userId, Pageable pageable) {
        return propertyRepository.findFavoritesProperties(userId, pageable);
    }
}

