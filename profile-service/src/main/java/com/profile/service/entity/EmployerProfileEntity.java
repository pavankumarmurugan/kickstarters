package com.profile.service.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="tb004_employer_profile",
		uniqueConstraints = {
        @UniqueConstraint(columnNames = "employer_id")
    })
public class EmployerProfileEntity {
	
	private static final long serialVersionUID = 1L;

	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "employer_id")
    private Long employerId;
    
    @Column(name = "employer_mobile_no")
    private String employerMobileNo;
    
    @Column(name = "employer_location")
    private String employerLocation;
    
    @OneToOne
    @JoinColumn(
            nullable = false,
            name = "user_id"
    )
    private UserEntity userId;

	public Long getEmployerId() {
		return employerId;
	}

	public void setEmployerId(Long employerId) {
		this.employerId = employerId;
	}

	public String getEmployerMobileNo() {
		return employerMobileNo;
	}

	public void setEmployerMobileNo(String employerMobileNo) {
		this.employerMobileNo = employerMobileNo;
	}

	public String getEmployerLocation() {
		return employerLocation;
	}

	public void setEmployerLocation(String employerLocation) {
		this.employerLocation = employerLocation;
	}

	public UserEntity getUserId() {
		return userId;
	}

	public void setUserId(UserEntity userId) {
		this.userId = userId;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}
