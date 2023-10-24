import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="top">
        <div>
          <h1>KickStarters</h1>
          <p>Build your powerful career</p>
        </div>
        <div>
          <a href="/">
            <i className="fab fa-facebook-square"></i>
          </a>
          <a href="/">
            <i className="fab fa-instagram-square"></i>
          </a>
          <a href="/">
            <i className="fab fa-twitter-square"></i>
          </a>
        </div>
      </div>
      <div className="bottom">
        <div>
          <h4>KickStarters</h4>
          <a href="/">About us</a>
          <a href="/">Privacy policy</a>
          <a href="/">Terms and conditions</a>
          <a href="/">Work for us</a>
        </div>
        <div>
          <h4>Jobseeker</h4>
          <a href="/">Jobseeker login</a>
          <a href="/">Contact us - jobseeker</a>
          <a href="/">Help</a>
        </div>
        <div>
          <h4>Recruiter</h4>
          <a href="/">Advertise a job</a>
          <a href="/">Contact us - recruiter</a>
          <a href="/">Terms and conditions</a>
          <a href="/">Work for us</a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
