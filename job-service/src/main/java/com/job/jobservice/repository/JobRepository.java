package com.job.jobservice.repository;

import com.job.jobservice.entity.Job;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface JobRepository extends JpaRepository<Job, Long> {


    @Query("SELECT j FROM Job j WHERE j.jobStatus = true")
    List<Job> findAllOpenJob();
}
