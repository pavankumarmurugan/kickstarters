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

import com.job.jobservice.request.CandidateStatusRequest;
import com.job.jobservice.request.JobSearchRequest;
import com.job.jobservice.request.PostJobRequest;
import com.job.jobservice.request.UpdateJobRequest;
import com.job.jobservice.service.JobService;


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

	@PostMapping("/applyJob")
	public ResponseEntity<?> applyJob(@RequestHeader("loggedInUser") String userEmail, @RequestParam("jobId") Long jobId) {
		return ResponseEntity.ok(jobService.applyJob(userEmail,jobId));
	}

	@GetMapping("/jobCandidateList")
	public ResponseEntity<?> jobCandidateList(@RequestHeader("loggedInUser") String userEmail, @RequestParam("jobId") Long jobId) {
		return ResponseEntity.ok(jobService.jobCandidateList(userEmail,jobId));
	}

	@PostMapping("/updateCandidateStatus")
	public ResponseEntity<?> updateCandidateStatus(@RequestHeader("loggedInUser") String userEmail, @RequestBody CandidateStatusRequest candidateStatusRequest) {
		return ResponseEntity.ok(jobService.updateCandidateStatus(userEmail, candidateStatusRequest));
	}

	@GetMapping("/jobseekerJobSearch")
	public ResponseEntity<?> jobseekerJobSearch(@RequestBody JobSearchRequest jobSearchRequest) {
		return ResponseEntity.ok(jobService.jobseekerJobSearch(jobSearchRequest));
	}

	@GetMapping("/jobseekerAllAppliedJobs")
	public ResponseEntity<?> jobseekerAllAppliedJobs(@RequestHeader("loggedInUser") String userEmail) {
		return ResponseEntity.ok(jobService.jobseekerAllAppliedJobs(userEmail));
	}

	@PostMapping("/cancelApplication")
	public ResponseEntity<?> cancelApplication(@RequestHeader("loggedInUser") String userEmail, @RequestParam("jobId") Long jobId) {
		return ResponseEntity.ok(jobService.cancelApplication(userEmail, jobId));
	}
//	@GetMapping("/jobDetailsUser")
//	public ResponseEntity<?> jobDetailsUser(@RequestHeader("loggedInUser") String userEmail, @RequestParam("jobId") Long jobId) {
//		return ResponseEntity.ok(jobService.getJobDetailsByUser(userEmail,jobId));
//	}
//
//	@PostMapping("/jobDetailsJobSeeker")
//	public ResponseEntity<?> jobDetailsJobSeeker(@RequestHeader("loggedInUser") String userEmail,@RequestParam("jobId") Long jobId){
//		return ResponseEntity.ok(jobService.getJobDetailsByJobSeeker(userEmail,jobId));
//	}
}