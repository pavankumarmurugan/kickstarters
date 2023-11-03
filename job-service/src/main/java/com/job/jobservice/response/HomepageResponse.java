package com.job.jobservice.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * ClassName: HomepageResponse
 * Description:
 *
 * @Author: Jiaxin Zhang
 * @Creat: 03/11/2023 11:10
 * @Version: 1.8
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class HomepageResponse {

    private String jobTitle;

    private String jobDesc;

    private int salary;
}
