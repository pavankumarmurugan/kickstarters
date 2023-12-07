import { useState } from "react";
import AdvertiseJobsModal from "../AdvertiseJob/AdvertiseJob";
import "./FeaturedJobs.css";
import { userSpecificToken } from "../GenericCode/GenericCode";
import {
  showToastError,
  showToastSuccess,
} from "../GenericToaster/GenericToaster";
import ViewPost from "../ViewPost/ViewPost";
import CandidateList from "../CandidatesList/CandidateList";

function FeaturedData({ wholeData, data, comingfrom }) {
  let getToken = userSpecificToken();
  const [openModal, setOpenModal] = useState(false);
  const [updateApiData, setUpdateApiData] = useState({});
  const [viewPost, setViewPost] = useState(false);
  const [ViewCandidatesList, setViewCandidatesList] = useState(false);
  const [viewCandidatesListData, setViewCandidatesListData] = useState([]);
  /** detail modal open and functions */
  const closeModalFunction = () => {
    setOpenModal(false);
  };
  const handleDetailPost = async (e) => {
    const filterData = wholeData.filter((x) => x.jobId === Number(e.target.id));
    setUpdateApiData(filterData[0]);
    setOpenModal(true);
  };
  const ViewCandidates = async (e) => {
    const response = await fetch(
      `http://localhost:8080/api/v1/job/service/jobCandidateList?jobId=${e?.target?.id}`,
      {
        headers: {
          "Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          Authorization: `${"Bearer "}${getToken?.token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data !== null && data !== undefined && data?.length > 0) {
          data.forEach((item) => {
            item.candidateDetails.jobId = e.target.id;
          });
          setTimeout(() => {
            setViewCandidatesListData(data);
            setViewCandidatesList(true);
          }, [1000]);
        } else {
          showToastError("No one applied on this job.");
        }
      })
      .catch((err) => {
        showToastError(err);
        console.log(err);
      });
  };
  /** detail modal open and functions */

  /** update posted job */

  const okModalFunction = async (postjobData) => {
    const response = await fetch(
      "http://localhost:8080/api/v1/job/service/updateJob",
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
        if (data?.message === "Job updated successfully") {
          showToastSuccess(data?.message);
          setTimeout(() => {
            setOpenModal(false);
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

  /** update posted job */

  /** View Post for Jobseeker */

  const handleViewPost = (e) => {
    const filterData = wholeData.filter((x) => x.jobId === Number(e.target.id));
    setUpdateApiData(filterData[0]);
    setViewPost(true);
  };

  /** View Post for Jobseeker */

  /** view post modal */

  const closeViewPostModal = () => {
    setViewPost(false);
  };
  const closeCandidatesListModal = () => {
    setViewCandidatesList(false);
  };

  /** view post modal */

  return (
    <>
      {/** posted job deatils modal */}
      {openModal && (
        <AdvertiseJobsModal
          isShowModel={openModal}
          closeModal={closeModalFunction}
          okModalFunction={okModalFunction}
          from="DetailPost"
          data={updateApiData}
        />
      )}
      {/** posted job deatils modal */}
      {/** View Post Modal */}
      {viewPost && (
        <ViewPost
          isShowModel={viewPost}
          closeModal={closeViewPostModal}
          from="NewPost"
          comingfrom={comingfrom}
          data={updateApiData}
        />
      )}
      {ViewCandidatesList && (
        <CandidateList
          isShowModel={ViewCandidatesList}
          closeModal={closeCandidatesListModal}
          from="NewPost"
          data={viewCandidatesListData}
        />
      )}
      {/** View Post Modal */}
      <div className="t-card" style={{ position: "relative" }}>
        <div className="jobtitle-salary">
          <h4>{data?.jobTitle}</h4>
          <p>€{data?.jobSalary}</p>{" "}
        </div>
        <div>
          <p>{`${data?.jobDesc?.slice(0, 150)}...`}</p>
        </div>

        {getToken?.userRole === "EMPLOYER" ? (
          data?.jobStatus === "Open" ? (
            <div
              style={{
                display: "flex",
                position: "absolute",
                bottom: "10px",
                right: "10px",
              }}
            >
              <div>
                <input
                  style={{ float: "right" }}
                  type="button"
                  className="custombtndark"
                  value="View Candidates"
                  id={data?.jobId}
                  onClick={ViewCandidates}
                />
              </div>
              <div>
                <input
                  style={{ float: "right" }}
                  type="button"
                  className="custombtndark"
                  value="Update"
                  id={data?.jobId}
                  onClick={handleDetailPost}
                />
              </div>
            </div>
          ) : (
            data?.jobStatus === "Closed" && (
              <h4
                style={{ position: "absolute", bottom: "10px", right: "10px" }}
              >
                Job Closed
              </h4>
            )
          )
        ) : getToken?.userRole === "JOBSEEKER" &&
          data?.jobStatus === "Closed" ? (
          <h4 style={{ position: "absolute", bottom: "10px", right: "10px" }}>
            Job Closed
          </h4>
        ) : (
          <>
            <div
              style={{ position: "absolute", bottom: "10px", right: "10px" }}
            >
              <input
                style={{ float: "right" }}
                type="button"
                className="custombtndark"
                value="View"
                id={data?.jobId}
                onClick={handleViewPost}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default FeaturedData;
