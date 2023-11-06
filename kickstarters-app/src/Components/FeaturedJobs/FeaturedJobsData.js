import { useState } from "react";
import AdvertiseJobsModal from "../AdvertiseJob/AdvertiseJob";
import "./FeaturedJobs.css";
import { userSpecificToken } from "../GenericCode/GenericCode";
import {
  showToastError,
  showToastSuccess,
} from "../GenericToaster/GenericToaster";

function FeaturedData({ wholeData, data }) {
  let getToken = userSpecificToken();
  const [openModal, setOpenModal] = useState(false);
  const [updateApiData, setUpdateApiData] = useState({});
  /** detail modal open and functions */
  const closeModalFunction = () => {
    setOpenModal(false);
  };
  const handleDetailPost = async (e) => {
    debugger;
    console.log(wholeData);
    const filterData = wholeData.filter((x) => x.jobId === Number(e.target.id));
    setUpdateApiData(filterData[0]);
    setOpenModal(true);
  };
  /** detail modal open and functions */

  /** update posted job */

  const okModalFunction = async (postjobData) => {
    debugger;
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
      <div className="t-card">
        <div className="jobtitle-salary">
          <h4>{data?.jobTitle}</h4>
          <p>€{data?.jobSalary}</p>{" "}
          {/** need to change this variable into jobSalary from backend  */}
        </div>
        <p>{data?.jobDesc}</p>
        {/* {getToken?.userRole === "JOBSEEKER" ? ( // will work on this for jobseeker
          <div>
            <input
              style={{ float: "right" }}
              type="button"
              className="custombtndark"
              value="Details"
              id={data?.jobId}
              onClick={handleDetailPost}
            />
          </div>
        ) : ( */}
        {getToken?.userRole === "EMPLOYER" && data?.jobStatus === "Open" ? (
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
        ) : getToken?.userRole === "EMPLOYER" &&
          data?.jobStatus === "Closed" ? (
          <h4 style={{ float: "right" }}>Job Closed</h4>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default FeaturedData;
