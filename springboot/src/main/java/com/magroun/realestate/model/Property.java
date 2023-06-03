package com.magroun.realestate.model;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "property")
public class Property {
	
	  @Id
	  @GeneratedValue(strategy = GenerationType.IDENTITY)
	  private Long id;
	  
	  @NotBlank
	  private String name;
	  @NotBlank
	  @Size(min = 1, max = 1000)
	  private String description;
	  @NotBlank
	  private String status;
	  private int bedrooms;
	  private int bathrooms;
	  private int size;
	  @NotNull
	  private float price;
	  

	  
	  
	    @ManyToOne
	    @JoinColumn(name = "city_id")
	    private City city;


		public Property() {
			super();
		}


		public Property(Long id, String name, String description, String status, int bedrooms, int bathrooms, int size,
				float price, City city) {
			super();
			this.id = id;
			this.name = name;
			this.description = description;
			this.status = status;
			this.bedrooms = bedrooms;
			this.bathrooms = bathrooms;
			this.size = size;
			this.price = price;
			this.city = city;
		}


		public Property(String name2, String description2, String status2, int bedrooms2, int bathrooms2, int size2,
				float price2) {
			// TODO Auto-generated constructor stub
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


		public City getCity() {
			return city;
		}


		public void setCity(City city) {
			this.city = city;
		}
	  

	  

}
