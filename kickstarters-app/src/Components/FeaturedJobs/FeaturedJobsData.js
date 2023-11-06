import { useState } from "react";
import AdvertiseJobsModal from "../AdvertiseJob/AdvertiseJob";
import "./FeaturedJobs.css";
import { userSpecificToken } from "../GenericCode/GenericCode";
import {
  showToastError,
  showToastSuccess,
} from "../GenericToaster/GenericToaster";

function FeaturedData({ data }) {
  let getToken = userSpecificToken();
  const [openModal, setOpenModal] = useState(false);
  const [updateApiData, setUpdateApiData] = useState({});
  /** detail modal open and functions */
  const closeModalFunction = () => {
    setOpenModal(false);
  };
  const handleDetailPost = async (e) => {
    debugger;
    let jobId = Number(e.target.id);
    const response = await fetch(
      `http://localhost:8080/api/v1/job/service/jobDetailsUser?jobId=${jobId}`,
      {
        headers: {
          Authorization: `${"Bearer "}${getToken?.token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data !== null && data !== undefined) {
          showToastSuccess("Api Called Successfully.");
          setUpdateApiData(data);
          setTimeout(() => {
            setOpenModal(true);
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
          <p>€{data?.salary}</p>{" "}
          {/** need to change this variable into jobSalary from backend  */}
        </div>
        <p>{data?.jobDesc}</p>
        {getToken?.userRole === "JOBSEEKER" ? (
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
        ) : (
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
        )}
      </div>
    </>
  );
}

export default FeaturedData;
