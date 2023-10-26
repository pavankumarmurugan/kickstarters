import React from "react";
import "./DynamicMainPage.css";

function DynamicMainPage(props) {
  return (
    <div className={props?.cName}>
      <img src={props?.image} alt="heroImg" />
      <div className="dynamicMain-text">
        {/** this section is for users home page */}
        <h1>{props?.title}</h1>
        <p>{props?.text}</p>
        {props?.showbtn && (
          <>
            <input
              type="text"
              placeholder="Search"
              className="search_textfield"
            />
            <button className={props?.btnClass}>Search</button>
          </>
        )}
        {/** this section is for users home page */}
        {/** this section is for Recruiter home page */}
        {/* <button className={props?.btnClass}>Advertise job now</button> */}
        {/** this section is for Recruiter home page */}
      </div>
    </div>
  );
}

export default DynamicMainPage;
