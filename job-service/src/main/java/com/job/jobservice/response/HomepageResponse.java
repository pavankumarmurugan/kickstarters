package com.job.jobservice.response;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class HomepageResponse {
    
    private Long jobId;

    private String jobTitle;

    private String jobDesc;

    private Long jobSalary;

    private String jobDuration;

    private String jobLocation;

    private String jobSkill;

    private String jobWorkExperience;

    private String jobPostedBy;

    private LocalDateTime jobPostTime;

    private LocalDateTime jobUpdateTime;
    
    private String jobStatus;

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

	public String getJobWorkExperience() {
		return jobWorkExperience;
	}

	public void setJobWorkExperience(String jobWorkExperience) {
		this.jobWorkExperience = jobWorkExperience;
	}

	public String getJobPostedBy() {
		return jobPostedBy;
	}

	public void setJobPostedBy(String jobPostedBy) {
		this.jobPostedBy = jobPostedBy;
	}

	public LocalDateTime getJobPostTime() {
		return jobPostTime;
	}

	public void setJobPostTime(LocalDateTime jobPostTime) {
		this.jobPostTime = jobPostTime;
	}

	public LocalDateTime getJobUpdateTime() {
		return jobUpdateTime;
	}

	public void setJobUpdateTime(LocalDateTime jobUpdateTime) {
		this.jobUpdateTime = jobUpdateTime;
	}

	public String getJobStatus() {
		return jobStatus;
	}

	public void setJobStatus(String jobStatus) {
		this.jobStatus = jobStatus;
	}
    
    
}
