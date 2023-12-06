package com.job.jobservice.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.job.jobservice.entity.*;
import com.job.jobservice.repository.*;
import com.job.jobservice.request.CandidateStatusRequest;
import com.job.jobservice.request.JobSearchRequest;
import com.job.jobservice.response.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.job.jobservice.request.PostJobRequest;
import com.job.jobservice.request.UpdateJobRequest;

@Service
public class JobServiceImpl implements JobService {

	@Autowired
	JobRepository jobRepository;

	@Autowired
	UserRepository userRepository;

	@Autowired
	JobApplicationRepository jobApplicationRepository;

	@Autowired
	JobSeekerProfileDetailsRepository jobSeekerProfileDetailsRepository;

	@Autowired
	JobSeekerExperienceRepository jobSeekerExperienceRepository;

	@Autowired
	JobSeekerSkillRepository jobSeekerSkillRepository;



	public List<HomepageResponse> getAllJobs() {

		List<HomepageResponse> homepageResponseList = new ArrayList<>();

		List<JobEntity> jobList = jobRepository.findByJobStatusTrue();
		for (JobEntity jobEntity : jobList) {
			HomepageResponse homepageResponse = new HomepageResponse();
			homepageResponse.setJobId(jobEntity.getJobId());
			homepageResponse.setJobTitle(jobEntity.getJobTitle());
			homepageResponse.setJobDesc(jobEntity.getJobDesc());
			homepageResponse.setJobDuration(jobEntity.getJobDuration());
			homepageResponse.setJobLocation(jobEntity.getJobLocation());
			homepageResponse.setJobPostedBy(jobEntity.getJobPostedBy().getUserEmail());
			homepageResponse.setJobPostTime(jobEntity.getJobPostTime());
			homepageResponse.setJobSalary(jobEntity.getJobSalary());
			homepageResponse.setJobSkill(jobEntity.getJobSkill());
			if (Boolean.TRUE.equals(jobEntity.getJobStatus())) {
				homepageResponse.setJobStatus("Open");
			} else {
				homepageResponse.setJobStatus("Closed");
			}
			homepageResponse.setJobUpdateTime(jobEntity.getJobUpdateTime());
			homepageResponse.setJobWorkExperience(jobEntity.getJobWorkExperience());
			homepageResponseList.add(homepageResponse);
		}
		return homepageResponseList;
	}

	public Map<String, String> postJob(String userEmail, PostJobRequest postJobRequest) {

		JobEntity jobEntity = new JobEntity();
		Optional<UserEntity> userEntity = userRepository.findByUserEmailAndUserRole(userEmail, Role.EMPLOYER);
		if (userEntity.isEmpty()) {
			throw new IllegalArgumentException("User is not Valid");
		}
		jobEntity.setJobTitle(postJobRequest.getJobTitle());
		jobEntity.setJobDesc(postJobRequest.getJobDesc());
		jobEntity.setJobDuration(postJobRequest.getJobDuration());
		jobEntity.setJobLocation(postJobRequest.getJobLocation());
		jobEntity.setJobSalary(postJobRequest.getJobSalary());
		jobEntity.setJobSkill(postJobRequest.getJobSkill());
		jobEntity.setJobWorkExperience(postJobRequest.getJobWorkExperience());
		jobEntity.setJobPostedBy(userEntity.get());
		jobEntity.setJobPostTime(LocalDateTime.now());
		jobEntity.setJobStatus(Boolean.TRUE);

		jobRepository.save(jobEntity);

		Map<String, String> response = new HashMap<>();
		response.put("message", "Job posted successfully");

		return response;
	}

