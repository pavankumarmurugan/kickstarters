package com.profile.service.response;

import com.profile.service.entity.JobSeekerExperienceEntity;
import com.profile.service.entity.JobSeekerSkillEntity;
import com.profile.service.request.UpdateJobSeekerExperienceRequest;
import com.profile.service.request.UpdateJobSeekerSkillRequest;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JobSeekerProfileDetailsResponse {

    private String userFirstName;

    private String userLastName;

    private String userEmail;

    private String jobSeekerMobileNo;

    private String jobSeekerLocation;

    private Long userId;

    private List<JobSeekerExperienceResponse> jobSeekerExperienceList;

    private List<JobSeekerSkillResponse> jobSeekerSkillList;
}
