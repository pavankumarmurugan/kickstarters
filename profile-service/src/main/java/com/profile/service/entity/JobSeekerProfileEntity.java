package com.profile.service.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="tb005_job_seeker_profile",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "job_seeker_id")
        })
public class JobSeekerProfileEntity {

    private static final long serialVersionUID = 1L;


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "job_seeker_id")
    private Long jobSeekerId;


    @Column(name = "job_seeker_location")
    private String jobSeekerLocation;

    @Column(name = "job_seeker_mobile_no")
    private String jobSeekerMobileNo;

    @OneToOne
    @JoinColumn(
            nullable = false,
            name = "user_id"
    )
    private UserEntity userId;

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public Long getJobSeekerId() {
        return jobSeekerId;
    }

    public void setJobSeekerId(Long jobSeekerId) {
        this.jobSeekerId = jobSeekerId;
    }

    public String getJobSeekerLocation() {
        return jobSeekerLocation;
    }

    public void setJobSeekerLocation(String jobSeekerLocation) {
        this.jobSeekerLocation = jobSeekerLocation;
    }

    public String getJobSeekerMobileNo() {
        return jobSeekerMobileNo;
    }

    public void setJobSeekerMobileNo(String jobSeekerMobileNo) {
        this.jobSeekerMobileNo = jobSeekerMobileNo;
    }

    public UserEntity getUserId() {
        return userId;
    }

    public void setUserId(UserEntity userId) {
        this.userId = userId;
    }
}
