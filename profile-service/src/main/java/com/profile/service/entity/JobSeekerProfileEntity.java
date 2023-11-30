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






}
