package com.magroun.realestate.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "saved_searches")
public class SavedSearch {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    private String status;

    @ManyToOne
    @JoinColumn(name = "state_id")
    private State state;

    @ManyToOne
    @JoinColumn(name = "city_id")
    private City city;

    @Column(name = "min_price")
    private Float minPrice;

    @Column(name = "max_price")
    private Float maxPrice;

    private Integer bedrooms;

    private Integer bathrooms;

    public SavedSearch() {
        // Default constructor
    }

	public SavedSearch(Long id, Long userId, String status, State state, City city, Float minPrice, Float maxPrice,
			Integer bedrooms, Integer bathrooms) {
		super();
		this.id = id;
		this.userId = userId;
		this.status = status;
		this.state = state;
		this.city = city;
		this.minPrice = minPrice;
		this.maxPrice = maxPrice;
		this.bedrooms = bedrooms;
		this.bathrooms = bathrooms;
	}











	public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }



    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }



    public Float getMinPrice() {
        return minPrice;
    }

    public void setMinPrice(Float minPrice) {
        this.minPrice = minPrice;
    }

    public Float getMaxPrice() {
        return maxPrice;
    }

    public void setMaxPrice(Float maxPrice) {
        this.maxPrice = maxPrice;
    }

    public Integer getBedrooms() {
        return bedrooms;
    }

    public void setBedrooms(Integer bedrooms) {
        this.bedrooms = bedrooms;
    }

    public Integer getBathrooms() {
        return bathrooms;
    }

    public void setBathrooms(Integer bathrooms) {
        this.bathrooms = bathrooms;
    }





	public Long getUserId() {
		return userId;
	}





	public void setUserId(Long userId) {
		this.userId = userId;
	}











	public State getState() {
		return state;
	}











	public void setState(State state) {
		this.state = state;
	}











	public City getCity() {
		return city;
	}











	public void setCity(City city) {
		this.city = city;
	}
    
}
