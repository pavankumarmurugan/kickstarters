package com.profile.service.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.profile.service.request.UserRegisterRequest;
import com.profile.service.request.UserSignInRequest;
import com.profile.service.response.UserRegisterResponse;
import com.profile.service.response.UserSignInResponse;
import com.profile.service.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/auth")
public class UserController {

	@Autowired 
	private UserService userService;

	@PostMapping("/registerUser")
	public ResponseEntity<?> registerUser(@Valid @RequestBody UserRegisterRequest userRegisterRequest) {
		UserRegisterResponse userRegisterResponse = new UserRegisterResponse();
		try {
			userRegisterResponse = userService.registerUser(userRegisterRequest);
		} catch(Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}

		return ResponseEntity.ok(userRegisterResponse);

	}

	@PostMapping("/signin")
	public ResponseEntity<?> userSignin(
			@Valid @RequestBody UserSignInRequest userSignInRequest) {
		UserSignInResponse userSignInResponse = new UserSignInResponse();
		try {
			userSignInResponse = userService.userSignIn(userSignInRequest);
		} catch(Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
		return ResponseEntity.ok(userSignInResponse);
	}

	@GetMapping("/confirm")
	public ResponseEntity<?> confirm(@RequestParam("token") String token) {
		return ResponseEntity.ok(userService.confirmToken(token));
	}
	
	@GetMapping("/validateToken")
	public String validateToken(@RequestParam("token") String token) {
		userService.validateToken(token);
		return "Token is valid";
	} 
}
