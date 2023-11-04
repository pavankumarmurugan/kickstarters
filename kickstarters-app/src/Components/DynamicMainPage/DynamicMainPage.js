import React, { useState } from "react";
import "./DynamicMainPage.css";
import AdvertiseJobsModal from "../AdvertiseJob/AdvertiseJob";

function DynamicMainPage(props) {
  /** usestates */
  const [openModal, setOpenModal] = useState(false);
  /** usestates */
  /** modal functions */
  const openAdvertiseModal = () => {
    setOpenModal(true);
  };
  const closeModalFunction = () => {
    setOpenModal(false);
  };
  const okModalFunction = () => {
    setOpenModal(false);
    window.location.reload(false);
  };
  /** modal functions */

  return (
    <div className={props?.cName}>
      {/** advertise job modal */}
      {openModal && (
        <AdvertiseJobsModal
          isShowModel={openModal}
          closeModal={closeModalFunction}
          okModalFunction={okModalFunction}
        />
      )}
      {/** advertise job modal */}

      {/** home main screen image and job search field section */}
      <img src={props?.image} alt="heroImg" />
      <div className="dynamicMain-text">
        {/** this section is for users home page */}
        {/* <h1>{props?.title}</h1>
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
        )} */}
        {/** this section is for users home page */}
        {/** this section is for Recruiter home page */}
        <button className={props?.btnClass} onClick={openAdvertiseModal}>
          Advertise job now
        </button>
        {/** this section is for Recruiter home page */}
        {/** home main screen image and job search field section */}
      </div>
    </div>
  );
}

export default DynamicMainPage;