	public Map<String, String> updateJob(String userEmail, UpdateJobRequest updateJobRequest) {

		Optional<JobEntity> jobEntityOpt = jobRepository.findByJobIdAndJobStatusTrue(updateJobRequest.getJobId());

		if (jobEntityOpt.isEmpty()) {
			throw new IllegalArgumentException("Job not found or job is closed");
		}

		JobEntity jobEntity = jobEntityOpt.get();

		Optional<UserEntity> userEntity = userRepository.findByUserEmailAndUserRole(userEmail, Role.EMPLOYER);

		if (userEntity.isEmpty() || !userEmail.equals(jobEntity.getJobPostedBy().getUserEmail())) {
			throw new IllegalArgumentException("Not valid user to update");
		}

		jobEntity.setJobTitle(updateJobRequest.getJobTitle());
		jobEntity.setJobDesc(updateJobRequest.getJobDesc());
		jobEntity.setJobDuration(updateJobRequest.getJobDuration());
		jobEntity.setJobLocation(updateJobRequest.getJobLocation());
		jobEntity.setJobSalary(updateJobRequest.getJobSalary());
		jobEntity.setJobSkill(updateJobRequest.getJobSkill());
		jobEntity.setJobWorkExperience(updateJobRequest.getJobWorkExperience());
		jobEntity.setJobUpdateTime(LocalDateTime.now());

		jobRepository.save(jobEntity);

		Map<String, String> response = new HashMap<>();
		response.put("message", "Job updated successfully");

		return response;
	}

	public Map<String, String> closeJob(String userEmail, Long jobId) {

		Optional<JobEntity> jobEntityOpt = jobRepository.findByJobIdAndJobStatusTrue(jobId);

		if (jobEntityOpt.isEmpty()) {
			throw new IllegalArgumentException("Job not found or job is already closed");
		}

		JobEntity jobEntity = jobEntityOpt.get();

		Optional<UserEntity> userEntity = userRepository.findByUserEmailAndUserRole(userEmail, Role.EMPLOYER);

		if (userEntity.isEmpty() || !userEmail.equals(jobEntity.getJobPostedBy().getUserEmail())) {
			throw new IllegalArgumentException("Not valid user to update");
		}

		jobEntity.setJobUpdateTime(LocalDateTime.now());
		jobEntity.setJobStatus(Boolean.FALSE);

		jobRepository.save(jobEntity);

		Map<String, String> response = new HashMap<>();
		response.put("message", "Job closed successfully");

		return response;
	}

	public List<HomepageResponse> getAllPostedJobsByUser(String userEmail) {

		List<HomepageResponse> homepageResponseList = new ArrayList<>();

		Optional<UserEntity> userEntity = userRepository.findByUserEmailAndUserRole(userEmail, Role.EMPLOYER);

		if (userEntity.isEmpty()) {
			throw new IllegalArgumentException("Not valid user");
		}

		List<JobEntity> jobList = jobRepository.findByJobPostedBy(userEntity.get());
		for (JobEntity jobEntity : jobList) {
			HomepageResponse homepageResponse = new HomepageResponse();
			homepageResponse.setJobId(jobEntity.getJobId());
			homepageResponse.setJobTitle(jobEntity.getJobTitle());
			homepageResponse.setJobDesc(jobEntity.getJobDesc());
			homepageResponse.setJobDuration(jobEntity.getJobDuration());
			homepageResponse.setJobLocation(jobEntity.getJobLocation());
			homepageResponse.setJobPostedBy(jobEntity.getJobPostedBy().getUserEmail());
			homepageResponse.setJobPostTime(jobEntity.getJobPostTime());
			homepageResponse.setJobSalary(jobEntity.getJobSalary());
			homepageResponse.setJobSkill(jobEntity.getJobSkill());
			if (Boolean.TRUE.equals(jobEntity.getJobStatus())) {
				homepageResponse.setJobStatus("Open");
			} else {
				homepageResponse.setJobStatus("Closed");
			}
			homepageResponse.setJobUpdateTime(jobEntity.getJobUpdateTime());
			homepageResponse.setJobWorkExperience(jobEntity.getJobWorkExperience());
			homepageResponseList.add(homepageResponse);
		}
		return homepageResponseList;
	}



	public Map<String, String> applyJob(String userEmail, Long jobId) {

		Optional<JobEntity> jobEntityOpt = jobRepository.findByJobIdAndJobStatusTrue(jobId);

		if(jobEntityOpt.isEmpty()) {
			throw new IllegalArgumentException("Job not found or job is already closed");
		}

		JobEntity jobEntity = jobEntityOpt.get();

		Optional<UserEntity> userEntity = userRepository.findByUserEmailAndUserRole(userEmail, Role.JOBSEEKER);

		if(userEntity.isEmpty()) {
			throw new IllegalArgumentException("Not valid user to apply job");
		}

		Optional<JobApplicationEntity> jobApplicationEntityOpl = jobApplicationRepository.findByJobIdAndJobApplicationBy(jobEntity, userEntity.get());


		if(!jobApplicationEntityOpl.isEmpty()) {
			throw new IllegalArgumentException("User has already applied this job");
		}

		JobApplicationEntity jobApplicationEntity = new JobApplicationEntity();

		jobApplicationEntity.setJobApplicationBy(userEntity.get());
		jobApplicationEntity.setJobApplicationStatus(Boolean.TRUE);
		jobApplicationEntity.setJobApplicationTime(LocalDateTime.now());
		jobApplicationEntity.setJobApplicationStatusEmployer("In Progress");
		jobApplicationEntity.setJobId(jobEntity);

		jobApplicationRepository.save(jobApplicationEntity);

		Map<String, String> response = new HashMap<>();
		response.put("message", "Job applied successfully");

		return response;
	}

