package com.profile.service.response;


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
}
