package com.job.jobservice.controller;

import com.job.jobservice.entity.Job;
import com.job.jobservice.response.HomepageResponse;
import com.job.jobservice.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

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
	public ResponseEntity<?> getJobs(){
		List<HomepageResponse> homepageResponses = new ArrayList<>();
		try {
			homepageResponses =  jobService.getAllJobs();
		} catch(Exception e) {
		return ResponseEntity.badRequest().body(e.getMessage());
	}

		return ResponseEntity.ok(homepageResponses);
	}

	@PostMapping("/addjobs")
	public Job addJob(@RequestBody Job job) {
		// 调用服务层的添加方法
		return jobService.addJob(job);
	}

}
