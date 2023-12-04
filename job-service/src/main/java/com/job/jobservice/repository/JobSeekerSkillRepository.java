package com.job.jobservice.repository;


import com.job.jobservice.entity.JobSeekerSkillEntity;
import com.job.jobservice.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface JobSeekerSkillRepository extends JpaRepository<JobSeekerSkillEntity, Long> {

    List<JobSeekerSkillEntity> findByUserId(UserEntity userEntity);

    JobSeekerSkillEntity findBySkillId(Long skillId);
}
