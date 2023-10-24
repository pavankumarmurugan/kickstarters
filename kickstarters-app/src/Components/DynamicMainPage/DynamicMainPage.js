import React from "react";
import "./DynamicMainPage.css";

function DynamicMainPage(props) {
  return (
    <div className={props?.cName}>
      <img src={props?.image} alt="heroImg" />
      <div className="dynamicMain-text">
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
      </div>
    </div>
  );
}

export default DynamicMainPage;
