package com.job.jobservice.service;

import java.util.List;
import java.util.Map;

import com.job.jobservice.request.PostJobRequest;
import com.job.jobservice.request.UpdateJobRequest;
import com.job.jobservice.response.HomepageResponse;

public interface JobService {
	List<HomepageResponse> getAllJobs();
	
	Map<String, String> postJob(String userEmail, PostJobRequest postJobRequest);
	
	Map<String, String> updateJob(String userEmail, UpdateJobRequest updateJobRequest);
	
	Map<String, String> closeJob(String userEmail, Long jobId);
	
	public List<HomepageResponse> getAllPostedJobsByUser(String userEmail);
	
//	JobDetailsResponse getJobDetailsByUser(String userEmail, Long jobId);

//	Object getJobDetailsByJobSeeker(String userEmail, Long jobId);
}
