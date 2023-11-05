package com.profile.service.service;

import java.util.Map;

import com.profile.service.request.UpdateEmplyerProfileRequest;
import com.profile.service.response.EmployerProfileDetailsResponse;

public interface EmployerProfileService {
	
	Map<String, String> updateEmployerProfile(String userEmail, UpdateEmplyerProfileRequest updateEmplyerProfileRequest);
	
	EmployerProfileDetailsResponse getEmployerProfileDetails(String userEmail);

}
