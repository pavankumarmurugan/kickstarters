package com.profile.service.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;



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

    public Long getSkillId() {
        return skillId;
    }

    public void setSkillId(Long skillId) {
        this.skillId = skillId;
    }

    public String getSkillTitle() {
        return skillTitle;
    }

    public void setSkillTitle(String skillTitle) {
        this.skillTitle = skillTitle;
    }

    public String getSkillDiscription() {
        return skillDiscription;
    }

    public void setSkillDiscription(String skillDiscription) {
        this.skillDiscription = skillDiscription;
    }

    public Long getSkillRating() {
        return skillRating;
    }

    public void setSkillRating(Long skillRating) {
        this.skillRating = skillRating;
    }

    public UserEntity getUserId() {
        return userId;
    }

    public void setUserId(UserEntity userId) {
        this.userId = userId;
    }
}
