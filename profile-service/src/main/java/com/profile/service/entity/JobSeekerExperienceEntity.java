package com.profile.service.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Table(name="tb006_job_seeker_experience",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "job_experience_id")
        })
public class JobSeekerExperienceEntity {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "job_experience_id")
    private Long jobExperienceId;

    @Column(name = "job_experience_title")
    private String jobExperienceTitle;

    @Column(name = "job_experience_description")
    private String jobExperienceDescription;

    @Column(name = "job_experience_duration")
    private String jobExperienceDuration;

    @ManyToOne
    @JoinColumn(
            nullable = false,
            name = "user_id"
    )
    private UserEntity userId;
}