	@Override
	public List<JobCandidateResponse> jobCandidateList(String userEmail, Long jobId) {

		List<JobCandidateResponse> jobCandidateResponseList = new ArrayList<>();

		Optional<JobEntity> jobEntityOpt = jobRepository.findByJobIdAndJobStatusTrue(jobId);

		if(jobEntityOpt.isEmpty()) {
			throw new IllegalArgumentException("Job not found or job is already closed");
		}

		JobEntity jobEntity = jobEntityOpt.get();

		Optional<UserEntity> userEntity = userRepository.findByUserEmailAndUserRole(userEmail, Role.EMPLOYER);

		if (!userEntity.isPresent() || !userEmail.equals(jobEntity.getJobPostedBy().getUserEmail())) {
			throw new IllegalArgumentException("Not valid user to get the details");
		}

		List<JobApplicationEntity> jobApplicationEntityList = jobApplicationRepository.findByJobIdAndJobApplicationStatusIsTrue(jobEntity);

		if(jobApplicationEntityList.isEmpty()) {
			return jobCandidateResponseList;
		} else {
			for(JobApplicationEntity jobApplicationEntity: jobApplicationEntityList ) {

				JobCandidateResponse jobCandidateResponse = new JobCandidateResponse();

				JobSeekerProfileDetailsResponse jobSeekerProfileDetailsResponse = new JobSeekerProfileDetailsResponse();

				Optional<UserEntity> jobSeekerUserEntityOpl =
						userRepository.findByUserEmailAndUserRole(jobApplicationEntity.getJobApplicationBy().getUserEmail(), Role.JOBSEEKER);

				if(jobSeekerUserEntityOpl.isPresent()) {
					UserEntity jobSeekerUserEntity = jobSeekerUserEntityOpl.get();

					Optional<JobSeekerProfileEntity> jobSeekerProfileEntityOpl =
							jobSeekerProfileDetailsRepository.findByUserId(jobApplicationEntity.getJobApplicationBy());

					if(jobSeekerProfileEntityOpl.isPresent()) {
						JobSeekerProfileEntity jobSeekerProfileEntity = jobSeekerProfileEntityOpl.get();
						jobSeekerProfileDetailsResponse.setUserEmail(jobSeekerProfileEntity.getUserId().getUserEmail());
						jobSeekerProfileDetailsResponse.setUserFirstName(jobSeekerProfileEntity.getUserId().getUserFirstName());
						jobSeekerProfileDetailsResponse.setUserLastName(jobSeekerProfileEntity.getUserId().getUserLastName());
						jobSeekerProfileDetailsResponse.setUserId(jobSeekerProfileEntity.getUserId().getUserId());
						jobSeekerProfileDetailsResponse.setJobSeekerMobileNo(jobSeekerProfileEntity.getJobSeekerMobileNo());
						jobSeekerProfileDetailsResponse.setJobSeekerLocation(jobSeekerProfileEntity.getJobSeekerLocation());
					} else {
						jobSeekerProfileDetailsResponse.setUserEmail(jobSeekerUserEntity.getUserEmail());
						jobSeekerProfileDetailsResponse.setUserFirstName(jobSeekerUserEntity.getUserFirstName());
						jobSeekerProfileDetailsResponse.setUserLastName(jobSeekerUserEntity.getUserLastName());
						jobSeekerProfileDetailsResponse.setUserId(jobSeekerUserEntity.getUserId());
					}

					List<JobSeekerExperienceEntity> jobSeekerExperienceEntityList =
							jobSeekerExperienceRepository.findByUserId(jobSeekerUserEntity);

					if(jobSeekerExperienceEntityList.isEmpty()) {
						jobSeekerProfileDetailsResponse.setJobSeekerExperienceList(new ArrayList<>());
					} else {
						List<JobSeekerExperienceResponse> jobSeekerExperienceResponseList = new ArrayList<>();
						for(JobSeekerExperienceEntity jobSeekerExperienceEntity : jobSeekerExperienceEntityList) {
							JobSeekerExperienceResponse jobSeekerExperienceResponse = new JobSeekerExperienceResponse();
							jobSeekerExperienceResponse.setJobExperienceTitle(jobSeekerExperienceEntity.getJobExperienceTitle());;
							jobSeekerExperienceResponse.setJobExperienceDescription(jobSeekerExperienceEntity.getJobExperienceDescription());
							jobSeekerExperienceResponse.setJobExperienceDuration(jobSeekerExperienceEntity.getJobExperienceDuration());
							jobSeekerExperienceResponse.setJobExperienceId(jobSeekerExperienceEntity.getJobExperienceId());
							jobSeekerExperienceResponseList.add(jobSeekerExperienceResponse);
						}
						jobSeekerProfileDetailsResponse.setJobSeekerExperienceList(jobSeekerExperienceResponseList);
					}

					List<JobSeekerSkillEntity> jobSeekerSkillEntityList = jobSeekerSkillRepository.findByUserId(jobSeekerUserEntity);

					if(jobSeekerSkillEntityList.isEmpty()) {
						jobSeekerProfileDetailsResponse.setJobSeekerSkillList(new ArrayList<>());
					} else {
						List<JobSeekerSkillResponse> jobSeekerSkillResponseList = new ArrayList<>();
						for(JobSeekerSkillEntity jobSeekerSkillEntity : jobSeekerSkillEntityList) {
							JobSeekerSkillResponse jobSeekerSkillResponse = new JobSeekerSkillResponse();
							jobSeekerSkillResponse.setSkillDiscription(jobSeekerSkillEntity.getSkillDiscription());
							jobSeekerSkillResponse.setSkillRating(jobSeekerSkillEntity.getSkillRating());
							jobSeekerSkillResponse.setSkillTitle(jobSeekerSkillEntity.getSkillTitle());
							jobSeekerSkillResponse.setSkillId(jobSeekerSkillEntity.getSkillId());
							jobSeekerSkillResponseList.add(jobSeekerSkillResponse);
						}
						jobSeekerProfileDetailsResponse.setJobSeekerSkillList(jobSeekerSkillResponseList);
					}
					jobCandidateResponse.setCandidateDetails(jobSeekerProfileDetailsResponse);
					jobCandidateResponse.setCandidateStatus(jobApplicationEntity.getJobApplicationStatusEmployer());
					jobCandidateResponseList.add(jobCandidateResponse);
				}
			}
		}

		return jobCandidateResponseList;
	}

