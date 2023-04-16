package com.magroun.realestate.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "cities")
public class City {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    
    
    @ManyToOne
    private State state;
    
    
    

    public City() {
    }




	public City(long id, String name, State state) {
		super();
		this.id = id;
		this.name = name;
		this.state = state;
	}




	public long getId() {
		return id;
	}




	public void setId(long id) {
		this.id = id;
	}




	public String getName() {
		return name;
	}




	public void setName(String name) {
		this.name = name;
	}




	public State getState() {
		return state;
	}




	public void setState(State state) {
		this.state = state;
	}


    
    
    
    
    
}