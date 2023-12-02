package com.job.jobservice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="tb006_job_seeker_experience",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "job_experience_id")
        })
public class JobSeekerExperienceEntity {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "job_experience_id")
    private Long jobExperienceId;

    @Column(name = "job_experience_title")
    private String jobExperienceTitle;

    @Column(name = "job_experience_description")
    private String jobExperienceDescription;

    @Column(name = "job_experience_duration")
    private String jobExperienceDuration;

    @ManyToOne
    @JoinColumn(
            nullable = false,
            name = "user_id"
    )
    private UserEntity userId;

    public Long getJobExperienceId() {
        return jobExperienceId;
    }

    public String getJobExperienceTitle() {
        return jobExperienceTitle;
    }

    public String getJobExperienceDescription() {
        return jobExperienceDescription;
    }

    public String getJobExperienceDuration() {
        return jobExperienceDuration;
    }

    public UserEntity getUserId() {
        return userId;
    }

    public void setJobExperienceId(Long jobExperienceId) {
        this.jobExperienceId = jobExperienceId;
    }

    public void setJobExperienceTitle(String jobExperienceTitle) {
        this.jobExperienceTitle = jobExperienceTitle;
    }

    public void setJobExperienceDescription(String jobExperienceDescription) {
        this.jobExperienceDescription = jobExperienceDescription;
    }

    public void setJobExperienceDuration(String jobExperienceDuration) {
        this.jobExperienceDuration = jobExperienceDuration;
    }

    public void setUserId(UserEntity userId) {
        this.userId = userId;
    }
}
