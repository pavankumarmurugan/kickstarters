import { Modal } from "antd";
import React, { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import "./Profile.css";
import { ToastContainer } from "react-toastify";
import { userSpecificToken } from "../GenericCode/GenericCode";
import {
  showToastError,
  showToastSuccess,
} from "../GenericToaster/GenericToaster";
import { emailRegex, numericRegex } from "../GenericRegex/GenericRegex";

function Profile(props) {
  /**useStates */
  let getToken = userSpecificToken();
  const [disabled, setDisabled] = useState(true);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });

  const [profileData, setProfileData] = useState({
    userFirstName: "",
    userLastName: "",
    userEmail: "",
    employerMobileNo: "",
    jobSeekerMobileNo: "",
    employerLocation: "",
    jobSeekerLocation: "",
    jobSeekerExperienceList: [],
    jobSeekerSkillList: [],
    userId: 0,
  });
  const [experienceListObj, setExperienceListObj] = useState({
    jobExperienceTitle: "",
    jobExperienceDescription: "",
    jobExperienceDuration: "",
  });
  const [skillListObj, setSkillsListObj] = useState({
    skillTitle: "",
  });
  /**useStates */

  /**modal */
  const draggleRef = useRef(null);
  /** modal open function */
  const handleOk = async (e) => {
    let obj = {};
    let url = "";
    if (getToken?.userRole === "EMPLOYER") {
      obj = {
        employerMobileNo: profileData.employerMobileNo,
        employerLocation: profileData.employerLocation,
        userId: profileData.userId,
      };
      url = "http://localhost:8080/api/v1/auth/profile/updateEmployerProfile";
    } else {
      obj = {
        userFirstName: profileData?.userFirstName,
        userLastName: profileData?.userLastName,
        userEmail: profileData?.userEmail,
        jobSeekerMobileNo: profileData?.jobSeekerMobileNo,
        jobSeekerLocation: profileData?.jobSeekerLocation,
        userId: profileData?.userId,
        jobSeekerExperienceList: profileData?.jobSeekerExperienceList,
        jobSeekerSkillList: profileData?.jobSeekerSkillList,
      };
      url = "http://localhost:8080/api/v1/auth/profile/updateJobSeekerProfile";
    }

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
        if (
          data?.message === "Employer profile updated successfully" ||
          data?.message === "Job seeker profile updated successfully"
        ) {
          showToastSuccess(data?.message);
          setTimeout(() => {
            handleCancel();
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

  /** fields handlechange */

  const handleChange = (e) => {
    debugger;
    const name = e.target.name;
    const value = e.target.value;

    if (value !== null && value !== undefined) {
      if (name === "employerMobileNo" || name === "jobSeekerMobileNo") {
        if (numericRegex.test(value)) {
          setProfileData((prevState) => ({
            ...prevState,
            [name]: value,
          }));
        }
      } else {
        setProfileData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
    }
  };

  const handleChangeForEmployee = (e) => {
    debugger;
    const name = e.target.name;
    const value = e.target.value;

    if (value !== undefined && value !== null) {
      if (name === "jobSeekerLocation" || name === "jobSeekerMobileNo") {
        const regexForAlphabets = /^[A-Za-z]+$/;
        let updatedValue = regexForAlphabets.test(value) && value;
        setProfileData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      } else {
        setExperienceListObj((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
    }
  };

  const handleBlurForEmployee = (e) => {
    debugger;
    const name = e.target.name;
    const value = e.target.value;
    if (value !== undefined && value !== null) {
      setExperienceListObj((prevObj) => ({
        ...prevObj,
        [name]: value.trim(),
      }));
    }
  };

  const handleChangeForSkills = (e) => {
    debugger;
    const name = e.target.name;
    const value = e.target.value;

    if (value !== undefined && value !== null) {
      setSkillsListObj((prevObj) => ({
        ...prevObj,
        [name]: value.trim(),
      }));
    }
  };

  const handleBlurForSkills = (e) => {
    debugger;
    const name = e.target.name;
    const value = e.target.value;
    if (value !== undefined && value !== null) {
      setSkillsListObj((prevObj) => ({
        ...prevObj,
        [name]: value.trim(),
      }));
    }
  };

  const addSkills = (e) => {
    debugger;
    const hasEmpty = hasEmptyValues(skillListObj);
    if (hasEmpty) {
      return false;
    }
    if (
      profileData?.jobSeekerSkillList === null ||
      profileData?.jobSeekerSkillList === undefined
    ) {
      setProfileData((prevData) => ({
        ...prevData,
        jobSeekerSkillList: [skillListObj],
      }));
      setSkillsListObj((prevData) => ({
        ...prevData,
        skillTitle: "",
      }));
    } else {
      setProfileData((prevData) => ({
        ...prevData,
        jobSeekerSkillList: [...prevData.jobSeekerSkillList, skillListObj],
      }));
      setSkillsListObj((prevData) => ({
        ...prevData,
        skillTitle: "",
      }));
    }
  };

  function hasEmptyValues(obj) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] === "") {
        return true; // Found an empty value
      }
    }
    return false; // No empty values found
  }

  const addExp = () => {
    debugger;
    const hasEmpty = hasEmptyValues(experienceListObj);
    if (hasEmpty) {
      return false;
    }
    if (
      profileData?.jobSeekerExperienceList === null ||
      profileData?.jobSeekerExperienceList === undefined
    ) {
      setProfileData((prevData) => ({
        ...prevData,
        jobSeekerExperienceList: [experienceListObj],
      }));
      setExperienceListObj((prevData) => ({
        ...prevData,
        jobExperienceDuration: "",
        jobExperienceDescription: "",
        jobExperienceTitle: "",
      }));
    } else {
      setProfileData((prevData) => ({
        ...prevData,
        jobSeekerExperienceList: [
          ...prevData.jobSeekerExperienceList,
          experienceListObj,
        ],
      }));
      setExperienceListObj((prevData) => ({
        ...prevData,
        jobExperienceDuration: "",
        jobExperienceDescription: "",
        jobExperienceTitle: "",
      }));
    }
  };

  /** fields handlechange */

  /** useEffect */
  useEffect(() => {
    debugger;
    if (props?.data) setProfileData(props?.data);
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
            {"My Profile"}
          </div>
        }
        style={{ top: 20, maxHeight: "700px" }}
        open={props.isShowModel}
        onOk={handleOk}
        width="60%"
        maskClosable={false}
        onCancel={handleCancel}
        footer={[
          <>
            <input
              type="button"
              value="Add Experience"
              className="custombtndark"
              onClick={addExp}
              hidden={getToken?.userRole === "EMPLOYER"}
            />
            <input
              type="button"
              value="Add Skills"
              className="custombtndark"
              onClick={addSkills}
              hidden={getToken?.userRole === "EMPLOYER"}
            />
            <input
              type="button"
              value="Update"
              className="custombtndark"
              onClick={handleOk}
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
        <div className="postjobs">
          <h2>Personal Details</h2>
          <div className="title-salary">
            <h3>First Name:</h3>
            <input
              style={{ width: "100%" }}
              type="text"
              placeholder="Name"
              className="textfield"
              name="userFirstName"
              maxLength={25}
              value={profileData.userFirstName}
              disabled={true}
            />
            <h3>Last Name:</h3>
            <input
              style={{ width: "100%" }}
              type="text"
              placeholder="Name"
              className="textfield"
              name="userLastName"
              maxLength={25}
              value={profileData.userLastName}
              disabled={true}
            />
            <h3>Email:</h3>
            <input
              style={{ width: "100%" }}
              type="text"
              placeholder="Email"
              className="textfield"
              maxLength={25}
              name="userEmail"
              value={profileData.userEmail}
              disabled={true}
            />
          </div>
          <h3>Phone Number:</h3>
          <input
            style={{ width: "100%" }}
            type="text"
            placeholder="Phone Numebr"
            className="textfield"
            name={`${
              getToken?.userRole === "EMPLOYER"
                ? "employerMobileNo"
                : "jobSeekerMobileNo"
            }`}
            maxLength={10}
            value={
              getToken?.userRole === "EMPLOYER"
                ? profileData.employerMobileNo
                : profileData?.jobSeekerMobileNo
            }
            onChange={handleChange}
          />
          <h3>Location:</h3>
          <input
            style={{ width: "100%" }}
            type="text"
            placeholder="Location"
            className="textfield"
            name={`${
              getToken?.userRole === "EMPLOYER"
                ? "employerLocation"
                : "jobSeekerLocation"
            }`}
            maxLength={100}
            value={
              getToken?.userRole === "EMPLOYER"
                ? profileData.employerLocation
                : profileData.jobSeekerLocation
            }
            onChange={handleChange}
          />
          {getToken?.userRole !== "EMPLOYER" && (
            <>
              <h2>Experience:</h2>
              <h3>Title:</h3>
              <div className="experience-section">
                <input
                  style={{ width: "100%" }}
                  type="text"
                  placeholder="Experience Title"
                  className="textfield"
                  name="jobExperienceTitle"
                  maxLength={100}
                  value={experienceListObj?.jobExperienceTitle}
                  onChange={handleChangeForEmployee}
                  onBlur={handleBlurForEmployee}
                />
              </div>
              <h3>Description:</h3>
              <div className="experience-section">
                <input
                  style={{ width: "100%" }}
                  type="text"
                  placeholder="Experience Description"
                  className="textfield"
                  name="jobExperienceDescription"
                  maxLength={100}
                  value={experienceListObj?.jobExperienceDescription}
                  onChange={handleChangeForEmployee}
                  onBlur={handleBlurForEmployee}
                />
              </div>
              <h3>Duration:</h3>
              <div className="experience-section">
                <input
                  style={{ width: "100%" }}
                  type="text"
                  placeholder="Experience Duration"
                  className="textfield"
                  name="jobExperienceDuration"
                  maxLength={100}
                  value={experienceListObj?.jobExperienceDuration}
                  onChange={handleChangeForEmployee}
                  onBlur={handleBlurForEmployee}
                />
              </div>
              <h3>Skills:</h3>
              <div className="experience-section">
                <input
                  style={{ width: "100%" }}
                  type="text"
                  placeholder="Skills"
                  className="textfield"
                  name="skillTitle"
                  maxLength={100}
                  value={skillListObj?.skillTitle}
                  onChange={handleChangeForSkills}
                  onBlur={handleBlurForSkills}
                />
              </div>
              {profileData?.jobSeekerExperienceList?.length > 0 && (
                <h2 style={{ marginTop: "5px" }}>Experience</h2>
              )}
              {profileData?.jobSeekerExperienceList?.map((item, index) => (
                <li key={index}>
                  <h4>
                    {index + 1}. {item.jobExperienceTitle}
                  </h4>
                  <ul>
                    <h4>
                      <li>{item.jobExperienceDescription}</li>
                    </h4>
                    <h4>
                      <li>{item.jobExperienceDuration}</li>
                    </h4>
                  </ul>
                </li>
              ))}
              {profileData?.jobSeekerSkillList?.length > 0 && (
                <h2 style={{ marginTop: "5px" }}>Skills</h2>
              )}
              {profileData?.jobSeekerSkillList?.map((item, index) => (
                <li key={index}>
                  <h4>
                    {index + 1}. {item.skillTitle}
                  </h4>
                </li>
              ))}
            </>
          )}
        </div>
      </Modal>
    </>
  );
}

export default Profile;
