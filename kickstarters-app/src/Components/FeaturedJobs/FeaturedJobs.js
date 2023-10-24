import React from "react";
import "./FeaturedJobsData";
import "./FeaturedJobs.css";
import FeaturedData from "./FeaturedJobsData";

function FeaturedJobs() {
  return (
    <div className="featuredjobs-main">
      <h1>Recent & Featured jobs</h1>
      <h3>Featured Jobs</h3>
      <div className="featuredjobscard">
        <FeaturedData
          image="https://images.unsplash.com/photo-1653389522479-ccaa5fb2ab2b?auto=format&fit=crop&q=80&w=1724&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          heading="Jaguar"
          text1="Manager"
          text2="Lorem ipsum dolor sit amet, non odio tincidunt ut ante, lorem a euismod suspendisse vel, sed quam nulla mauris iaculis."
        />
      </div>

      <h3>Recent Jobs</h3>
      <div className="featuredjobscard">
        <FeaturedData
          image="https://images.unsplash.com/photo-1653389522479-ccaa5fb2ab2b?auto=format&fit=crop&q=80&w=1724&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          heading="Jaguar"
          text1="Manager"
          text2="Lorem ipsum dolor sit amet, non odio tincidunt ut ante, lorem a euismod suspendisse vel, sed quam nulla mauris iaculis."
        />
        <FeaturedData
          image="https://images.unsplash.com/photo-1653389522479-ccaa5fb2ab2b?auto=format&fit=crop&q=80&w=1724&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          heading="Jaguar"
          text1="Manager"
          text2="Lorem ipsum dolor sit amet, non odio tincidunt ut ante, lorem a euismod suspendisse vel, sed quam nulla mauris iaculis."
        />
        <FeaturedData
          image="https://images.unsplash.com/photo-1653389522479-ccaa5fb2ab2b?auto=format&fit=crop&q=80&w=1724&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          heading="Jaguar"
          text1="Manager"
          text2="Lorem ipsum dolor sit amet, non odio tincidunt ut ante, lorem a euismod suspendisse vel, sed quam nulla mauris iaculis."
        />
      </div>
    </div>
  );
}

export default FeaturedJobs;
