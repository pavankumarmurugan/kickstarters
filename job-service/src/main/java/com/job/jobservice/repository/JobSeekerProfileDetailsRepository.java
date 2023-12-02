package com.job.jobservice.repository;

import com.job.jobservice.entity.JobSeekerProfileEntity;
import com.job.jobservice.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface JobSeekerProfileDetailsRepository extends JpaRepository<JobSeekerProfileEntity, Long> {


    Optional<JobSeekerProfileEntity> findByUserId(UserEntity userEntity);


}
