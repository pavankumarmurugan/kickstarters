package com.login.service.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.login.service.entity.JobSeeker;
import com.login.service.service.JobSeekerService;

import jakarta.validation.Valid;

@RestController
public class JobSeekerController {
	
	@Autowired private JobSeekerService jobSeekerService;
	
	@PostMapping("/createJobSeeker")
    public JobSeeker saveDepartment(
        @Valid @RequestBody JobSeeker jobSeeker)
    {
        return jobSeekerService.saveJobSeeker(jobSeeker);
    }
 
    @GetMapping("/getJobSeeker")
    public List<JobSeeker> fetchDepartmentList()
    {
        return jobSeekerService.fetchJobSeekerList();
    }
	 

}
