package com.profile.service.service;

import com.profile.service.controller.UserSignInResponse;
import com.profile.service.request.UserRegisterRequest;
import com.profile.service.request.UserSignInRequest;
import com.profile.service.response.UserRegisterResponse;

public interface UserService {
	
	UserRegisterResponse registerUser(UserRegisterRequest userRegisterRequest);
	
	UserSignInResponse userSignIn(UserSignInRequest userSignInRequest);
	
}
