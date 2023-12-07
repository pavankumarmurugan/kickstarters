package com.job.jobservice.request;

public class JobSearchRequest {
	
	private String jobTitle;
	
	private String fromRange;
	
	private String toRange;

	public String getJobTitle() {
		return jobTitle;
	}

	public void setJobTitle(String jobTitle) {
		this.jobTitle = jobTitle;
	}

	public String getFromRange() {
		return fromRange;
	}

	public void setFromRange(String fromRange) {
		this.fromRange = fromRange;
	}

	public String getToRange() {
		return toRange;
	}

	public void setToRange(String toRange) {
		this.toRange = toRange;
	}

}
