package com.magroun.realestate.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.magroun.realestate.model.Photo;
import com.magroun.realestate.model.Property;
import com.magroun.realestate.repository.PhotoRepository;
import com.magroun.realestate.repository.PropertyRepository;
import java.util.List;
import java.util.Optional;



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
}

