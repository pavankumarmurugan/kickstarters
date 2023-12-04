import React, { useEffect, useState } from "react";
import "./FeaturedJobsData";
import "./FeaturedJobs.css";
import FeaturedData from "./FeaturedJobsData";
import { Pagination } from "antd";

function FeaturedJobs(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(9);
  const [currentPosts, setCurrentPosts] = useState([]);
  useEffect(() => {
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPostsss = props?.data.slice(firstPostIndex, lastPostIndex);
    setCurrentPosts(currentPostsss);
  }, [currentPage]);
  let pages = [];
  for (let i = 1; i <= Math.ceil(props?.data?.length / postsPerPage); i++) {
    pages.push(i);
  }
  const aa = pages.length;

  const handleChange = (e) => {
    debugger;
    setCurrentPage(e);
  };

  return (
    <div className="featuredjobs-main">
      <h1>{props?.heading}</h1>
      <div className="featuredjobscard">
        {currentPosts.map((item, index) => (
          <FeaturedData wholeData={currentPosts} key={index} data={item} />
        ))}
        <div className="pagination-main">
          <Pagination
            current={currentPage}
            total={aa * 9}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}

export default FeaturedJobs;
