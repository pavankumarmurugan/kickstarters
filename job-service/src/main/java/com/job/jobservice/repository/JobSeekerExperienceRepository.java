package com.job.jobservice.repository;

import com.job.jobservice.entity.JobSeekerExperienceEntity;
import com.job.jobservice.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobSeekerExperienceRepository extends JpaRepository<JobSeekerExperienceEntity, Long> {

    List<JobSeekerExperienceEntity> findByUserId(UserEntity userEntity);

    JobSeekerExperienceEntity findByJobExperienceId(Long jobExperienceId);

}
