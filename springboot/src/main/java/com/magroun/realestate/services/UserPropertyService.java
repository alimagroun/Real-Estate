package com.magroun.realestate.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.magroun.realestate.model.Property;
import com.magroun.realestate.model.User;
import com.magroun.realestate.model.UserProperty;
import com.magroun.realestate.repository.PropertyRepository;
import com.magroun.realestate.repository.UserPropertyRepository;
import com.magroun.realestate.repository.UserRepository;


@Service
public class UserPropertyService {
	
	  @Autowired
	  UserRepository userRepository;
	  
	  @Autowired
	  PropertyRepository propertyRepository;
	  
    private final UserPropertyRepository userPropertyRepository;

    @Autowired
    public UserPropertyService(UserPropertyRepository userPropertyRepository) {
        this.userPropertyRepository = userPropertyRepository;
    }

    public void addToFavorites(Long userId, Long propertyId) {
        User user = userRepository.findById(userId).orElse(null);
        Property property = propertyRepository.findById(propertyId).orElse(null);

        if (user == null || property == null) {
            // Perform appropriate error handling or throw an exception
        }

        UserProperty userProperty = new UserProperty();
        userProperty.setUser(user);
        userProperty.setProperty(property);

        userPropertyRepository.save(userProperty);
    }

    

    public boolean isFavorite(Long userPropertyId) {
        return userPropertyRepository.existsById(userPropertyId);
    }
    public List<Long> getFavoriteProperties(Long userId) {
        return userPropertyRepository.findFavoritePropertyIdsByUserId(userId);
    }
    
    public void removeFromFavorites(Long userId, Long propertyId) {
        userPropertyRepository.deleteByUser_IdAndProperty_Id(userId, propertyId);
      }
}

