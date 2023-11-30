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
@Table(name="tb007_job_seeker_skill",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "skill_id")
        })
public class JobSeekerSkillEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "skill_id")
    private Long skillId;

    @Column(name = "skill_title")
    private String skillTitle;

    @Column(name = "skill_discription")
    private String skillDiscription;

    @Column(name = "skill_rating")
    private Long skillRating;

    @ManyToOne
    @JoinColumn(
            nullable = false,
            name = "user_id"
    )
    private UserEntity userId;
}
