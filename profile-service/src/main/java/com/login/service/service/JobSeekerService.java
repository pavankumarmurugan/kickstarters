package com.login.service.service;

import java.util.List;

import com.login.service.entity.JobSeeker;

public interface JobSeekerService {
	
	JobSeeker saveJobSeeker(JobSeeker jobSeeker);

    List<JobSeeker> fetchJobSeekerList();

}
