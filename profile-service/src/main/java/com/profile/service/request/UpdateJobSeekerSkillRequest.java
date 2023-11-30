package com.profile.service.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateJobSeekerSkillRequest {

    private Long skillId;

    private String skillTitle;

    private String skillDiscription;

    private Long skillRating;
}
