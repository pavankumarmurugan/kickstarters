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

    public String getUserFirstName() {
        return userFirstName;
    }

    public void setUserFirstName(String userFirstName) {
        this.userFirstName = userFirstName;
    }

    public String getUserLastName() {
        return userLastName;
    }

    public void setUserLastName(String userLastName) {
        this.userLastName = userLastName;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

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

    public List<JobSeekerExperienceResponse> getJobSeekerExperienceList() {
        return jobSeekerExperienceList;
    }

    public void setJobSeekerExperienceList(List<JobSeekerExperienceResponse> jobSeekerExperienceList) {
        this.jobSeekerExperienceList = jobSeekerExperienceList;
    }

    public List<JobSeekerSkillResponse> getJobSeekerSkillList() {
        return jobSeekerSkillList;
    }

    public void setJobSeekerSkillList(List<JobSeekerSkillResponse> jobSeekerSkillList) {
        this.jobSeekerSkillList = jobSeekerSkillList;
    }
}
