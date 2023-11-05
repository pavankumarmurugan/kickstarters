package com.profile.service.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.profile.service.entity.EmployerProfileEntity;
import com.profile.service.entity.UserEntity;

@Repository
public interface EmployerProfileDetailsRepository extends JpaRepository<EmployerProfileEntity, Long>{
	
	Optional<EmployerProfileEntity> findByUserId(UserEntity userEntity);

}
