import React from "react";
import "./FeaturedJobsData";
import "./FeaturedJobs.css";
import FeaturedData from "./FeaturedJobsData";

function FeaturedJobs(props) {
  return (
    <div className="featuredjobs-main">
      <h1>{props?.heading}</h1>
      <div className="featuredjobscard">
        {props.data.map((item, index) => (
          <FeaturedData key={index} data={item} />
        ))}
      </div>
    </div>
  );
}

export default FeaturedJobs;
