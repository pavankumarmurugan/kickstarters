package com.job.jobservice.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.job.jobservice.entity.JobEntity;
import com.job.jobservice.entity.Role;
import com.job.jobservice.entity.UserEntity;
import com.job.jobservice.repository.JobRepository;
import com.job.jobservice.repository.UserRepository;
import com.job.jobservice.request.PostJobRequest;
import com.job.jobservice.request.UpdateJobRequest;
import com.job.jobservice.response.HomepageResponse;
import com.job.jobservice.response.JobDetailsResponse;

@Service
public class JobServiceImpl implements JobService{

	@Autowired
	JobRepository jobRepository;

	@Autowired
	UserRepository userRepository;

	//    public List<HomepageResponse> getAllJobs() {
	//        List<HomepageResponse> homepageResponses = new ArrayList<>();
	//
	//            List<Job> jobs = jobRepository.findAllOpenJob();
	//            for (int i = 0; i < jobs.size(); i++) {
	//                HomepageResponse homepageResponse = new HomepageResponse();
	//                homepageResponse.setJobTitle(jobs.get(i).getJobTitle());
	//                homepageResponse.setJobDesc(jobs.get(i).getJobDesc());
	//                homepageResponse.setSalary(jobs.get(i).getSalary());
	//                homepageResponses.add(homepageResponse);
	//            }
	//        return homepageResponses;
	//
	//    }
	//
	//    public Job addJob(Job job) {
	//        if (job.getJobStatus() == null) {
	//            job.setJobStatus(true); // 设置默认值
	//        }
	//        if (job.getPostTime() == null) {
	//            job.setPostTime(new Date()); // 设置当前时间
	//        }
	//    }
	//    
	public List<HomepageResponse> getAllJobs() {

		List<HomepageResponse> homepageResponseList = new ArrayList<>();

		List<JobEntity> jobList = jobRepository.findByJobStatusTrue();
		for(JobEntity jobEntity: jobList) {
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
			if(Boolean.TRUE.equals(jobEntity.getJobStatus())) {
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
		if(userEntity.isEmpty()) {
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

		if(jobEntityOpt.isEmpty()) {
			throw new IllegalArgumentException("Job not found or job is closed");
		}

		JobEntity jobEntity = jobEntityOpt.get();

		Optional<UserEntity> userEntity = userRepository.findByUserEmailAndUserRole(userEmail, Role.EMPLOYER);

		if(userEntity.isEmpty() || !userEmail.equals(jobEntity.getJobPostedBy().getUserEmail())) {
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

		if(jobEntityOpt.isEmpty()) {
			throw new IllegalArgumentException("Job not found or job is already closed");
		}

		JobEntity jobEntity = jobEntityOpt.get();

		Optional<UserEntity> userEntity = userRepository.findByUserEmailAndUserRole(userEmail, Role.EMPLOYER);

		if(userEntity.isEmpty() || !userEmail.equals(jobEntity.getJobPostedBy().getUserEmail())) {
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

		if(userEntity.isEmpty()) {
			throw new IllegalArgumentException("Not valid user");
		}

		List<JobEntity> jobList = jobRepository.findByJobPostedBy(userEntity.get());
		for(JobEntity jobEntity: jobList) {
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
			if(Boolean.TRUE.equals(jobEntity.getJobStatus())) {
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
	
//	public JobDetailsResponse getJobDetailsByUser(String userEmail, Long jobId) {
//		JobDetailsResponse jobDetailsResponse = new JobDetailsResponse();
//		
//		Optional<JobEntity> jobEntityOpt = jobRepository.findByJobId(jobId);
//
//		if(jobEntityOpt.isEmpty()) {
//			throw new IllegalArgumentException("Job not found");
//		}
//		
//		JobEntity jobEntity = jobEntityOpt.get();
//		
//		Optional<UserEntity> userEntity = userRepository.findByUserEmailAndUserRole(userEmail, Role.EMPLOYER);
//
//		if(userEntity.isEmpty() || !userEmail.equals(jobEntity.getJobPostedBy().getUserEmail())) {
//			throw new IllegalArgumentException("Not valid user to fetch job details");
//		}
//		
//		jobDetailsResponse.setJobId(jobEntity.getJobId());
//		jobDetailsResponse.setJobTitle(jobEntity.getJobTitle());
//		jobDetailsResponse.setJobDesc(jobEntity.getJobDesc());
//		jobDetailsResponse.setJobDuration(jobEntity.getJobDuration());
//		jobDetailsResponse.setJobLocation(jobEntity.getJobLocation());
//		jobDetailsResponse.setJobPostedBy(userEmail);
//		jobDetailsResponse.setJobPostTime(jobEntity.getJobPostTime());
//		jobDetailsResponse.setJobSalary(jobEntity.getJobSalary());
//		jobDetailsResponse.setJobSkill(jobEntity.getJobSkill());
//		if(Boolean.TRUE.equals(jobEntity.getJobStatus())) {
//			jobDetailsResponse.setJobStatus("Open");
//		} else {
//			jobDetailsResponse.setJobStatus("Closed");
//		}
//		jobDetailsResponse.setJobUpdateTime(jobEntity.getJobUpdateTime());
//		jobDetailsResponse.setJobWorkExperience(jobEntity.getJobWorkExperience());
//
//		return jobDetailsResponse;
//	}

//	@Override
//	public Object getJobDetailsByJobSeeker(String userEmail, Long jobId) {
//		JobDetailsResponse jobDetailsResponse = new JobDetailsResponse();
//
//		Optional<JobEntity> jobEntityOpt = jobRepository.findByJobId(jobId);
//
//		if(jobEntityOpt.isEmpty()) {
//			throw new IllegalArgumentException("Job not found");
//		}
//
//		JobEntity jobEntity = jobEntityOpt.get();
//
//		Optional<UserEntity> userEntity = userRepository.findByUserEmailAndUserRole(userEmail, Role.JOBSEEKER);
//
//		if(userEntity.isEmpty() || !userEmail.equals(userEntity.get().getUserEmail())) {
//			throw new IllegalArgumentException("Not valid user to fetch job details");
//		}
//
//		jobDetailsResponse.setJobId(jobEntity.getJobId());
//		jobDetailsResponse.setJobTitle(jobEntity.getJobTitle());
//		jobDetailsResponse.setJobDesc(jobEntity.getJobDesc());
//		jobDetailsResponse.setJobDuration(jobEntity.getJobDuration());
//		jobDetailsResponse.setJobLocation(jobEntity.getJobLocation());
//		jobDetailsResponse.setJobPostedBy(userEmail);
//		jobDetailsResponse.setJobPostTime(jobEntity.getJobPostTime());
//		jobDetailsResponse.setJobSalary(jobEntity.getJobSalary());
//		jobDetailsResponse.setJobSkill(jobEntity.getJobSkill());
//		if(Boolean.TRUE.equals(jobEntity.getJobStatus())) {
//			jobDetailsResponse.setJobStatus("Open");
//		} else {
//			jobDetailsResponse.setJobStatus("Closed");
//		}
//		jobDetailsResponse.setJobUpdateTime(jobEntity.getJobUpdateTime());
//		jobDetailsResponse.setJobWorkExperience(jobEntity.getJobWorkExperience());
//
//		return jobDetailsResponse;
//	}
}
