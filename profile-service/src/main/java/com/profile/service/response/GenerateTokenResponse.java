package com.profile.service.response;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class GenerateTokenResponse {
	
	String token;

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}
	
	

}
