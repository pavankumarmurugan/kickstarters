import { Modal, Pagination } from "antd";
import React, { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
// import "./ViewPost.css";
import { ToastContainer } from "react-toastify";
import { userSpecificToken } from "../GenericCode/GenericCode";
import {
  showToastError,
  showToastSuccess,
} from "../GenericToaster/GenericToaster";
import ViewPost from "../ViewPost/ViewPost";

function CandidateList(props) {
  /**useStates */
  debugger;
  console.log(props, "sad");
  const candidateDetails = props?.data;
  let getToken = userSpecificToken();
  const [daysPassed, setDaysPassed] = useState(0);
  // const [candidateDetails, setCandidateDetails] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(9);
  const [currentPosts, setCurrentPosts] = useState([]);
  const [viewCanData, setViewCanData] = useState([]);
  const [viewPost, setViewPost] = useState(false);
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
  useEffect(() => {
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPostsss = props?.data.slice(firstPostIndex, lastPostIndex);
    setCurrentPosts(currentPostsss);
  }, [currentPage]);
  let pages = [];
  for (let i = 1; i <= Math.ceil(props?.data?.length / postsPerPage); i++) {
    pages.push(i);
  }
  const aa = pages.length;

  const handleChange = (e) => {
    debugger;
    setCurrentPage(e);
  };

  const viewCandidate = (e) => {
    debugger;
    const filterData = props?.data?.filter(
      (x) => x.candidateDetails.userId === Number(e.target.id)
    );
    setViewCanData(filterData[0]);
    setViewPost(true);
  };
  const closeViewPostModal = () => {
    setViewPost(false);
  };

  return (
    <>
      <ToastContainer />
      {viewPost && (
        <ViewPost
          isShowModel={viewPost}
          closeModal={closeViewPostModal}
          // okModalFunction={okModalFunction}
          from="CandidateList"
          data={viewCanData}
        />
      )}
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
        <div className="ViewCandidate-main">
          <h1 style={{ display: "flex", justifyContent: "center" }}>
            Candidates List
          </h1>
          {candidateDetails?.map((item, index) => (
            <div className="t-card" style={{ position: "relative" }}>
              <div className="jobtitle-salary">
                <h4>{`${item?.candidateDetails?.userFirstName} ${item?.candidateDetails?.userLastName}`}</h4>

                {/** need to change this variable into jobSalary from backend  */}
              </div>
              <div>
                <h4>Skills</h4>
                {item?.candidateDetails?.jobSeekerSkillList?.map(
                  (item, index) => (
                    // <ol>
                    //   <li key={index}>{item.skillTitle}</li>
                    // </ol>
                    <li key={index}>
                      <p>
                        {index + 1}. {item.skillTitle}
                      </p>
                    </li>
                  )
                )}
              </div>
              <div>
                <h4>Contact Details</h4>
                <p>{item.candidateDetails.userEmail}</p>
                {item?.candidateDetails?.jobSeekerMobileNo}
              </div>

              <div
                style={{
                  display: "flex",
                  position: "absolute",
                  bottom: "10px",
                  right: "10px",
                }}
              >
                <div
                // style={{ position: "absolute", bottom: "10px", right: "10px" }}
                >
                  <input
                    style={{ float: "right" }}
                    type="button"
                    className="custombtndark"
                    value="View"
                    id={item?.candidateDetails?.userId}
                    onClick={viewCandidate}
                  />
                </div>
              </div>
            </div>
          ))}
          <div className="pagination-main">
            <Pagination
              current={currentPage}
              total={aa * 9}
              onChange={handleChange}
            />
          </div>
        </div>
      </Modal>
    </>
  );
}

export default CandidateList;
