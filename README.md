# KickStarters

## Table of Contents
1. [Introduction](#introduction)
2. [Technologies](#technologies)
3. [Project Structure](#project-structure)
4. [Prerequisites](#prerequisites)
5. [Configuration](#configuration)
6. [Running the Application](#running-the-application)

## Introduction

The Kickstarters Web Application is a dynamic and innovative platform designed to bridge the gap between job seekers and employers, making the job search and hiring process easier, more efficient, and ultimately more rewarding for everyone involved. Whether you're a job seeker looking for your dream job or an employer seeking top talent to kickstart your company's success, Kickstarters has you covered.

For Job Seekers:
Are you ready to take the next step in your career or make a fresh start in the job market? Kickstarters provides a user-friendly interface for job seekers to explore, discover, and apply for exciting job opportunities. Here's what you can expect:

Easy Job Discovery: Browse through a wide range of job listings across various industries and locations, making it simple to find positions that align with your skills and interests.

Customized Job Search: Utilize our advanced search filters to narrow down your job search based on factors such as location, job type, salary, and more, ensuring you find the perfect match.

Effortless Application: Apply to jobs with just a few clicks, uploading your resume and cover letter, or using our built-in resume builder to create a professional profile.

Job Alerts: Stay updated with the latest job openings through email notifications and save your favorite jobs for later reference.

For Employers
Are you looking to build a skilled and diverse workforce for your company? Kickstarters empowers employers to streamline their hiring process and connect with qualified candidates effortlessly:

Job Posting: Easily create and manage job listings, including detailed descriptions, requirements, and application deadlines.

Candidate Management: Organize and track job applications with our intuitive dashboard, helping you efficiently review and communicate with potential hires.

Access to Top Talent: Tap into a pool of talented job seekers who are actively looking for new opportunities.

Branding and Visibility: Showcase your company culture and brand with a company profile, attracting candidates who align with your values.

Diverse Hiring: Promote diversity and inclusion by connecting with a wide range of candidates from different backgrounds.

Kickstarters is committed to revolutionizing the job search and hiring process, bringing job seekers and employers together in a supportive, inclusive, and dynamic environment. Whether you're embarking on a new career journey or searching for the perfect addition to your team, Kickstarters is your starting point for success. Join us today and let's kickstart your future together!

## Technologies

List the technologies and frameworks used in your project, including versions. For example:

- Frontend: React (v18.16.1)
- Backend: Spring Boot (v3.1.5), Java (v17), Maven (v3.9.4)
- Database: MySQL (v8.0.31)
- Microservices: profile-service, job-service

## Project Structure

/kickstarters
├── /gateway-service
├── /job-service
├── /kickstarters-app
├── /profile-service
├── /service-registry
├── README.md

- gateway-service -- Spring Boot - API Gateway for the microservices architecture
- job-service -- Spring Boot - Service contains the all the API's related to jobs post, update, close, fetch details
- kickstarters-app -- React - UI Component for the web application
- profile-service -- Spring Boot - Service contains the all the API's related to register user, login, authentication
- service-registry -- Spring Boot - Service registory for the microservices architecture

## Prerequisites

- Node.js and npm (for the frontend)
- Java Development Kit (JDK) 17 or higher (for the backend)
- Maven (for the backend)
- MySQL (for the database)
- VS Code (IDE)
- Eclipse (IDE)
- Chrome (Web Browser)

## Configuration

- Database
  - Create a new schema by executing the below query
  - CREATE DATABASE kickstarters;

- Backend
  - Open the following files and make the changes:

    - /kickstarters/profile-service/src/main/resources/application.yml
        spring:
          datasource:
          url: jdbc:mysql://localhost:{port}/kickstarters
          username: {username}
          password: {password}

    - /kickstarters/job-service/src/main/resources/application.yml
        spring:
          datasource:
            url: jdbc:mysql://localhost:{port}/kickstarters
            username: {username}
            password: {password}

## Running the Application

- Frontend
  - Import the project into VS Code
  - Use the following command to start the service in local:
    - npm install
    - npm start

- Backend
  - Import the projects into Eclipse
  - Use the IDE to start the services. (Note: use this order to start ne by one)
    - service-registry
    - gateway-service
    - profile-service
    - job-service

- Web Page
  - Once the services started successfully.
  - Use a web browser (Chrome) and type the url http://localhost:3000 and enter