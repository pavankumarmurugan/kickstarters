package com.job.jobservice.request;

public class UpdateJobRequest {
	
	private Long jobId;
	
	private String jobTitle;

	private String jobDesc;

	private Long jobSalary;

	private String jobDuration;

	private String jobLocation;

	private String jobSkill;

	private String jobWorkExperice;

	public Long getJobId() {
		return jobId;
	}

	public void setJobId(Long jobId) {
		this.jobId = jobId;
	}

	public String getJobTitle() {
		return jobTitle;
	}

	public void setJobTitle(String jobTitle) {
		this.jobTitle = jobTitle;
	}

	public String getJobDesc() {
		return jobDesc;
	}

	public void setJobDesc(String jobDesc) {
		this.jobDesc = jobDesc;
	}

	public Long getJobSalary() {
		return jobSalary;
	}

	public void setJobSalary(Long jobSalary) {
		this.jobSalary = jobSalary;
	}

	public String getJobDuration() {
		return jobDuration;
	}

	public void setJobDuration(String jobDuration) {
		this.jobDuration = jobDuration;
	}

	public String getJobLocation() {
		return jobLocation;
	}

	public void setJobLocation(String jobLocation) {
		this.jobLocation = jobLocation;
	}

	public String getJobSkill() {
		return jobSkill;
	}

	public void setJobSkill(String jobSkill) {
		this.jobSkill = jobSkill;
	}

	public String getJobWorkExperice() {
		return jobWorkExperice;
	}

	public void setJobWorkExperice(String jobWorkExperice) {
		this.jobWorkExperice = jobWorkExperice;
	}

}
