package com.magroun.realestate.model;

import jakarta.validation.constraints.NotBlank;

public class UserCredentials {
    private String email;
    @NotBlank
    private String password;
    private Integer resetCode;
    
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public Integer getResetCode() {
		return resetCode;
	}
	public void setResetCode(Integer resetCode) {
		this.resetCode = resetCode;
	}
    
}
