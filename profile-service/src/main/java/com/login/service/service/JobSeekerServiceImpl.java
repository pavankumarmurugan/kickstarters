package com.login.service.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.login.service.entity.JobSeeker;
import com.login.service.repository.JobSeekerRepository;

@Service
public class JobSeekerServiceImpl implements JobSeekerService {
	
	@Autowired
    private JobSeekerRepository jobSeekerRepository;

	@Override
	public JobSeeker saveJobSeeker(JobSeeker jobSeeker) {
		return jobSeekerRepository.save(jobSeeker);
	}

	@Override
	public List<JobSeeker> fetchJobSeekerList() {
		return jobSeekerRepository.findAll();
	}

}
