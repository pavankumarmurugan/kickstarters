package com.profile.service.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.profile.service.request.UpdateEmplyerProfileRequest;
import com.profile.service.service.EmployerProfileService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/auth/profile")
public class EmployerProfileController {
	
	@Autowired
	EmployerProfileService employerProfileService;
	
	@PostMapping("/updateEmployerProfile")
	public ResponseEntity<?> updateEmployerProfile(@RequestHeader("loggedInUser") String userEmail, 
			@Valid @RequestBody UpdateEmplyerProfileRequest updateEmplyerProfileRequest) {
		return ResponseEntity.ok(employerProfileService.updateEmployerProfile(userEmail, updateEmplyerProfileRequest));
	}
	
	@GetMapping("/employerProfileDetails")
	public ResponseEntity<?> getEmployerProfileDetails(@RequestHeader("loggedInUser") String userEmail) {
		return ResponseEntity.ok(employerProfileService.getEmployerProfileDetails(userEmail));
	}

}
