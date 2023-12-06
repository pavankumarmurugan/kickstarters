import React, { useEffect, useState } from "react";
import "./DynamicMainPage.css";
import AdvertiseJobsModal from "../AdvertiseJob/AdvertiseJob";
import { dateConverter, userSpecificToken } from "../GenericCode/GenericCode";
import {
  showToastError,
  showToastSuccess,
} from "../GenericToaster/GenericToaster";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { DatePicker } from "antd";

function DynamicMainPage(props) {
  /** usestates */
  const navigate = useNavigate();
  let getToken = userSpecificToken();
  const [openModal, setOpenModal] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [user, setUser] = useState(false);
  const [datesValues, setDatesValues] = useState({
    fromDate: "",
    toDate: "",
  });
  /** usestates */
  /** modal functions */
  const openAdvertiseModal = () => {
    setOpenModal(true);
  };
  const closeModalFunction = () => {
    setOpenModal(false);
  };
  const okModalFunction = async (postjobData) => {
    debugger;
    const response = await fetch(
      "http://localhost:8080/api/v1/job/service/postJob",
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
        if (data?.message === "Job posted successfully") {
          setOpenModal(false);
          showToastSuccess(data?.message);
          setTimeout(() => {
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
  /** modal functions */

  /** useEffects */
  useEffect(() => {
    debugger;
    let userDetails = userSpecificToken();
    if (userDetails?.userRole === "EMPLOYER") {
      setUser(true);
    } else {
      setUser(false);
    }
  }, []);
  /** useEffects */

  const handleChange = (e) => {
    debugger;
    const value = e.target.value;
    if (value !== undefined && value !== null) {
      const regexForNumAndAlp = /^[a-zA-Z0-9]+$/;
      if (regexForNumAndAlp.test(value)) {
        setSearchInput(value);
      } else if (value === "") {
        setSearchInput(value);
      }
    }
  };

  const searchButton = async () => {
    debugger;
    if (
      datesValues.fromDate !== "" &&
      datesValues.fromDate !== null &&
      (datesValues.toDate === "" || datesValues.toDate === null)
    ) {
      showToastError("To Date field can not be empty.");
      return false;
    }
    if (
      (datesValues.fromDate === "" || datesValues.fromDate === null) &&
      datesValues.toDate !== "" &&
      datesValues.toDate !== null
    ) {
      showToastError("From Date field can not be empty.");
      return false;
    }
    if (searchInput === "") {
      showToastError("Input field can not be empty.");
      return false;
    }
    const obj = {
      jobTitle: searchInput,
      fromRange: dateConverter(datesValues.fromDate.$d),
      toRange: dateConverter(datesValues.toDate.$d),
    };
    const response = await fetch(
      "http://localhost:8080/api/v1/job/service/jobseekerJobSearch",
      {
        method: "POST",
        headers: {
          "Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          Authorization: `${"Bearer "}${getToken?.token}`,
        },
        body: JSON.stringify(obj),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data !== null && data !== undefined && data.length > 0) {
          // showToastSuccess("Api Called Successfully.");
          const compareJobPostTime = (a, b) =>
            new Date(a.jobPostTime) - new Date(b.jobPostTime);
          const sortedJobData = data.slice().sort(compareJobPostTime);
          setTimeout(() => {
            navigate("/jobs", { state: sortedJobData });
          }, [1000]);
        } else {
          showToastError(`No Jobs available for ${searchInput}.`);
        }
      })
      .catch((err) => {
        showToastError(err);
        console.log(err);
      });
  };

  return (
    <>
      <ToastContainer />
      <div className={props?.cName}>
        {/** advertise job modal */}
        {openModal && (
          <AdvertiseJobsModal
            isShowModel={openModal}
            closeModal={closeModalFunction}
            okModalFunction={okModalFunction}
            from="NewPost"
            data={null}
          />
        )}
        {/** advertise job modal */}
        {/** home main screen image and job search field section */}
        <img src={props?.image} alt="heroImg" />
        <div className="dynamicMain-text">
          {!user ? (
            <>
              {/** this section is for users home page */}
              <h1>{props?.title}</h1>
              {/* <p>{props?.text}</p> */}
              {props?.showbtn && (
                <>
                  <div>
                    <input
                      type="text"
                      placeholder="Search"
                      className="search_textfield"
                      value={searchInput}
                      onChange={handleChange}
                    />
                    <button className={props?.btnClass} onClick={searchButton}>
                      Search
                    </button>
                  </div>
                  <div>
                    <h3 style={{ color: "white" }}>Filter Job Posted Range</h3>
                  </div>
                  <div>
                    <DatePicker
                      placeholder="From Date:"
                      picker="month"
                      name="fromDate"
                      size="large"
                      value={datesValues.fromDate}
                      onChange={(date) => {
                        setDatesValues((prevState) => ({
                          ...prevState,
                          ["fromDate"]: date,
                        }));
                      }}
                    />
                    <DatePicker
                      picker="month"
                      name="toDate"
                      placeholder="To Date:"
                      size="large"
                      value={datesValues.toDate}
                      style={{ marginLeft: "8px" }}
                      onChange={(date) => {
                        setDatesValues((prevState) => ({
                          ...prevState,
                          ["toDate"]: date,
                        }));
                      }}
                    />
                  </div>
                </>
              )}
              {/** this section is for users home page */}
            </>
          ) : (
            <>
              {/** this section is for Recruiter home page */}
              <button className={props?.btnClass} onClick={openAdvertiseModal}>
                Advertise job now
              </button>
              {/** this section is for Recruiter home page */}
            </>
          )}
          {/** home main screen image and job search field section */}
        </div>
      </div>
    </>
  );
}

export default DynamicMainPage;
