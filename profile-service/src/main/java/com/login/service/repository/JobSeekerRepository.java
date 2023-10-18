package com.login.service.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.login.service.entity.JobSeeker;

public interface JobSeekerRepository extends JpaRepository<JobSeeker, Long> {

}
