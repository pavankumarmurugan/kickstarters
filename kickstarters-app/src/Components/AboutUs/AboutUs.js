import React from "react";
import aboutusimg1 from "../../assets/aboutusimg1.avif";
import aboutusimg2 from "../../assets/aboutusimg2.avif";
import "./AboutUs.css";

function AboutUs() {
  return (
    <div className="aboutus-main">
      <h1>About Us</h1>
      <div className="first-des">
        <div className="des-text">
          {/* <h2>About Us</h2> */}
          <p>
            Normal distribution of letters, as opposed to using 'Content here,
            content here', making it look like readable English. Many desktop
            publishing packages and web page editors has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English. Many desktop publishing
            packages and web page editors
          </p>
        </div>
        <div className="aboutusimage">
          <img alt="aboutUs" src={aboutusimg1} />
          <img alt="aboutUs" src={aboutusimg2} />
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
