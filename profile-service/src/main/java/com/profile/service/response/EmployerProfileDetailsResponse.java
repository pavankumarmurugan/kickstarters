package com.profile.service.response;

public class EmployerProfileDetailsResponse {
	
	private String userFirstName;
	
	private String userLastName;
	
	private String userEmail;
	
	private String employerMobileNo;
	
	private String employerLocation;
	
	private Long userId;

	public String getUserFirstName() {
		return userFirstName;
	}

	public void setUserFirstName(String userFirstName) {
		this.userFirstName = userFirstName;
	}

	public String getUserLastName() {
		return userLastName;
	}

	public void setUserLastName(String userLastName) {
		this.userLastName = userLastName;
	}

	public String getUserEmail() {
		return userEmail;
	}

	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}

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
