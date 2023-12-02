package com.job.jobservice.repository;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.job.jobservice.entity.JobApplicationEntity;
import com.job.jobservice.entity.JobEntity;
import com.job.jobservice.entity.UserEntity;

public interface JobApplicationRepository extends JpaRepository<JobApplicationEntity, Long> {

    Optional<JobApplicationEntity> findByJobIdAndJobApplicationBy(JobEntity jobId, UserEntity jobApplicationBy);

    List<JobApplicationEntity> findByJobId(JobEntity jobId);

    List<JobApplicationEntity> findByJobApplicationBy(UserEntity jobApplicationBy);
}