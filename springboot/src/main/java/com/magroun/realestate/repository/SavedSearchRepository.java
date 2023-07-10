package com.magroun.realestate.repository;

import com.magroun.realestate.model.SavedSearch;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SavedSearchRepository extends JpaRepository<SavedSearch, Long> {

}
