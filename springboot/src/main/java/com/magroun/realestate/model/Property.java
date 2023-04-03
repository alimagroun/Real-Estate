package com.magroun.realestate.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "property")
public class Property {
	
	  @Id
	  @GeneratedValue(strategy = GenerationType.IDENTITY)
	  private Long id;
	  
	  private String name;
	  private String description;
	  private String status;
	  private int bedrooms;
	  private int bathrooms;
	  private int size;
	  private float price;
	  
	  public Property() {
		  
	  }
	  	  
	public Property(Long id, String name, String description, String status, int bedrooms, int bathrooms, int size, float price) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
		this.status = status;
		this.bedrooms = bedrooms;
		this.bathrooms = bathrooms;
		this.size = size;
		this.price = price;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public int getBedrooms() {
		return bedrooms;
	}
	public void setBedrooms(int bedrooms) {
		this.bedrooms = bedrooms;
	}
	public int getBathrooms() {
		return bathrooms;
	}
	public void setBathrooms(int bathrooms) {
		this.bathrooms = bathrooms;
	}
	public int getSize() {
		return size;
	}
	public void setSize(int size) {
		this.size = size;
	}
	public float getPrice() {
	return price;
	}
	public void setPrice(float price) {
	this.price = price;
	}
	  

}
