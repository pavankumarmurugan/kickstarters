import { Button, Modal } from "antd";
import { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import "./AdvertiseJob.css";
import { InputAdornment } from "@mui/material";
import { userSpecificToken } from "../GenericCode/GenericCode";
import {
  showToastError,
  showToastSuccess,
} from "../GenericToaster/GenericToaster";
import { ToastContainer } from "react-toastify";

function AdvertiseJobsModal(props) {
  let getToken = userSpecificToken();
  const [disabled, setDisabled] = useState(true);
  const [postFormData, setPostFormData] = useState({
    jobTitle: "",
    jobDesc: "",
    jobSalary: 0,
    jobDuration: "",
    jobLocation: "",
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
  const draggleRef = useRef(null);
  /** modal open function */
  const handleOk = (e) => {
    props?.okModalFunction(postFormData);
  };
  /** modal close function */
  const handleCancel = (e) => {
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

  /** handle change */

  /** useEffect */

  useEffect(() => {
    /** this is for update posted job */
    debugger;
    if (props?.data !== null) {
      setPostFormData(props?.data);
    }
  }, []);

  /** useEffect */

  const handleChange = (e) => {
    debugger;
    const name = e.target.name;
    const value = e.target.value;
    if (value !== null && value !== undefined) {
      if (name === "jobSalary") {
        setPostFormData((prevState) => ({
          ...prevState,
          [name]: Number(value),
        }));
      } else {
        setPostFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
    }
  };

  /** handle change */

  /** close job function */

  const handleCloseJob = async () => {
    debugger;
    const response = await fetch(
      `http://localhost:8080/api/v1/job/service/closeJob?jobId=${postFormData?.jobId}`,
      {
        method: "POST",
        headers: {
          "Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          Authorization: `${"Bearer "}${getToken?.token}`,
        },
        body: JSON.stringify(postFormData),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data !== null && data !== undefined) {
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

  /** close job function */

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
            {props?.from === "NewPost" ? "Post Job" : "Update Job"}
          </div>
        }
        style={{ top: 20, maxHeight: "700px" }}
        open={props.isShowModel}
        onOk={handleOk}
        width="70%"
        maskClosable={false}
        onCancel={handleCancel}
        footer={[
          <>
            <input
              type="button"
              value={props?.from === "NewPost" ? "Post Job" : "Update Job"}
              className="custombtndark"
              onClick={handleOk}
            />
            {props?.from !== "NewPost" && (
              <input
                type="button"
                value="Close Job"
                className="custombtndark"
                onClick={handleCloseJob}
              />
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
        <div className="postjobs">
          <div className="title-salary">
            <h3>Title:</h3>
            <input
              style={{ width: "100%" }}
              type="text"
              placeholder="Title"
              className="textfield"
              name="jobTitle"
              maxLength={25}
              value={postFormData.jobTitle}
              onChange={handleChange}
            />
            <h3>Job Description:</h3>
            <input
              style={{ width: "100%" }}
              type="text"
              placeholder="Description"
              className="textfield"
              maxLength={10000}
              name="jobDesc"
              value={postFormData.jobDesc}
              onChange={handleChange}
            />
          </div>
          <h3>Experience:</h3>
          <input
            style={{ width: "100%" }}
            type="text"
            placeholder="Experience"
            className="textfield"
            name="jobWorkExperience"
            maxLength={255}
            value={postFormData.jobWorkExperience}
            onChange={handleChange}
          />
          <h3>Skills:</h3>
          <input
            style={{ width: "100%" }}
            type="text"
            placeholder="Skills"
            className="textfield"
            name="jobSkill"
            maxLength={255}
            value={postFormData.jobSkill}
            onChange={handleChange}
          />
          <h3>Job Duration:</h3>
          <input
            style={{ width: "100%" }}
            type="text"
            placeholder="Duration"
            className="textfield"
            name="jobDuration"
            maxLength={255}
            value={postFormData.jobDuration}
            onChange={handleChange}
          />
          <h3>Location:</h3>
          <input
            style={{ width: "100%" }}
            type="text"
            placeholder="Location"
            className="textfield"
            name="jobLocation"
            maxLength={255}
            value={postFormData.jobLocation}
            onChange={handleChange}
          />
          <h3>Salary:</h3>
          <input
            style={{ width: "100%" }}
            type="number"
            placeholder="Salary"
            className="textfield"
            name="jobSalary"
            maxLength={10}
            value={postFormData.jobSalary}
            onChange={handleChange}
          />
        </div>
      </Modal>
    </>
  );
}
export default AdvertiseJobsModal;
