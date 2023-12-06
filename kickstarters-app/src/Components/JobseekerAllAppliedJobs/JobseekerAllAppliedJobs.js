import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { Pagination } from "antd";
import Footer from "../Footer/Footer";
import { userSpecificToken } from "../GenericCode/GenericCode";
import {
  showToastError,
  showToastSuccess,
} from "../GenericToaster/GenericToaster";
import FeaturedData from "../FeaturedJobs/FeaturedJobsData";

function JobseekerAllAppliedJobs() {
  let getToken = userSpecificToken();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);
  const [currentPosts, setCurrentPosts] = useState([]);
  const [data, setData] = useState([]);
  let pages = [];
  for (let i = 1; i <= Math.ceil(data?.length / postsPerPage); i++) {
    pages.push(i);
  }
  const aa = pages.length;

  const handleChange = (e) => {
    debugger;
    setCurrentPage(e);
  };

  const getAllAppliedJobs = async () => {
    debugger;
    const response = await fetch(
      "http://localhost:8080/api/v1/job/service/jobseekerAllAppliedJobs",
      {
        headers: {
          "Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          Authorization: `${"Bearer "}${getToken?.token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data !== undefined && data !== null && data?.length > 0) {
          // showToastSuccess("Api called Successfully.");
          setData(data);
        } else {
          showToastError(data?.message);
        }
      })
      .catch((err) => {
        showToastError(err);
        console.log(err);
      });
  };

  useEffect(() => {
    getAllAppliedJobs();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="joblists-main">
        <div className="joblist-search"></div>
        <div className="joblist-maincard">
          <h1>All Applied Jobs</h1>
          <div className="cards">
            {data?.map((item, index) => (
              <FeaturedData
                wholeData={data}
                key={index}
                data={item}
                comingfrom="jobseekerAlJobsApplied"
              />
            ))}
            <div className="pagination-main">
              {/* <Pagination
                current={currentPage}
                total={aa * 8}
                onChange={handleChange}
              /> */}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default JobseekerAllAppliedJobs;
