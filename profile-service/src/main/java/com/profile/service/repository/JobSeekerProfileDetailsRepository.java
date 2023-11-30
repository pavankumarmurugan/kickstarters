package com.profile.service.repository;

import com.profile.service.entity.EmployerProfileEntity;
import com.profile.service.entity.JobSeekerProfileEntity;
import com.profile.service.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface JobSeekerProfileDetailsRepository extends JpaRepository<JobSeekerProfileEntity, Long> {


    Optional<JobSeekerProfileEntity> findByUserId(UserEntity userEntity);
}
