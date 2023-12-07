import { Modal } from "antd";
import React, { useRef, useState } from "react";
import Draggable from "react-draggable";
import { userSpecificToken } from "../GenericCode/GenericCode";
import "./JobAlert.css";

function JobAlert(props) {
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
    Name: "",
    Skills: "",
    Keyword: "",
    Location: "",
  });

  /**useStates */

  /**modal */
  const draggleRef = useRef(null);
  /** modal open function */

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
  /**modal */

  /** fields handlechange */

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (value !== null && value !== undefined) {
      setProfileData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  /** fields handlechange */
  return (
    <>
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
            {"Job Alert"}
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
              value="Alert"
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
        <div className="alertjobs-main">
          {/* <h2>Personal Details</h2> */}
          <div className="title-salary">
            <h3>Name:</h3>
            <input
              style={{ width: "100%" }}
              type="text"
              placeholder="Name"
              className="textfield"
              name="employerName"
              maxLength={25}
              value={profileData.employerName}
              onChange={handleChange}
            />
            <h3>Skills:</h3>
            <input
              style={{ width: "100%" }}
              type="text"
              placeholder="Email"
              className="textfield"
              maxLength={25}
              name="employerEmail"
              value={profileData.employerEmail}
              onChange={handleChange}
            />
          </div>
          <h3>Keyword:</h3>
          <input
            style={{ width: "100%" }}
            type="text"
            placeholder="Phone Numebr"
            className="textfield"
            name="employerMobileNo"
            maxLength={10}
            value={profileData.employerMobileNo}
            onChange={handleChange}
          />
          <h3>Location:</h3>
          <input
            style={{ width: "100%" }}
            type="text"
            placeholder="Location"
            className="textfield"
            name="employerLocation"
            maxLength={50}
            value={profileData.employerLocation}
            onChange={handleChange}
          />
        </div>
      </Modal>
    </>
  );
}

export default JobAlert;
