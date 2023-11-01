package com.profile.service.service;

import com.profile.service.request.GenerateTokenRequest;
import com.profile.service.request.UserRegisterRequest;
import com.profile.service.request.UserSignInRequest;
import com.profile.service.response.GenerateTokenResponse;
import com.profile.service.response.UserRegisterResponse;
import com.profile.service.response.UserSignInResponse;

public interface UserService {
	
	UserRegisterResponse registerUser(UserRegisterRequest userRegisterRequest);
	
	UserSignInResponse userSignIn(UserSignInRequest userSignInRequest);
	
	String confirmToken(String token);
	
	void validateToken(String token);
	
}
