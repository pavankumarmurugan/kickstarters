import { Button, Modal } from "antd";
import { useRef, useState } from "react";
import Draggable from "react-draggable";
import "./AdvertiseJob.css";

function AdvertiseJobsModal(props) {
  const [disabled, setDisabled] = useState(true);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
  const draggleRef = useRef(null);
  /** modal open function */
  const handleOk = (e) => {
    props?.okModalFunction();
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
  return (
    <>
      <Modal
        title={
          <div
            style={{
              width: "100%",
              cursor: "move",
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
            Post Jobs
          </div>
        }
        style={{ top: 20 }}
        open={props.isShowModel}
        onOk={handleOk}
        width="70%"
        onCancel={handleCancel}
        footer={[
          <>
            <input
              type="button"
              value="Post Job"
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
          <h3>Title:</h3>
          <input
            style={{ width: "100%" }}
            type="password"
            placeholder="Password"
            className="textfield"
            name="loginPassword"
            // value={formData.loginPassword}
            // onChange={handleChangeLogin}
          />
          <h3>Company Intro:</h3>
          <textarea
            style={{ width: "100%", paddingTop: "13px", minHeight: "48px" }}
            type="password"
            placeholder="Password"
            className="textArea"
            name="loginPassword"
          />
          <h3>Job position description:</h3>
          <textarea
            style={{ width: "100%", paddingTop: "13px", minHeight: "48px" }}
            type="password"
            placeholder="Password"
            className="textArea"
            name="loginPassword"
          />
          <h3>Top benefits or perks:</h3>
          <textarea
            style={{ width: "100%", paddingTop: "13px", minHeight: "48px" }}
            type="password"
            placeholder="Password"
            className="textArea"
            name="loginPassword"
          />
          <h3>Location</h3>
          <textarea
            style={{ width: "100%", paddingTop: "13px", minHeight: "48px" }}
            type="password"
            placeholder="Password"
            className="textArea"
            name="loginPassword"
          />
        </div>
      </Modal>
    </>
  );
}
export default AdvertiseJobsModal;
