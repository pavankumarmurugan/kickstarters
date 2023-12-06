package com.job.jobservice.request;

public class JobSearchRequest {
	
	private String jobTitle;
	
	private int fromMonth = 0;
	
	private int fromYear = 0;
	
	private int toMonth = 0;
	
	private int toYear = 0;

	public String getJobTitle() {
		return jobTitle;
	}

	public void setJobTitle(String jobTitle) {
		this.jobTitle = jobTitle;
	}

	public int getFromMonth() {
		return fromMonth;
	}

	public void setFromMonth(int fromMonth) {
		this.fromMonth = fromMonth;
	}

	public int getFromYear() {
		return fromYear;
	}

	public void setFromYear(int fromYear) {
		this.fromYear = fromYear;
	}

	public int getToMonth() {
		return toMonth;
	}

	public void setToMonth(int toMonth) {
		this.toMonth = toMonth;
	}

	public int getToYear() {
		return toYear;
	}

	public void setToYear(int toYear) {
		this.toYear = toYear;
	}

}
