package com.profile.service.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.profile.service.config.JwtService;
import com.profile.service.controller.UserSignInResponse;
import com.profile.service.entity.Role;
import com.profile.service.entity.UserEntity;
import com.profile.service.repository.UserRepository;
import com.profile.service.request.UserRegisterRequest;
import com.profile.service.request.UserSignInRequest;
import com.profile.service.response.UserRegisterResponse;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
    private UserRepository userRepository;
	
	@Autowired
    private PasswordEncoder passwordEncoder;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private JwtService jwtService;

	@Override
	public UserRegisterResponse registerUser(UserRegisterRequest userRegisterRequest) {

		if (Boolean.TRUE.equals(userRepository.existsByUserEmail(userRegisterRequest.getUserEmail()))) {
		    throw new IllegalArgumentException("Error: Email is already in use!");
		}
        
		UserEntity user = new UserEntity();
		
        user.setUserFirstName(userRegisterRequest.getUserFirstName());
        user.setUserLastName(userRegisterRequest.getUserLastName());
        user.setUserEmail(userRegisterRequest.getUserEmail());
        user.setUserPassword(passwordEncoder.encode(userRegisterRequest.getUserPassword()));
        
        if(userRegisterRequest.getUserRole().equals("JOBSEEKER")) {
        	user.setUserRole(Role.JOBSEEKER);
        } else if(userRegisterRequest.getUserRole().equals("EMPLOYER")) {
        	user.setUserRole(Role.EMPLOYER);
        }
        
        userRepository.save(user);
        
        return mapToUserRegisterResponse(user);
		
	}

	private UserRegisterResponse mapToUserRegisterResponse(UserEntity user){
		UserRegisterResponse userRegisterResponse = new UserRegisterResponse();
		userRegisterResponse.setUserFirstName(user.getUserFirstName());
		userRegisterResponse.setUserLastName(user.getUserLastName());
		userRegisterResponse.setUserEmail(user.getUserEmail());
		userRegisterResponse.setUserRole(user.getUserRole().name());
		userRegisterResponse.setMessage("User registered successfully!");
        return userRegisterResponse;
    }

	@Override
	public UserSignInResponse userSignIn(UserSignInRequest userSignInRequest) {
		authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userSignInRequest.getUserEmail(), userSignInRequest.getUserPassword()));
		System.out.println("crossed auth");
		var user = userRepository.findByUserEmail(userSignInRequest.getUserEmail()).orElseThrow();
		var jwtToken = jwtService.generateToken(user);
		UserSignInResponse userSignInResponse = new UserSignInResponse();
		userSignInResponse.setToken(jwtToken);
		userSignInResponse.setMessage("Login Successfull!!");
		return userSignInResponse;
	}
	
	
}