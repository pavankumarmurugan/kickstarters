import { Modal } from "antd";
import React, { useRef, useState } from "react";
import Draggable from "react-draggable";
import "./Profile.css";
import { ToastContainer } from "react-toastify";

function Profile(props) {
  /**useStates */
  const [disabled, setDisabled] = useState(true);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
  /**useStates */

  /**modal */
  const draggleRef = useRef(null);
  /** modal open function */
  const handleOk = (e) => {
    // props?.okModalFunction(postFormData);
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
  /**modal */
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
        width="70%"
        maskClosable={false}
        onCancel={handleCancel}
        footer={[
          <>
            <input
              type="button"
              value="Update"
              className="custombtndark"
              //   onClick={handleOk}
            />
            <input
              type="button"
              value="Cancel"
              className="custombtndark"
              //   onClick={handleCancel}
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
            <h3>Name:</h3>
            <input
              style={{ width: "100%" }}
              type="text"
              placeholder="Name"
              className="textfield"
              name="jobTitle"
              maxLength={25}
              //   value={postFormData.jobTitle}
              //   onChange={handleChange}
            />
            <h3>Email:</h3>
            <input
              style={{ width: "100%" }}
              type="text"
              placeholder="Email"
              className="textfield"
              maxLength={10000}
              name="jobDesc"
              //   value={postFormData.jobDesc}
              //   onChange={handleChange}
            />
          </div>
          <h3>Phone Number:</h3>
          <input
            style={{ width: "100%" }}
            type="text"
            placeholder="Phone Numebr"
            className="textfield"
            name="jobWorkExperience"
            maxLength={255}
            // value={postFormData.jobWorkExperience}
            // onChange={handleChange}
          />
          <h3>Location:</h3>
          <input
            style={{ width: "100%" }}
            type="text"
            placeholder="Location"
            className="textfield"
            name="jobSkill"
            maxLength={255}
            // value={postFormData.jobSkill}
            // onChange={handleChange}
          />
        </div>
      </Modal>
    </>
  );
}

export default Profile;
