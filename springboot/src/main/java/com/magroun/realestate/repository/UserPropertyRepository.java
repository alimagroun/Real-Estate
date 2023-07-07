package com.magroun.realestate.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.magroun.realestate.model.UserProperty;

@Repository
public interface UserPropertyRepository extends JpaRepository<UserProperty, Long> {
    @Query("SELECT up.property.id FROM UserProperty up WHERE up.user.id = ?1")
    List<Long> findFavoritePropertyIdsByUserId(Long userId);
    
    @Transactional
    void deleteByUser_IdAndProperty_Id(Long userId, Long propertyId);
    
    boolean existsByUser_IdAndProperty_Id(Long userId, Long propertyId);


}

