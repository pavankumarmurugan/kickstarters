package com.profile.service.service;

import com.profile.service.entity.*;
import com.profile.service.repository.*;
import com.profile.service.request.UpdateJobSeekerExperienceRequest;
import com.profile.service.request.UpdateJobSeekerProfileRequest;
import com.profile.service.request.UpdateJobSeekerSkillRequest;
import com.profile.service.response.JobSeekerExperienceResponse;
import com.profile.service.response.JobSeekerProfileDetailsResponse;
import com.profile.service.response.JobSeekerSkillResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class JobSeekerProfileServiceImpl implements JobSeekerProfileService{

    @Autowired
    UserRepository userRepository;

    @Autowired
    JobSeekerProfileDetailsRepository jobSeekerProfileDetailsRepository;

    @Autowired
    JobSeekerSkillRepository jobSeekerSkillRepository;

    @Autowired
    JobSeekerExperienceRepository jobSeekerExperienceRepository;

    @Override
    public Map<String, String> updateJobSeekerProfile(String userEmail, UpdateJobSeekerProfileRequest updateJobSeekerProfileRequest) {

        Optional<UserEntity> userEntity = userRepository.findByUserEmailAndUserRole(userEmail, Role.JOBSEEKER);

        if(userEntity.isEmpty()) {
            throw new IllegalArgumentException("User is not Valid");
        }

        if(!userEntity.get().getUserId().equals(updateJobSeekerProfileRequest.getUserId())) {
            throw new IllegalArgumentException("Not valid User to update");
        }

        Optional<JobSeekerProfileEntity> jobSeekerProfileEntity = jobSeekerProfileDetailsRepository.findByUserId(userEntity.get());

        if(jobSeekerProfileEntity.isEmpty()){
            JobSeekerProfileEntity newJobSeekerProfileEntity = new JobSeekerProfileEntity();
            newJobSeekerProfileEntity.setUserId(userEntity.get());
            newJobSeekerProfileEntity.setJobSeekerMobileNo(updateJobSeekerProfileRequest.getJobSeekerMobileNo());
            newJobSeekerProfileEntity.setJobSeekerLocation(updateJobSeekerProfileRequest.getJobSeekerLocation());
            jobSeekerProfileDetailsRepository.save(newJobSeekerProfileEntity);
        }else{
            JobSeekerProfileEntity oldJobSeekerProfileEntity = jobSeekerProfileEntity.get();
            oldJobSeekerProfileEntity.setJobSeekerLocation(updateJobSeekerProfileRequest.getJobSeekerLocation());
            oldJobSeekerProfileEntity.setJobSeekerMobileNo(updateJobSeekerProfileRequest.getJobSeekerMobileNo());
            jobSeekerProfileDetailsRepository.save(oldJobSeekerProfileEntity);
        }

        List<UpdateJobSeekerExperienceRequest> newJobSeekerExperienceEntityList = updateJobSeekerProfileRequest.getJobSeekerExperienceList();
        if(!newJobSeekerExperienceEntityList.isEmpty()){

            for (UpdateJobSeekerExperienceRequest experienceRequest : newJobSeekerExperienceEntityList){
                if(experienceRequest.getJobExperienceId() == null){
                    JobSeekerExperienceEntity jobSeekerExperienceEntity = new JobSeekerExperienceEntity();
                    jobSeekerExperienceEntity.setJobExperienceDuration(experienceRequest.getJobExperienceDuration());
                    jobSeekerExperienceEntity.setJobExperienceTitle(experienceRequest.getJobExperienceTitle());
                    jobSeekerExperienceEntity.setJobExperienceDescription(experienceRequest.getJobExperienceDescription());
                    jobSeekerExperienceEntity.setUserId(userEntity.get());
                    jobSeekerExperienceRepository.save(jobSeekerExperienceEntity);
                }else{
                    JobSeekerExperienceEntity jobSeekerExperienceEntity = jobSeekerExperienceRepository.findByJobExperienceId(experienceRequest.getJobExperienceId());
                    jobSeekerExperienceEntity.setJobExperienceDuration(experienceRequest.getJobExperienceDuration());
                    jobSeekerExperienceEntity.setJobExperienceTitle(experienceRequest.getJobExperienceTitle());
                    jobSeekerExperienceEntity.setJobExperienceDescription(experienceRequest.getJobExperienceDescription());
                    jobSeekerExperienceRepository.save(jobSeekerExperienceEntity);
                }



            }
        }

        List<UpdateJobSeekerSkillRequest> newJobSeekerSkillEntityList = updateJobSeekerProfileRequest.getJobSeekerSkillList();
        if(!newJobSeekerSkillEntityList.isEmpty()){
            for (UpdateJobSeekerSkillRequest skillRequest : newJobSeekerSkillEntityList){
                if(skillRequest.getSkillId() == null){
                    JobSeekerSkillEntity jobSeekerSkillEntity = new JobSeekerSkillEntity();
                    jobSeekerSkillEntity.setSkillRating(skillRequest.getSkillRating());
                    jobSeekerSkillEntity.setSkillTitle(skillRequest.getSkillTitle());
                    jobSeekerSkillEntity.setSkillDiscription(skillRequest.getSkillDiscription());
                    jobSeekerSkillEntity.setUserId(userEntity.get());
                    jobSeekerSkillRepository.save(jobSeekerSkillEntity);
                }else{
                    JobSeekerSkillEntity jobSeekerSkillEntity = jobSeekerSkillRepository.findBySkillId(skillRequest.getSkillId());
                    jobSeekerSkillEntity.setSkillDiscription(skillRequest.getSkillDiscription());
                    jobSeekerSkillEntity.setSkillRating(skillRequest.getSkillRating());
                    jobSeekerSkillEntity.setSkillTitle(skillRequest.getSkillTitle());
                    jobSeekerSkillRepository.save(jobSeekerSkillEntity);
                }
            }
        }

        Map<String, String> response = new HashMap<>();
        response.put("message", "Job seeker profile updated successfully");

        return response;
    }




    @Override
    public JobSeekerProfileDetailsResponse getJobSeekerProfileDetails(String userEmail) {
        JobSeekerProfileDetailsResponse jobSeekerProfileDetailsResponse = new JobSeekerProfileDetailsResponse();

        Optional<UserEntity> userEntityOpl = userRepository.findByUserEmailAndUserRole(userEmail, Role.JOBSEEKER);
        if(userEntityOpl.isEmpty()) {
            throw new IllegalArgumentException("User is not Valid");
        }

        UserEntity userEntity = userEntityOpl.get();

        Optional<JobSeekerProfileEntity> jobSeekerProfileEntityOpl = jobSeekerProfileDetailsRepository.findByUserId(userEntity);



        if(jobSeekerProfileEntityOpl.isEmpty()){
            jobSeekerProfileDetailsResponse.setUserEmail(userEmail);
            jobSeekerProfileDetailsResponse.setUserFirstName(userEntity.getUserFirstName());
            jobSeekerProfileDetailsResponse.setUserLastName(userEntity.getUserLastName());
            jobSeekerProfileDetailsResponse.setUserId(userEntity.getUserId());


        }else{
            JobSeekerProfileEntity jobSeekerProfileEntity = jobSeekerProfileEntityOpl.get();
            jobSeekerProfileDetailsResponse.setUserEmail(userEmail);
            jobSeekerProfileDetailsResponse.setUserFirstName(userEntity.getUserFirstName());
            jobSeekerProfileDetailsResponse.setUserLastName(userEntity.getUserLastName());
            jobSeekerProfileDetailsResponse.setUserId(userEntity.getUserId());
            jobSeekerProfileDetailsResponse.setJobSeekerMobileNo(jobSeekerProfileEntity.getJobSeekerMobileNo());
            jobSeekerProfileDetailsResponse.setJobSeekerLocation(jobSeekerProfileEntity.getJobSeekerLocation());

            List<JobSeekerSkillEntity> jobSeekerSkillEntityList = jobSeekerSkillRepository.findByUserId(userEntity);
            List<JobSeekerSkillResponse> jobSeekerSkillResponseList = new ArrayList<>();
            if(!jobSeekerSkillEntityList.isEmpty()){

                for(JobSeekerSkillEntity skillEntity : jobSeekerSkillEntityList){
                    JobSeekerSkillResponse jobSeekerSkillResponse = new JobSeekerSkillResponse();
                    jobSeekerSkillResponse.setSkillId(skillEntity.getSkillId());
                    jobSeekerSkillResponse.setSkillRating(skillEntity.getSkillRating());
                    jobSeekerSkillResponse.setSkillDiscription(skillEntity.getSkillDiscription());
                    jobSeekerSkillResponse.setSkillTitle(skillEntity.getSkillTitle());
                    jobSeekerSkillResponseList.add(jobSeekerSkillResponse);
                }
            }
            jobSeekerProfileDetailsResponse.setJobSeekerSkillList(jobSeekerSkillResponseList);

            List<JobSeekerExperienceEntity> jobSeekerExperienceEntityList = jobSeekerExperienceRepository.findByUserId(userEntity);
            List<JobSeekerExperienceResponse> jobSeekerExperienceResponseList = new ArrayList<>();
            if(!jobSeekerExperienceEntityList.isEmpty()){

                for (JobSeekerExperienceEntity experienceEtity : jobSeekerExperienceEntityList) {
                    JobSeekerExperienceResponse jobSeekerExperienceResponse = new JobSeekerExperienceResponse();
                    jobSeekerExperienceResponse.setJobExperienceId(experienceEtity.getJobExperienceId());
                    jobSeekerExperienceResponse.setJobExperienceTitle(experienceEtity.getJobExperienceTitle());
                    jobSeekerExperienceResponse.setJobExperienceDuration(experienceEtity.getJobExperienceDuration());
                    jobSeekerExperienceResponse.setJobExperienceDescription(experienceEtity.getJobExperienceDescription());
                    jobSeekerExperienceResponseList.add(jobSeekerExperienceResponse);
                }
            }
            jobSeekerProfileDetailsResponse.setJobSeekerExperienceList(jobSeekerExperienceResponseList);
        }

        return jobSeekerProfileDetailsResponse;
    }


}
