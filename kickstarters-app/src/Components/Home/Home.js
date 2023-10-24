import React from "react";
import DynamicMainPage from "../DynamicMainPage/DynamicMainPage";
import AboutUs from "../AboutUs/AboutUs";
import FeaturedJobs from "../FeaturedJobs/FeaturedJobs";
import Footer from "../Footer/Footer";

function HomePage() {
  return (
    <div>
      <DynamicMainPage
        cName="dynamicMain"
        image="https://plus.unsplash.com/premium_photo-1678917827802-721b5f5b4bf0?auto=format&fit=crop&q=80&w=1740&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        title="BUILD YOUR POWERFUL CAREER"
        text="when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to"
        btnClass="search-btn"
        showbtn={true}
      />
      <AboutUs />
      <FeaturedJobs />
      <Footer />
    </div>
  );
}

export default HomePage;
