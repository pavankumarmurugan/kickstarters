package com.job.jobservice.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/job/service")
public class HomePageController {
	
	@GetMapping("/confirm")
	public ResponseEntity<?> confirm(@RequestHeader("loggedInUser") String username) {
		return ResponseEntity.ok(username);
	}

}
