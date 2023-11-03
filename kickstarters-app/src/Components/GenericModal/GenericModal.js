import { Button, Modal } from "antd";
import { useRef, useState } from "react";
import Draggable from "react-draggable";

function GenericModals(props) {
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
    props?.closeModal();
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
            {props?.title}
          </div>
        }
        open={props.isShowModel}
        onOk={handleOk}
        onCancel={handleCancel}
        // footer={[
        //   <Button key="ok" type="primary" onClick={handleOk}>
        //     OK
        //   </Button>,
        // ]}
        footer={[
          //   props?.btn === "1" ? (
          <input
            type="button"
            value="Ok"
            className="custombtndark"
            onClick={handleOk}
          />,
          //   ) : (
          <input
            type="button"
            value="Cancel"
            className="custombtndark"
            onClick={handleCancel}
          />,
          //   ),
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
        <p style={{ textAlign: "center" }}>{props?.message}</p>
      </Modal>
    </>
  );
}
export default GenericModals;
