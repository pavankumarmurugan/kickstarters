package com.profile.service.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.profile.service.entity.UserEntity;

@Repository
@Transactional(readOnly = true)
public interface UserRepository extends JpaRepository<UserEntity, Long> {
	
	Optional<UserEntity> findByUserEmail(String userEmail);
	
	Boolean existsByUserEmail(String email);
	
	@Transactional
    @Modifying
    @Query("UPDATE UserEntity u " +
            "SET u.userStatus = TRUE WHERE u.userEmail = ?1")
    int enableUserEntity(String email);
}
