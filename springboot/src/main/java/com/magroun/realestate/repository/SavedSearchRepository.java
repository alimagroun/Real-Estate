package com.magroun.realestate.repository;

import com.magroun.realestate.model.SavedSearch;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SavedSearchRepository extends JpaRepository<SavedSearch, Long> {
	 Page<SavedSearch> findByUserId(Long userId, Pageable pageable);

}
