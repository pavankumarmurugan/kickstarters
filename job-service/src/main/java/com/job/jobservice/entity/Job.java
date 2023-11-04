package com.job.jobservice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="tb003_job_detail",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "job_id")
        })
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "job_id", nullable=false)
    private Long jobId;

    @Column(name = "job_title", nullable=false)
    private String jobTitle;

    @Column(name = "job_desc", nullable=false)
    private String jobDesc;

    @Column(name = "salary", nullable=false)
    private int salary;

    @Column(name = "duration", nullable=false)
    private String duration;

    @Column(name = "location", nullable=false)
    private String location;

    @Column(name = "skill")
    private String skill;

    @Column(name = "workExpericeNeeded")
    private String workExpericeNeeded;

    @ManyToOne
    @JoinColumn(
            nullable = false,
            name = "user_id"
    )
    private UserEntity postedBy;

    @Column(name = "post_time", nullable=false)
    private LocalDateTime postTime;


    @Column(name = "update_time", nullable=false)
    private LocalDateTime updateTime;

    @Column(name = "job_status", nullable=false)
    private Boolean jobStatus;

    //who posted
    //post time
    //update time
    //job status



}
