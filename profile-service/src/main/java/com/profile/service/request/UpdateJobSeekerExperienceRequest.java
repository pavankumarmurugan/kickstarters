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
}
