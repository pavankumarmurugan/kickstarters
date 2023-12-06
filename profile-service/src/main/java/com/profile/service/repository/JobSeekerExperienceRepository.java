package com.profile.service.repository;

import com.profile.service.entity.JobSeekerExperienceEntity;
import com.profile.service.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobSeekerExperienceRepository extends JpaRepository<JobSeekerExperienceEntity, Long> {

    List<JobSeekerExperienceEntity> findByUserId(UserEntity userEntity);

    JobSeekerExperienceEntity findByJobExperienceId(Long jobExperienceId);

}
