package com.job.jobservice.response;


public class JobCandidateResponse {

    private JobSeekerProfileDetailsResponse candidateDetails;

    private String candidateStatus;

    public JobSeekerProfileDetailsResponse getCandidateDetails() {
        return candidateDetails;
    }

    public void setCandidateDetails(JobSeekerProfileDetailsResponse candidateDetails) {
        this.candidateDetails = candidateDetails;
    }

    public String getCandidateStatus() {
        return candidateStatus;
    }

    public void setCandidateStatus(String candidateStatus) {
        this.candidateStatus = candidateStatus;
    }
}
