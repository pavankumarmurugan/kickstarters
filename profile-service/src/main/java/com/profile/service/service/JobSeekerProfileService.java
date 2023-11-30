package com.profile.service.service;



import com.profile.service.request.UpdateJobSeekerProfileRequest;

import com.profile.service.response.JobSeekerProfileDetailsResponse;

import java.util.Map;

public interface JobSeekerProfileService {


    Map<String, String> updateJobSeekerProfile(String userEmail, UpdateJobSeekerProfileRequest updateJobSeekerProfileRequest);


    JobSeekerProfileDetailsResponse getJobSeekerProfileDetails(String userEmail);
}
