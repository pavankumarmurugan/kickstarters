package com.profile.service.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.profile.service.entity.EmployerProfileEntity;
import com.profile.service.entity.Role;
import com.profile.service.entity.UserEntity;
import com.profile.service.repository.EmployerProfileDetailsRepository;
import com.profile.service.repository.UserRepository;
import com.profile.service.request.UpdateEmplyerProfileRequest;
import com.profile.service.response.EmployerProfileDetailsResponse;

@Service
public class EmployerProfileServiceImpl implements EmployerProfileService{
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	EmployerProfileDetailsRepository employerProfileDetailsRepository;

	@Override
	public Map<String, String> updateEmployerProfile(String userEmail, UpdateEmplyerProfileRequest updateEmplyerProfileRequest) {
		
		Optional<UserEntity> userEntity = userRepository.findByUserEmailAndUserRole(userEmail, Role.EMPLOYER);
		if(userEntity.isEmpty()) {
			throw new IllegalArgumentException("User is not Valid");
		}
		
		if(!userEntity.get().getUserId().equals(updateEmplyerProfileRequest.getUserId())) {
			throw new IllegalArgumentException("Not valid User to update");
		}
		
		Optional<EmployerProfileEntity> employerProfileEntity = employerProfileDetailsRepository.findByUserId(userEntity.get());
		
		if(employerProfileEntity.isEmpty()) {
			EmployerProfileEntity newEmployerProfileEntity = new EmployerProfileEntity();
			newEmployerProfileEntity.setUserId(userEntity.get());
			newEmployerProfileEntity.setEmployerLocation(updateEmplyerProfileRequest.getEmployerLocation());
			newEmployerProfileEntity.setEmployerMobileNo(updateEmplyerProfileRequest.getEmployerMobileNo());
			employerProfileDetailsRepository.save(newEmployerProfileEntity);
		} else {
			EmployerProfileEntity oldEmployerProfileEntity = employerProfileEntity.get();
			oldEmployerProfileEntity.setEmployerLocation(updateEmplyerProfileRequest.getEmployerLocation());
			oldEmployerProfileEntity.setEmployerMobileNo(updateEmplyerProfileRequest.getEmployerMobileNo());
			employerProfileDetailsRepository.save(oldEmployerProfileEntity);
		}
		
		Map<String, String> response = new HashMap<>();
		response.put("message", "Employer profile updated successfully");

		return response;
	}

	@Override
	public EmployerProfileDetailsResponse getEmployerProfileDetails(String userEmail) {
		EmployerProfileDetailsResponse employerProfileDetailsResponse = new EmployerProfileDetailsResponse();
		
		Optional<UserEntity> userEntityOpl = userRepository.findByUserEmailAndUserRole(userEmail, Role.EMPLOYER);
		if(userEntityOpl.isEmpty()) {
			throw new IllegalArgumentException("User is not Valid");
		}
		
		UserEntity userEntity = userEntityOpl.get();
		
		Optional<EmployerProfileEntity> employerProfileEntityOpl = employerProfileDetailsRepository.findByUserId(userEntity);
		
		if(employerProfileEntityOpl.isEmpty()) {
			employerProfileDetailsResponse.setUserEmail(userEmail);
			employerProfileDetailsResponse.setUserFirstName(userEntity.getUserFirstName());
			employerProfileDetailsResponse.setUserLastName(userEntity.getUserLastName());
			employerProfileDetailsResponse.setUserId(userEntity.getUserId());
		} else {
			EmployerProfileEntity employerProfileEntity = employerProfileEntityOpl.get();
			employerProfileDetailsResponse.setUserEmail(userEmail);
			employerProfileDetailsResponse.setUserFirstName(userEntity.getUserFirstName());
			employerProfileDetailsResponse.setUserLastName(userEntity.getUserLastName());
			employerProfileDetailsResponse.setUserId(userEntity.getUserId());
			employerProfileDetailsResponse.setEmployerLocation(employerProfileEntity.getEmployerLocation());
			employerProfileDetailsResponse.setEmployerMobileNo(employerProfileEntity.getEmployerMobileNo());
		}
		
		return employerProfileDetailsResponse;
	}

}
