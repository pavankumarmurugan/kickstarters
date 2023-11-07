package com.job.jobservice.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.job.jobservice.entity.JobEntity;
import com.job.jobservice.entity.UserEntity;


@Repository
public interface JobRepository extends JpaRepository<JobEntity, Long> {


//    @Query("SELECT j FROM Job j WHERE j.jobStatus = true")
//    List<Job> findAllOpenJob();
    
    
    List<JobEntity> findByJobStatusTrue();
    
    Optional<JobEntity> findByJobIdAndJobStatusTrue(Long jobId);
    
    List<JobEntity> findByJobPostedBy(UserEntity userEntity);
    
    Optional<JobEntity> findByJobId(Long jobId);
}
