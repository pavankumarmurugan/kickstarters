package com.job.jobservice.service;

import java.util.List;
import java.util.Map;

import com.job.jobservice.request.CandidateStatusRequest;
import com.job.jobservice.request.JobSearchRequest;
import com.job.jobservice.request.PostJobRequest;
import com.job.jobservice.request.UpdateJobRequest;
import com.job.jobservice.response.HomepageResponse;
import com.job.jobservice.response.JobCandidateResponse;
import com.job.jobservice.response.JobSeekerAppliedJobResponse;

public interface JobService {
	List<HomepageResponse> getAllJobs();
	
	Map<String, String> postJob(String userEmail, PostJobRequest postJobRequest);
	
	Map<String, String> updateJob(String userEmail, UpdateJobRequest updateJobRequest);
	
	Map<String, String> closeJob(String userEmail, Long jobId);
	
	public List<HomepageResponse> getAllPostedJobsByUser(String userEmail);

	Map<String, String> applyJob(String userEmail, Long jobId);

	List<JobCandidateResponse> jobCandidateList(String userEmail, Long jobId);

	Map<String, String> updateCandidateStatus(String userEmail, CandidateStatusRequest candidateStatusRequest);

	List<HomepageResponse> jobseekerJobSearch(JobSearchRequest jobSearchRequest);

	List<JobSeekerAppliedJobResponse> jobseekerAllAppliedJobs(String userEmail);

	Map<String, String> cancelApplication(String userEmail, Long jobId);

}
