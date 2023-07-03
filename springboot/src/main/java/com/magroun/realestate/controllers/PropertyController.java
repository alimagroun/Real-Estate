package com.magroun.realestate.controllers;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.magroun.realestate.model.Photo;
import com.magroun.realestate.model.Property;
import com.magroun.realestate.projection.PropertyProjection;
import com.magroun.realestate.repository.PropertyRepository;
import com.magroun.realestate.services.PropertyService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials="true")
@RestController
@RequestMapping("/api/properties")
public class PropertyController {
	
	  @Autowired
	  PropertyRepository propertyRepository;

    private final PropertyService propertyService;

    public PropertyController(PropertyService propertyService) {
        this.propertyService = propertyService;
    }

    @GetMapping
    public ResponseEntity<List<Property>> getAllProperties() {
        List<Property> properties = propertyService.getAllProperties();
        return ResponseEntity.ok(properties);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Property> getPropertyById(@PathVariable Long id) {
        Property property = propertyService.getPropertyById(id);
        if (property != null) {
            return ResponseEntity.ok(property);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Property> createProperty(@RequestBody Property property) {
        Property createdProperty = propertyService.createProperty(property);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProperty);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Property> updateProperty(@PathVariable Long id, @RequestBody Property property) {
        Property updatedProperty = propertyService.updateProperty(id, property);
        if (updatedProperty != null) {
        	System.out.println("city code:"+property.getCity().getId());
            return ResponseEntity.ok(updatedProperty);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProperty(@PathVariable Long id) {
        boolean deleted = propertyService.deleteProperty(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/{propertyId}/photos")
    public ResponseEntity<List<Photo>> getPhotosByPropertyId(@PathVariable Long propertyId) {
        List<Photo> photos = propertyService.getPhotosByPropertyId(propertyId);
        if (!photos.isEmpty()) {
            return ResponseEntity.ok(photos);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
	/*
	 * @GetMapping("/filter") public Page<Property>
	 * getPropertiesByFilter(@RequestParam(required = false) String status,
	 * 
	 * @RequestParam(required = false) Long stateId,
	 * 
	 * @RequestParam(required = false) Float minPrice,
	 * 
	 * @RequestParam(required = false) Float maxPrice,
	 * 
	 * @RequestParam(defaultValue = "0") int bedrooms,
	 * 
	 * @RequestParam(defaultValue = "0") int bathrooms,
	 * 
	 * @RequestParam(required = false) Long cityId, Pageable pageable) {
	 * System.out.println("cityId: " + cityId); return
	 * propertyService.getPropertiesByFilter(status, stateId, minPrice, maxPrice,
	 * bedrooms, bathrooms, cityId, pageable); }
	 */
    
    @GetMapping("/firstphoto/{propertyId}")
    public ResponseEntity<Photo> getFirstPhotoByPropertyId(@PathVariable Long propertyId) {
        Photo photo = propertyService.getFirstPhotoByPropertyId(propertyId);
        if (photo != null) {
            return ResponseEntity.ok(photo);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/last4")
    public List<Property> getLast8Properties() {
        return propertyService.getLast4Properties();
    }
    
    @GetMapping("/getAllByuser")
    public List<PropertyProjection> getAll(@RequestParam Long userId) {
        return propertyRepository.findPropertiesUserId(userId);
    }
}

