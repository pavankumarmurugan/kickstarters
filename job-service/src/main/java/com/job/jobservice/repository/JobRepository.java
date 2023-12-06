package com.job.jobservice.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
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

    List<JobEntity> findByJobTitleContainingIgnoreCaseAndJobStatusTrue(String jobTitle);
    
    @Query("SELECT e FROM JobEntity e WHERE e.jobTitle like :jobTitle AND e.jobPostTime BETWEEN :fromDate AND :toDate")
    List<JobEntity> searchJobTitleWithFilter(String jobTitle, LocalDateTime fromDate, LocalDateTime toDate);
}
