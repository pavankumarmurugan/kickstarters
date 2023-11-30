import React from "react";
import "./JobLists.css";
import FeaturedData from "../FeaturedJobs/FeaturedJobsData";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

function JobLists() {
  return (
    <>
      {/* <Navbar /> */}
      <div className="joblists-main">
        <div className="joblist-search"></div>
        <div className="joblist-maincard">
          <input
            type="text"
            placeholder="Search"
            className="search_textfield"
          />
          <button className="search-btn">Search</button>
          <h1>Searched jobs</h1>
          <div className="cards">
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
            <FeaturedData
              image="https://images.unsplash.com/photo-1653389522479-ccaa5fb2ab2b?auto=format&fit=crop&q=80&w=1724&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              heading="Jaguar"
              text1="Manager"
              text2="Lorem ipsum dolor sit amet, non odio tincidunt ut ante, lorem a euismod suspendisse vel, sed quam nulla mauris iaculis."
            />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default JobLists;
