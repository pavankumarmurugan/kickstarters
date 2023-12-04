package com.job.jobservice.response;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobSeekerSkillResponse {
    private Long skillId;

    private String skillTitle;

    private String skillDiscription;

    private Long skillRating;

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
}
