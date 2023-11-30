package com.profile.service.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateJobSeekerProfileRequest {

    private String jobSeekerMobileNo;

    private String jobSeekerLocation;

    private Long userId;

    private List<UpdateJobSeekerExperienceRequest> jobSeekerExperienceList;

    private List<UpdateJobSeekerSkillRequest> jobSeekerSkillList;


}