	@Override
	public Map<String, String> updateCandidateStatus(String userEmail, CandidateStatusRequest candidateStatusRequest) {

		Optional<JobEntity> jobEntityOpt = jobRepository.findByJobIdAndJobStatusTrue(candidateStatusRequest.getJobId());

		if(!jobEntityOpt.isPresent()) {
			throw new IllegalArgumentException("Job not found or job is already closed");
		}

		JobEntity jobEntity = jobEntityOpt.get();

		Optional<UserEntity> userEntity = userRepository.findByUserEmailAndUserRole(userEmail, Role.EMPLOYER);

		if (!userEntity.isPresent() || !userEmail.equals(jobEntity.getJobPostedBy().getUserEmail())) {
			throw new IllegalArgumentException("Not valid user to update the details");
		}

		Optional<UserEntity> jobSeekerEntity = userRepository.findByUserIdAndUserRole(candidateStatusRequest.getJobSeekerId(), Role.JOBSEEKER);

		if(!jobSeekerEntity.isPresent()) {
			throw new IllegalArgumentException("Not valid jobseeker");
		}

		Optional<JobApplicationEntity> jobApplicationEntityOpl =
				jobApplicationRepository.findByJobIdAndJobApplicationBy(jobEntity, jobSeekerEntity.get());

		if(!jobApplicationEntityOpl.isPresent()) {
			throw new IllegalArgumentException("Not valid jobseeker for this job");
		}

		JobApplicationEntity jobApplicationEntity = jobApplicationEntityOpl.get();

		jobApplicationEntity.setJobApplicationStatusEmployer(candidateStatusRequest.getCandidateStatus());
		jobApplicationEntity.setJobApplicationUpdateTime(LocalDateTime.now());
		jobApplicationRepository.save(jobApplicationEntity);


		Map<String, String> response = new HashMap<>();
		response.put("message", "Candidate status updated successfully");

		return response;
	}

