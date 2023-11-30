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
@Table(name="tb008_job_application",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "job_application_id")
        })

public class JobApplicationEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "job_application_id", nullable=false)
    private Long jobApplicationId;

    @ManyToOne
    @JoinColumn(
            nullable = false,
            name = "job_id"
    )
    private JobEntity jobId;

    @ManyToOne
    @JoinColumn(
            nullable = false,
            name = "user_id"
    )
    private UserEntity jobApplicationBy;


    @Column(name = "job_application_time", nullable=false)
    private LocalDateTime jobApplicationTime;


    @Column(name = "job_application_update_time")
    private LocalDateTime jobApplicationUpdateTime;

    @Column(name = "job_application_status", nullable=false)
    private Boolean jobApplicationStatus;

    @Column(name = "job_application_status_employer", nullable=false)
    private String jobApplicationStatusEmployer;

    public String getJobApplicationStatusEmployer() {
        return jobApplicationStatusEmployer;
    }

    public void setJobApplicationStatusEmployer(String jobApplicationStatusEmployer) {
        this.jobApplicationStatusEmployer = jobApplicationStatusEmployer;
    }

    public Long getJobApplicationId() {
        return jobApplicationId;
    }

    public void setJobApplicationId(Long jobApplicationId) {
        this.jobApplicationId = jobApplicationId;
    }

    public JobEntity getJobId() {
        return jobId;
    }

    public void setJobId(JobEntity jobId) {
        this.jobId = jobId;
    }

    public UserEntity getJobApplicationBy() {
        return jobApplicationBy;
    }

    public void setJobApplicationBy(UserEntity jobApplicationBy) {
        this.jobApplicationBy = jobApplicationBy;
    }

    public LocalDateTime getJobApplicationTime() {
        return jobApplicationTime;
    }

    public void setJobApplicationTime(LocalDateTime jobApplicationTime) {
        this.jobApplicationTime = jobApplicationTime;
    }

    public LocalDateTime getJobApplicationUpdateTime() {
        return jobApplicationUpdateTime;
    }

    public void setJobApplicationUpdateTime(LocalDateTime jobApplicationUpdateTime) {
        this.jobApplicationUpdateTime = jobApplicationUpdateTime;
    }

    public Boolean getJobApplicationStatus() {
        return jobApplicationStatus;
    }

    public void setJobApplicationStatus(Boolean jobApplicationStatus) {
        this.jobApplicationStatus = jobApplicationStatus;
    }
}
