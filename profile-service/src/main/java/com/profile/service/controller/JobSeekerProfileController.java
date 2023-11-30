package com.profile.service.controller;

import com.profile.service.request.UpdateEmplyerProfileRequest;
import com.profile.service.request.UpdateJobSeekerExperienceRequest;
import com.profile.service.request.UpdateJobSeekerProfileRequest;
import com.profile.service.request.UpdateJobSeekerSkillRequest;
import com.profile.service.service.EmployerProfileService;
import com.profile.service.service.JobSeekerProfileService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * ClassName: JobSeekerProfileController
 * Description:
 *
 * @Author: Jiaxin Zhang
 * @Creat: 27/11/2023 18:30
 * @Version: 1.8
 */
@RestController
@RequestMapping("/api/v1/auth/profile")
public class JobSeekerProfileController {

    @Autowired
    JobSeekerProfileService jobSeekerProfileService;




    @PostMapping("/updateJobSeekerProfile")
    public ResponseEntity<?> updateJobSeekerProfile(@RequestHeader("loggedInUser") String userEmail,
                                                   @Valid @RequestBody UpdateJobSeekerProfileRequest updateJobSeekerProfileRequest
    ) {
        return ResponseEntity.ok(jobSeekerProfileService.updateJobSeekerProfile(userEmail, updateJobSeekerProfileRequest));
    }

    @GetMapping("/jobSeekerProfileDetails")
    public ResponseEntity<?> getJobSeekerProfileDetails(@RequestHeader("loggedInUser") String userEmail) {
        return ResponseEntity.ok(jobSeekerProfileService.getJobSeekerProfileDetails(userEmail));
    }
}
