package com.profile.service.repository;


import com.profile.service.entity.JobSeekerSkillEntity;
import com.profile.service.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface JobSeekerSkillRepository extends JpaRepository<JobSeekerSkillEntity, Long> {

    List<JobSeekerSkillEntity> findByUserId(UserEntity userEntity);

    JobSeekerSkillEntity findBySkillId(Long skillId);
}
