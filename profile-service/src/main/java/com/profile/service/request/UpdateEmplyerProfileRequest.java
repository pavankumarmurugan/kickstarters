package com.profile.service.request;

import jakarta.validation.constraints.NotNull;

public class UpdateEmplyerProfileRequest {

	private String employerMobileNo;

    private String employerLocation;

    @NotNull
    private Long userId;

	public String getEmployerMobileNo() {
		return employerMobileNo;
	}

	public void setEmployerMobileNo(String employerMobileNo) {
		this.employerMobileNo = employerMobileNo;
	}

	public String getEmployerLocation() {
		return employerLocation;
	}

	public void setEmployerLocation(String employerLocation) {
		this.employerLocation = employerLocation;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}
}
