package com.profile.service.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateJobSeekerExperienceRequest {

    private Long jobExperienceId;

    private String jobExperienceTitle;

    private String jobExperienceDescription;

    private String jobExperienceDuration;

    public Long getJobExperienceId() {
        return jobExperienceId;
    }

    public void setJobExperienceId(Long jobExperienceId) {
        this.jobExperienceId = jobExperienceId;
    }

    public String getJobExperienceTitle() {
        return jobExperienceTitle;
    }

    public void setJobExperienceTitle(String jobExperienceTitle) {
        this.jobExperienceTitle = jobExperienceTitle;
    }

    public String getJobExperienceDescription() {
        return jobExperienceDescription;
    }

    public void setJobExperienceDescription(String jobExperienceDescription) {
        this.jobExperienceDescription = jobExperienceDescription;
    }

    public String getJobExperienceDuration() {
        return jobExperienceDuration;
    }

    public void setJobExperienceDuration(String jobExperienceDuration) {
        this.jobExperienceDuration = jobExperienceDuration;
    }
}
