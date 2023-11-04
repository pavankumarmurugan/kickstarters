package com.job.jobservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.job.jobservice.request.PostJobRequest;
import com.job.jobservice.request.UpdateJobRequest;
import com.job.jobservice.service.JobService;

/**
 * ClassName: JobController
 * Description:
 *
 * @Author: Jiaxin Zhang
 * @Creat: 03/11/2023 15:58
 * @Version: 1.8
 */
@RestController
@RequestMapping("/api/v1/job/service")
public class JobController {
	
	@Autowired
	JobService jobService;
	
	@PostMapping("/postJob")
	public ResponseEntity<?> postJob(@RequestHeader("loggedInUser") String userEmail, @RequestBody PostJobRequest postJobRequest) {
		return ResponseEntity.ok(jobService.postJob(userEmail,postJobRequest));
	}
	
	@PostMapping("/updateJob")
	public ResponseEntity<?> updateJob(@RequestHeader("loggedInUser") String userEmail, @RequestBody UpdateJobRequest updateJobRequest) {
		return ResponseEntity.ok(jobService.updateJob(userEmail,updateJobRequest));
	}
	
	@PostMapping("/closeJob")
	public ResponseEntity<?> closeJob(@RequestHeader("loggedInUser") String userEmail, @RequestParam("jobId") Long jobId) {
		return ResponseEntity.ok(jobService.closeJob(userEmail,jobId));
	}
	
	@GetMapping("/jobDetailsUser")
	public ResponseEntity<?> jobDetailsUser(@RequestHeader("loggedInUser") String userEmail, @RequestParam("jobId") Long jobId) {
		return ResponseEntity.ok(jobService.getJobDetailsByUser(userEmail,jobId));
	}
}