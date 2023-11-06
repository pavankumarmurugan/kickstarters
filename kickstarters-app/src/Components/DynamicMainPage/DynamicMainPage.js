import React, { useEffect, useState } from "react";
import "./DynamicMainPage.css";
import AdvertiseJobsModal from "../AdvertiseJob/AdvertiseJob";
import { userSpecificToken } from "../GenericCode/GenericCode";
import {
  showToastError,
  showToastSuccess,
} from "../GenericToaster/GenericToaster";

function DynamicMainPage(props) {
  /** usestates */
  let getToken = userSpecificToken();
  const [openModal, setOpenModal] = useState(false);
  const [user, setUser] = useState(false);
  /** usestates */
  /** modal functions */
  const openAdvertiseModal = () => {
    setOpenModal(true);
  };
  const closeModalFunction = () => {
    setOpenModal(false);
  };
  const okModalFunction = async (postjobData) => {
    debugger;
    const response = await fetch(
      "http://localhost:8080/api/v1/job/service/postJob",
      {
        method: "POST",
        headers: {
          "Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          Authorization: `${"Bearer "}${getToken?.token}`,
        },
        body: JSON.stringify(postjobData),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data?.message === "Job posted successfully") {
          setOpenModal(false);
          showToastSuccess(data?.message);
          setTimeout(() => {
            window.location.reload(false);
          }, 1000);
        } else {
          showToastError(data?.message);
        }
      })
      .catch((err) => {
        showToastError(err);
        console.log(err);
      });
  };
  /** modal functions */

  /** useEffects */
  useEffect(() => {
    debugger;
    let userDetails = userSpecificToken();
    if (userDetails?.userRole === "EMPLOYER") {
      setUser(true);
    } else {
      setUser(false);
    }
  }, []);
  /** useEffects */

  return (
    <div className={props?.cName}>
      {/** advertise job modal */}
      {openModal && (
        <AdvertiseJobsModal
          isShowModel={openModal}
          closeModal={closeModalFunction}
          okModalFunction={okModalFunction}
          from="NewPost"
          data={null}
        />
      )}
      {/** advertise job modal */}
      {/** home main screen image and job search field section */}
      <img src={props?.image} alt="heroImg" />
      <div className="dynamicMain-text">
        {!user ? (
          <>
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
          </>
        ) : (
          <>
            {/** this section is for Recruiter home page */}
            <button className={props?.btnClass} onClick={openAdvertiseModal}>
              Advertise job now
            </button>
            {/** this section is for Recruiter home page */}
          </>
        )}
        {/** home main screen image and job search field section */}
      </div>
    </div>
  );
}

export default DynamicMainPage;
