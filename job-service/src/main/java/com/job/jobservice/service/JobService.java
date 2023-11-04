package com.job.jobservice.service;

import com.job.jobservice.entity.Job;
import com.job.jobservice.repository.JobRepository;
import com.job.jobservice.response.HomepageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Service
public class JobService {

    @Autowired
    JobRepository jobRepository;

    public List<HomepageResponse> getAllJobs() {
        List<HomepageResponse> homepageResponses = new ArrayList<>();

            List<Job> jobs = jobRepository.findAllOpenJob();
            for (int i = 0; i < jobs.size(); i++) {
                HomepageResponse homepageResponse = new HomepageResponse();
                homepageResponse.setJobTitle(jobs.get(i).getJobTitle());
                homepageResponse.setJobDesc(jobs.get(i).getJobDesc());
                homepageResponse.setSalary(jobs.get(i).getSalary());
                homepageResponses.add(homepageResponse);
            }
        return homepageResponses;

    }

    public Job addJob(Job job) {
        if (job.getJobStatus() == null) {
            job.setJobStatus(true); // 设置默认值
        }
        if (job.getPostTime() == null) {
            job.setPostTime(new Date()); // 设置当前时间
        }
    }
}
