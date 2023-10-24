import { Route, Router, Routes, Switch } from "react-router-dom";
import HomePage from "./Components/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import Signup from "./Components/SignUp/Signup";
import React, { Fragment } from "react";
import JobLists from "./Components/JobLists/JobLists";

function App() {
  const pathname = window.location.pathname;
  return (
    <div className="App">
      <Fragment>
        {pathname !== "/signup" && <Navbar />}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/jobs" element={<JobLists />} />
        </Routes>
      </Fragment>
    </div>
  );
}

export default App;
