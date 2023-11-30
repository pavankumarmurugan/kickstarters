package com.profile.service.response;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobSeekerExperienceResponse {
    private Long jobExperienceId;

    private String jobExperienceTitle;

    private String jobExperienceDescription;

    private String jobExperienceDuration;
}
