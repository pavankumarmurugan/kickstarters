import React, { useEffect, useState } from "react";
import DynamicMainPage from "../DynamicMainPage/DynamicMainPage";
import AboutUs from "../AboutUs/AboutUs";
import FeaturedJobs from "../FeaturedJobs/FeaturedJobs";
import Navbar from "../Navbar/Navbar";
import { userSpecificToken } from "../GenericCode/GenericCode";
import { showToastError } from "../GenericToaster/GenericToaster";

function HomePage() {
  let getToken = userSpecificToken();
  const [homepageJobsData, setHomepageJobsData] = useState([]);
  const [featuredjobsHeading, setFeaturedjobsHeading] = useState();

  /** home data api */
  useEffect(() => {
    if (
      getToken?.userRole === "JOBSEEKER" ||
      getToken?.userRole === undefined
    ) {
      setFeaturedjobsHeading("Jobs");
    } else {
      setFeaturedjobsHeading("Posted Jobs");
    }
    callHomeApi();
  }, []);

  const callHomeApi = async () => {
    let url = "";
    let headerObj = {};
    if (
      getToken?.userRole === "JOBSEEKER" ||
      getToken?.userRole === undefined
    ) {
      url = "http://localhost:8080/api/v1/job/service/allJobsForHomepage";
      headerObj = {};
    } else {
      headerObj = {
        headers: {
          Authorization: `${"Bearer "}${getToken?.token}`,
        },
      };
      url = "http://localhost:8080/api/v1/job/service/allPostedJobUser";
    }
    const response = await fetch(url, headerObj)
      .then((response) => response.json())
      .then((data) => {
        if (data?.length) {
          setHomepageJobsData(data);
        } else {
          showToastError(data?.message);
        }
      })
      .catch((err) => {
        showToastError(err);
        console.log(err);
      });
  };

  return (
    <div>
      <Navbar />
      <DynamicMainPage
        cName="dynamicMain"
        image="https://plus.unsplash.com/premium_photo-1678917827802-721b5f5b4bf0?auto=format&fit=crop&q=80&w=1740&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        title="BUILD YOUR POWERFUL CAREER"
        btnClass="search-btn"
        showbtn={true}
      />
      {homepageJobsData?.length > 0 && (
        <FeaturedJobs data={homepageJobsData} heading={featuredjobsHeading} />
      )}
      <AboutUs />
    </div>
  );
}

export default HomePage;