	@Override
	public List<HomepageResponse> jobseekerJobSearch(JobSearchRequest jobSearchRequest) {
		
		List<HomepageResponse> homepageResponseList = new ArrayList<>();
		
		List<JobEntity> jobList;
		
		if(jobSearchRequest.getFromRange() == null && jobSearchRequest.getToRange() == null) {
			jobList = jobRepository.findByJobTitleContainingIgnoreCaseAndJobStatusTrue(jobSearchRequest.getJobTitle());
		} else if(jobSearchRequest.getFromRange() != null && jobSearchRequest.getToRange() != null){
			String[] fromMonthAndYearArray = jobSearchRequest.getFromRange().split("/");
			String[] toMonthAndYearArray = jobSearchRequest.getToRange().split("/");
			
			int fromMonth = 0;
			int fromYear = 0;
			
			int toMonth = 0;
			int toYear = 0;
			try {
				fromMonth = Integer.parseInt(fromMonthAndYearArray[0]);
				fromYear = Integer.parseInt(fromMonthAndYearArray[1]);
				
				toMonth = Integer.parseInt(toMonthAndYearArray[0]);
				toYear = Integer.parseInt(toMonthAndYearArray[1]);
			} catch(Exception e) {
				throw new IllegalArgumentException("Filter dates are invalid");
			}
			
			LocalDateTime fromDate = LocalDateTime.of(fromYear, fromMonth, 1, 0, 0);
			LocalDateTime toDate;
			if(toMonth == 12) {
				toDate = LocalDateTime.of(toYear, toMonth, 31, 23, 59).minusSeconds(1);
			} else {
				toDate = LocalDateTime.of(toYear, toMonth + 1, 1, 0, 0).minusSeconds(1);
			}
			if(fromDate.isAfter(toDate)) {
				throw new IllegalArgumentException("Filter dates are invalid");
			}
			jobList = jobRepository.searchJobTitleWithFilter("%" + jobSearchRequest.getJobTitle() + "%",Boolean.TRUE ,fromDate,toDate);
			
		} else {
			throw new IllegalArgumentException("Filter dates are invalid");
		}
		
		for (JobEntity jobEntity : jobList) {
			HomepageResponse homepageResponse = new HomepageResponse();
			homepageResponse.setJobId(jobEntity.getJobId());
			homepageResponse.setJobTitle(jobEntity.getJobTitle());
			homepageResponse.setJobDesc(jobEntity.getJobDesc());
			homepageResponse.setJobDuration(jobEntity.getJobDuration());
			homepageResponse.setJobLocation(jobEntity.getJobLocation());
			homepageResponse.setJobPostedBy(jobEntity.getJobPostedBy().getUserEmail());
			homepageResponse.setJobPostTime(jobEntity.getJobPostTime());
			homepageResponse.setJobSalary(jobEntity.getJobSalary());
			homepageResponse.setJobSkill(jobEntity.getJobSkill());
			if (Boolean.TRUE.equals(jobEntity.getJobStatus())) {
				homepageResponse.setJobStatus("Open");
			} else {
				homepageResponse.setJobStatus("Closed");
			}
			homepageResponse.setJobUpdateTime(jobEntity.getJobUpdateTime());
			homepageResponse.setJobWorkExperience(jobEntity.getJobWorkExperience());
			homepageResponseList.add(homepageResponse);
		}
		return homepageResponseList;
	}

