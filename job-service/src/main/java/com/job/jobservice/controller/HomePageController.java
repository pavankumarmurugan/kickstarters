package com.job.jobservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.job.jobservice.response.HomepageResponse;
import com.job.jobservice.service.JobService;

@RestController
@RequestMapping("/api/v1/job/service")
public class HomePageController {

	@Autowired
	JobService jobService;
	
	@GetMapping("/confirm")
	public ResponseEntity<?> confirm(@RequestHeader("loggedInUser") String username) {
		return ResponseEntity.ok(username);
	}

	@GetMapping("/allJobsForHomepage")
	public ResponseEntity<List<HomepageResponse>> getJobs(){
		return ResponseEntity.ok(jobService.getAllJobs());
	}
	
	@GetMapping("/allPostedJobUser")
	public ResponseEntity<List<HomepageResponse>> getAllPostedJobUser(@RequestHeader("loggedInUser") String username){
		return ResponseEntity.ok(jobService.getAllPostedJobsByUser(username));
	}


}
