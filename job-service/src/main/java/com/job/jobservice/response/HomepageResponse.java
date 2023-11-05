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
	
	private Long jobId;

    private String jobTitle;

    private String jobDesc;

    private Long jobSalary;

	public Long getJobId() {
		return jobId;
	}

	public void setJobId(Long jobId) {
		this.jobId = jobId;
	}

	public String getJobTitle() {
		return jobTitle;
	}

	public void setJobTitle(String jobTitle) {
		this.jobTitle = jobTitle;
	}

	public String getJobDesc() {
		return jobDesc;
	}

	public void setJobDesc(String jobDesc) {
		this.jobDesc = jobDesc;
	}

	public Long getJobSalary() {
		return jobSalary;
	}

	public void setJobSalary(Long jobSalary) {
		this.jobSalary = jobSalary;
	}
}
