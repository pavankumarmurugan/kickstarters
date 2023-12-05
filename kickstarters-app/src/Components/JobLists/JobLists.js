import React, { useState, useEffect } from "react";
import "./JobLists.css";
import FeaturedData from "../FeaturedJobs/FeaturedJobsData";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useLocation } from "react-router-dom";
import { Pagination } from "antd";
import {
  showToastError,
  showToastSuccess,
} from "../GenericToaster/GenericToaster";
import { ToastContainer } from "react-toastify";

function JobLists() {
  const location = useLocation();
  let { state } = location;
  const [data, setData] = useState(state);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);
  const [currentPosts, setCurrentPosts] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  let pages = [];
  for (let i = 1; i <= Math.ceil(data?.length / postsPerPage); i++) {
    pages.push(i);
  }
  const aa = pages.length;

  const handleChange = (e) => {
    debugger;
    setCurrentPage(e);
  };

  const onChangeInput = (e) => {
    debugger;
    const value = e.target.value;
    if (value !== undefined && value !== null) {
      const regexForNumAndAlp = /^[a-zA-Z0-9]+$/;
      if (regexForNumAndAlp.test(value)) {
        setSearchInput(value);
      } else if (value === "") {
        setSearchInput(value);
      }
    }
  };

  const searchButton = async () => {
    debugger;
    if (searchInput === "") {
      return false;
    }
    const response = await fetch(
      `http://localhost:8080/api/v1/job/service/jobseekerJobSearch?jobTitle=${searchInput}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data !== null && data !== undefined && data.length > 0) {
          showToastSuccess("Api Called Successfully.");
          setTimeout(() => {
            // state = data;
            setData(data);
          }, [1000]);
        } else {
          showToastError(`No Jobs available for ${searchInput}.`);
        }
      })
      .catch((err) => {
        showToastError(err);
        console.log(err);
      });
  };

  useEffect(() => {
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPostsss = data?.slice(firstPostIndex, lastPostIndex);
    setCurrentPosts(currentPostsss);
  }, [currentPage]);

  return (
    <>
      <ToastContainer />
      <Navbar />
      <div className="joblists-main">
        <div className="joblist-search"></div>
        <div className="joblist-maincard">
          <input
            type="text"
            placeholder="Search"
            className="search_textfield"
            onChange={onChangeInput}
          />
          <button className="search-btn" onClick={searchButton}>
            Search
          </button>
          <h1>Searched jobs</h1>
          <div className="cards">
            {data?.map((item, index) => (
              <FeaturedData wholeData={data} key={index} data={item} />
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
        <Footer />
      </div>
    </>
  );
}

export default JobLists;
