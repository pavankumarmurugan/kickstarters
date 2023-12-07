import { Route, Router, Routes, Switch } from "react-router-dom";
import HomePage from "./Components/Home/Home";
import Signup from "./Components/SignUp/Signup";
import React, { Fragment } from "react";
import JobLists from "./Components/JobLists/JobLists";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import AboutUs from "./Components/AboutUs/AboutUs";
import JobseekerAllAppliedJobs from "./Components/JobseekerAllAppliedJobs/JobseekerAllAppliedJobs";

function App() {
  const pathname = window.location.pathname;
  console.log(pathname, "pathname");
  return (
    <div className="App">
      <Fragment>
        {/* {pathname !== "/signup" && <Navbar />} */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/jobs" element={<JobLists />} />
          <Route path="/allappliedjobs" element={<JobseekerAllAppliedJobs />} />
        </Routes>
        {/* {pathname !== "/signup" && <Footer />} */}
      </Fragment>
    </div>
  );
}

export default App;
