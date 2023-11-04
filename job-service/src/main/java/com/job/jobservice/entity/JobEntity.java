package com.job.jobservice.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="tb003_job_detail",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "job_id")
        })
public class JobEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "job_id", nullable=false)
    private Long jobId;

    @Column(name = "job_title", nullable=false)
    private String jobTitle;

    @Column(name = "job_desc", nullable=false)
    private String jobDesc;

    @Column(name = "job_salary", nullable=false)
    private Long jobSalary;

    @Column(name = "job_duration", nullable=false)
    private String jobDuration;

    @Column(name = "job_location", nullable=false)
    private String jobLocation;

    @Column(name = "skill", nullable=false)
    private String jobSkill;

    @Column(name = "job_workExperice")
    private String jobWorkExperice;

    @ManyToOne
    @JoinColumn(
            nullable = false,
            name = "user_id"
    )
    private UserEntity jobPostedBy;

    @Column(name = "job_post_time", nullable=false)
    private LocalDateTime jobPostTime;


    @Column(name = "job_update_time")
    private LocalDateTime jobUpdateTime;

    @Column(name = "job_status", nullable=false)
    private Boolean jobStatus;

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

	public UserEntity getJobPostedBy() {
		return jobPostedBy;
	}

	public void setJobPostedBy(UserEntity jobPostedBy) {
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

	public Boolean getJobStatus() {
		return jobStatus;
	}

	public void setJobStatus(Boolean jobStatus) {
		this.jobStatus = jobStatus;
	}

}
