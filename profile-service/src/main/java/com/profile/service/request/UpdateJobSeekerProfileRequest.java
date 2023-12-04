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

    public String getJobSeekerMobileNo() {
        return jobSeekerMobileNo;
    }

    public void setJobSeekerMobileNo(String jobSeekerMobileNo) {
        this.jobSeekerMobileNo = jobSeekerMobileNo;
    }

    public String getJobSeekerLocation() {
        return jobSeekerLocation;
    }

    public void setJobSeekerLocation(String jobSeekerLocation) {
        this.jobSeekerLocation = jobSeekerLocation;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public List<UpdateJobSeekerExperienceRequest> getJobSeekerExperienceList() {
        return jobSeekerExperienceList;
    }

    public void setJobSeekerExperienceList(List<UpdateJobSeekerExperienceRequest> jobSeekerExperienceList) {
        this.jobSeekerExperienceList = jobSeekerExperienceList;
    }

    public List<UpdateJobSeekerSkillRequest> getJobSeekerSkillList() {
        return jobSeekerSkillList;
    }

    public void setJobSeekerSkillList(List<UpdateJobSeekerSkillRequest> jobSeekerSkillList) {
        this.jobSeekerSkillList = jobSeekerSkillList;
    }
}
