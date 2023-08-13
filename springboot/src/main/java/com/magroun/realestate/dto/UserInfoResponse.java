package com.magroun.realestate.dto;

import java.util.List;

public class UserInfoResponse {
	private Long id;
	private String username;
	private String email;
	private String name;
	private String contactNumber;
	private List<String> roles;

	public UserInfoResponse(Long id, String username, String email,String name,String contactNumber ,List<String> roles) {
		this.id = id;
		this.username = username;
		this.email = email;
		this.name = name;
		this.contactNumber = contactNumber;
		this.roles = roles;
	}



	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public List<String> getRoles() {
		return roles;
	}



	public String getName() {
		return name;
	}



	public void setName(String name) {
		this.name = name;
	}



	public String getContactNumber() {
		return contactNumber;
	}



	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}
	
}
