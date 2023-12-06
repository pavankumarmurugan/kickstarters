import { Modal } from "antd";
import React, { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import "./ViewPost.css";
import { ToastContainer } from "react-toastify";
import { userSpecificToken } from "../GenericCode/GenericCode";
import {
  showToastError,
  showToastSuccess,
} from "../GenericToaster/GenericToaster";

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
    jobId: 0,
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

  /** apply function */

  const handleApply = async () => {
    debugger;
    if (getToken === undefined) {
      showToastError("You need to login first.");
      return false;
    }
    const response = await fetch(
      `http://localhost:8080/api/v1/job/service/applyJob?jobId=${jobDetails.jobId}`,
      {
        method: "POST",
        headers: {
          "Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          Authorization: `${"Bearer "}${getToken?.token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data?.message === "Job applied successfully") {
          showToastSuccess(data?.message);
          setTimeout(() => {
            handleCancel();
          }, [1000]);
        } else {
          showToastError(data?.message);
        }
      })
      .catch((err) => {
        showToastError(err);
        console.log(err);
      });
  };

  /** apply function */

  const handleApprove = async (e) => {
    debugger;

    const obj = {
      jobId: props?.data?.candidateDetails?.jobId,
      jobSeekerId: props?.data?.candidateDetails?.userId,
      candidateStatus: e === "app" ? "Accepted" : "Rejected",
    };
    const url =
      e === "app"
        ? "http://localhost:8080/api/v1/job/service/updateCandidateStatus"
        : "http://localhost:8080/api/v1/job/service/updateCandidateStatus";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: `${"Bearer "}${getToken?.token}`,
      },
      body: JSON.stringify(obj),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Candidate status updated successfully") {
          showToastSuccess("Api Called Successfully.");
          setTimeout(() => {
            window.location.reload(false);
          }, [1000]);
        } else {
          showToastError(data?.message);
        }
      })
      .catch((err) => {
        showToastError(err);
        console.log(err);
      });
  };

  const handleCancelApplication = async () => {
    const response = await fetch(
      `http://localhost:8080/api/v1/job/service/cancelApplication?jobId=${jobDetails.jobId}`,
      {
        method: "POST",
        headers: {
          "Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          Authorization: `${"Bearer "}${getToken?.token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data?.message === "Application Cancelled successfully") {
          showToastSuccess(data?.message);
          setTimeout(() => {
            window.location.reload(false);
          }, [1000]);
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
            {props?.from === "NewPost" &&
            props?.comingfrom !== "jobseekerAlJobsApplied" ? (
              <input
                type="button"
                value="Apply"
                className="custombtndark"
                onClick={handleApply}
              />
            ) : props?.comingfrom === "jobseekerAlJobsApplied" ? (
              <>
                {props?.data?.jobApplicationStatus === "Applied" ? (
                  <input
                    type="button"
                    value={
                      props?.data?.jobApplicationStatus === "Applied" &&
                      "Cancel Application"
                    }
                    className="custombtndark"
                    onClick={handleCancelApplication}
                  />
                ) : (
                  <input
                    type="button"
                    value="Application Cancelled"
                    className="custombtndark"
                    disabled={true}
                  />
                )}
              </>
            ) : (
              <>
                <input
                  type="button"
                  value={
                    props?.data.candidateStatus === "Accepted"
                      ? "Approved"
                      : "Approve"
                  }
                  className="custombtndark"
                  onClick={() => {
                    handleApprove("app");
                  }}
                  disabled={
                    props?.data.candidateStatus === "Accepted" ? true : false
                  }
                />
                <input
                  type="button"
                  value={
                    props?.data.candidateStatus === "Rejected"
                      ? "Rejected"
                      : "Reject"
                  }
                  disabled={
                    props?.data.candidateStatus === "Rejected" ? true : false
                  }
                  className="custombtndark"
                  onClick={() => {
                    handleApprove("rej");
                  }}
                />
              </>
            )}
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
        {props?.from === "NewPost" ? (
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
              <div
                className="header-logos-left"
                style={{ marginBottom: "10px" }}
              >
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
        ) : (
          <div className="ViewPost-main">
            <div className="ViewPost-header">
              <h1 className="viewPost-Title">
                {props?.data?.candidateDetails?.userFirstName}{" "}
                {props?.data?.candidateDetails?.userLastName}
              </h1>
              <div className="header-logos-left">
                <div className="header-logos-right">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="16"
                    width="16"
                    viewBox="0 0 512 512"
                    style={{ fill: "#01959a" }}
                  >
                    <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                  </svg>
                </div>
                {props?.data?.candidateDetails?.userEmail}
              </div>
              <div
                className="header-logos-left"
                style={{ marginBottom: "10px" }}
              >
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
                {props?.data?.candidateDetails?.jobSeekerLocation}
              </div>
              <div
                className="header-logos-left"
                style={{ marginBottom: "10px" }}
              >
                <div className="header-logos-right">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="16"
                    width="16"
                    viewBox="0 0 512 512"
                    style={{ fill: "#01959a" }}
                  >
                    <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
                  </svg>
                </div>
                {props?.data?.candidateDetails?.jobSeekerMobileNo}
              </div>
            </div>

            <hr></hr>

            <div className="ViewPost-mainBody">
              <div className="ViewPost-Deatils">
                <h2 className="headings">Job Experience</h2>
                {props?.data?.candidateDetails?.jobSeekerExperienceList?.map(
                  (item, index) => (
                    <li key={index}>
                      <h4>
                        {index + 1}. {item.jobExperienceTitle}
                      </h4>
                      <ul>
                        <p>
                          <b>Description:</b> {item.jobExperienceDescription}
                        </p>
                        <p>
                          <b>Duration:</b> {item.jobExperienceDuration}
                        </p>
                      </ul>
                    </li>
                  )
                )}
                <p>{jobDetails?.jobDesc}</p>
              </div>
              <div className="ViewPost-Deatils">
                <h2 className="headings">Skills</h2>
                {props?.data?.candidateDetails?.jobSeekerSkillList?.map(
                  (item, index) => (
                    <li key={index}>
                      <p>
                        {index + 1}. {item.skillTitle}
                      </p>
                      {/* <ul>
                        <p>
                          <b>Description:</b> {item.jobExperienceDescription}
                        </p>
                        <p>
                          <b>Duration:</b> {item.jobExperienceDuration}
                        </p>
                      </ul> */}
                    </li>
                  )
                )}
                <p>{jobDetails?.jobDesc}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}

export default ViewPost;
