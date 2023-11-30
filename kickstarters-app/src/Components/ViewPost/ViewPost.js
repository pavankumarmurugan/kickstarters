import { Modal } from "antd";
import React, { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import "./ViewPost.css";
import { ToastContainer } from "react-toastify";
import { userSpecificToken } from "../GenericCode/GenericCode";

function ViewPost(props) {
  /**useStates */
  console.log(props, "sad");
  let getToken = userSpecificToken();
  const [daysPassed, setDaysPassed] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const [jobDetails, setJobDetails] = useState({
    jobTitle: "",
    jobDesc: "",
    jobDuration: "",
    jobLocation: "",
    jobSalary: "",
    jobSkill: "",
    jobWorkExperience: "",
  });
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });

  const [profileData, setProfileData] = useState({
    employerName: "",
    employerEmail: "",
    employerMobileNo: "",
    employerLocation: "",
  });

  /**useStates */

  /**modal */
  const draggleRef = useRef(null);
  /** modal open function */

  /** modal close function */
  const handleCancel = (e) => {
    debugger;
    props?.closeModal();
  };
  const onStart = (_event, uiData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };
  /**modal */

  /** useEffect */
  useEffect(() => {
    debugger;
    setJobDetails(props?.data);
    const givenDateTime = new Date(props?.data.jobPostTime);
    const currentDate = new Date();
    const timeDifference = currentDate - givenDateTime;
    const daysPassed = timeDifference / (1000 * 60 * 60 * 24);
    setDaysPassed(Number(daysPassed).toFixed(0));
  }, []);
  /** useEffect */

  return (
    <>
      <ToastContainer />
      <Modal
        title={
          <div
            style={{
              width: "100%",
              cursor: "move",
              textAlign: "center",
              fontSize: "24px",
            }}
            onMouseOver={() => {
              if (disabled) {
                setDisabled(false);
              }
            }}
            onMouseOut={() => {
              setDisabled(true);
            }}
            onFocus={() => {}}
            onBlur={() => {}}
          >
            {/* {jobDetails.jobTitle} */}
          </div>
        }
        style={{ top: 20, maxHeight: "700px" }}
        open={props.isShowModel}
        // onOk={handleOk}
        width="60%"
        maskClosable={false}
        onCancel={handleCancel}
        footer={[
          <>
            <input
              type="button"
              value="Apply"
              className="custombtndark"
              //   onClick={handleOk}
            />
            <input
              type="button"
              value="Cancel"
              className="custombtndark"
              onClick={handleCancel}
            />
          </>,
        ]}
        modalRender={(modal) => (
          <Draggable
            disabled={disabled}
            bounds={bounds}
            nodeRef={draggleRef}
            onStart={(event, uiData) => onStart(event, uiData)}
          >
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}
      >
        <div className="ViewPost-main">
          <div className="ViewPost-header">
            <h1 className="viewPost-Title">{jobDetails.jobTitle}</h1>
            <div className="header-logos-left">
              <div className="header-logos-right">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="16"
                  width="12"
                  viewBox="0 0 384 512"
                  style={{ fill: "#01959a" }}
                >
                  <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                </svg>
              </div>
              {jobDetails.jobLocation}
            </div>
            <div className="header-logos-left">
              <div className="header-logos-right">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="16"
                  width="10"
                  viewBox="0 0 320 512"
                  style={{ fill: "#01959a" }}
                >
                  <path d="M48.1 240c-.1 2.7-.1 5.3-.1 8v16c0 2.7 0 5.3 .1 8H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H60.3C89.9 419.9 170 480 264 480h24c17.7 0 32-14.3 32-32s-14.3-32-32-32H264c-57.9 0-108.2-32.4-133.9-80H256c17.7 0 32-14.3 32-32s-14.3-32-32-32H112.2c-.1-2.6-.2-5.3-.2-8V248c0-2.7 .1-5.4 .2-8H256c17.7 0 32-14.3 32-32s-14.3-32-32-32H130.1c25.7-47.6 76-80 133.9-80h24c17.7 0 32-14.3 32-32s-14.3-32-32-32H264C170 32 89.9 92.1 60.3 176H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H48.1z" />
                </svg>
              </div>
              &euro;{jobDetails?.jobSalary} per anum
            </div>
            <div className="header-logos-left" style={{ marginBottom: "10px" }}>
              <div className="header-logos-right">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="16"
                  width="14"
                  viewBox="0 0 448 512"
                  style={{ fill: "#01959a" }}
                >
                  <path d="M96 32V64H48C21.5 64 0 85.5 0 112v48H448V112c0-26.5-21.5-48-48-48H352V32c0-17.7-14.3-32-32-32s-32 14.3-32 32V64H160V32c0-17.7-14.3-32-32-32S96 14.3 96 32zM448 192H0V464c0 26.5 21.5 48 48 48H400c26.5 0 48-21.5 48-48V192z" />
                </svg>
              </div>
              Posted {daysPassed} days ago
            </div>
          </div>

          <hr></hr>

          <div className="ViewPost-mainBody">
            <div className="ViewPost-Deatils">
              <h2 className="headings">Job Description</h2>
              <p>{jobDetails?.jobDesc}</p>
            </div>
            <div className="ViewPost-Deatils">
              <h2 className="headings">Skills</h2>
              <p>{jobDetails?.jobSkill}</p>
            </div>
            <div className="ViewPost-Deatils">
              <h2 className="headings">Work Experience</h2>
              <p>{jobDetails?.jobWorkExperience}</p>
            </div>
            <div className="ViewPost-Deatils">
              <h2 className="headings">Job Duration</h2>
              <p>{jobDetails?.jobDuration}</p>
            </div>
            <div className="ViewPost-Deatils">
              <p className="HowToApply">
                <b>
                  If you are interested in this position please apply by
                  clicking on the apply button below.
                </b>
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ViewPost;