	@Override
	public List<JobSeekerAppliedJobResponse> jobseekerAllAppliedJobs(String userEmail) {
		List<JobSeekerAppliedJobResponse> jobSeekerAppliedJobResponseList = new ArrayList<>();

		Optional<UserEntity> userEntity = userRepository.findByUserEmailAndUserRole(userEmail, Role.JOBSEEKER);

		if (!userEntity.isPresent()) {
			throw new IllegalArgumentException("Not valid user to get details");
		}

		List<JobApplicationEntity> jobApplicationEntityList = jobApplicationRepository.findByJobApplicationBy(userEntity.get());

		for(JobApplicationEntity jobApplicationEntity : jobApplicationEntityList) {
			JobSeekerAppliedJobResponse jobSeekerAppliedJobResponse = new JobSeekerAppliedJobResponse();
			jobSeekerAppliedJobResponse.setJobId(jobApplicationEntity.getJobId().getJobId());
			jobSeekerAppliedJobResponse.setJobTitle(jobApplicationEntity.getJobId().getJobTitle());
			jobSeekerAppliedJobResponse.setJobDesc(jobApplicationEntity.getJobId().getJobDesc());
			jobSeekerAppliedJobResponse.setJobDuration(jobApplicationEntity.getJobId().getJobDuration());
			jobSeekerAppliedJobResponse.setJobLocation(jobApplicationEntity.getJobId().getJobLocation());
			jobSeekerAppliedJobResponse.setJobPostedBy(jobApplicationEntity.getJobId().getJobPostedBy().getUserEmail());
			jobSeekerAppliedJobResponse.setJobPostTime(jobApplicationEntity.getJobId().getJobPostTime());
			jobSeekerAppliedJobResponse.setJobSalary(jobApplicationEntity.getJobId().getJobSalary());
			jobSeekerAppliedJobResponse.setJobSkill(jobApplicationEntity.getJobId().getJobSkill());

			if(Boolean.TRUE.equals(jobApplicationEntity.getJobId().getJobStatus())) {
				jobSeekerAppliedJobResponse.setJobStatus("Open");
			} else {
				jobSeekerAppliedJobResponse.setJobStatus("Closed");
			}

			jobSeekerAppliedJobResponse.setJobUpdateTime(jobApplicationEntity.getJobId().getJobUpdateTime());
			jobSeekerAppliedJobResponse.setJobWorkExperience(jobApplicationEntity.getJobId().getJobWorkExperience());

			if(Boolean.TRUE.equals(jobApplicationEntity.getJobApplicationStatus())) {
				jobSeekerAppliedJobResponse.setJobApplicationStatus("Applied");
			} else {
				jobSeekerAppliedJobResponse.setJobApplicationStatus("Cancelled");
			}

			jobSeekerAppliedJobResponse.setJobApplicationStatusEmployer(jobApplicationEntity.getJobApplicationStatusEmployer());
			jobSeekerAppliedJobResponse.setJobApplicationTime(jobApplicationEntity.getJobApplicationTime());
			jobSeekerAppliedJobResponse.setJobApplicationUpdateTime(jobApplicationEntity.getJobApplicationUpdateTime());
			jobSeekerAppliedJobResponseList.add(jobSeekerAppliedJobResponse);
		}
		return jobSeekerAppliedJobResponseList;
	}

	@Override
	public Map<String, String> cancelApplication(String userEmail, Long jobId) {

		Optional<JobEntity> jobEntityOpt = jobRepository.findByJobIdAndJobStatusTrue(jobId);

		if(jobEntityOpt.isEmpty()) {
			throw new IllegalArgumentException("Job not found or job is already closed");
		}

		JobEntity jobEntity = jobEntityOpt.get();

		Optional<UserEntity> userEntity = userRepository.findByUserEmailAndUserRole(userEmail, Role.JOBSEEKER);

		if(userEntity.isEmpty()) {
			throw new IllegalArgumentException("Not valid user to cancel job");
		}

		Optional<JobApplicationEntity> jobApplicationEntityOpl = jobApplicationRepository.findByJobIdAndJobApplicationBy(jobEntity, userEntity.get());


		if(jobApplicationEntityOpl.isEmpty()) {
			throw new IllegalArgumentException("User has not applied to the job");
		}

		JobApplicationEntity jobApplicationEntity = jobApplicationEntityOpl.get();

		jobApplicationEntity.setJobApplicationStatus(Boolean.FALSE);
		jobApplicationEntity.setJobApplicationUpdateTime(LocalDateTime.now());

		jobApplicationRepository.save(jobApplicationEntity);

		Map<String, String> response = new HashMap<>();
		response.put("message", "Application Cancelled successfully");

		return response;
	}



}