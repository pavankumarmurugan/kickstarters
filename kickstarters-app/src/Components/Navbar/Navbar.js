import React, { useEffect, useState } from "react";
import {
  MenuItems,
  MenuItemsJobSeeker,
  profileItems,
  registerItems,
} from "./ManuItems";
import "./Navbar.css";
import { Dropdown, Space } from "antd";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { userSpecificToken } from "../GenericCode/GenericCode";
import Profile from "../Profile/Profile";
import { showToastError } from "../GenericToaster/GenericToaster";

export default function Navbar() {
  const navigate = useNavigate();

  /** token */
  let getToken = userSpecificToken();
  /** token */

  /** useStates */
  const [showHideHamburgerIcon, setShowHideHamburgerIcon] = useState(true);
  const [openProfile, setOpenProfile] = useState(false);
  const [userDropdownTitle, setUserDropdownTitle] = useState("");
  const [profileData, setProfileData] = useState(null);
  const [allAppliedJobsData, setAllAppliedJobsData] = useState([]);

  /** useStates */

  /**useEffects */

  useEffect(() => {
    let userDetails = getToken;
    if (userDetails?.userRole === "JOBSEEKER") {
      setUserDropdownTitle(userDetails.userEmail.charAt(0).toLocaleUpperCase());
    } else if (userDetails?.userRole === "EMPLOYER") {
      setUserDropdownTitle(userDetails.userEmail.charAt(0).toLocaleUpperCase());
    } else {
      setUserDropdownTitle("Register");
    }
  }, []);

  /**useEffects */

  /** register and profile dropdown */
  const handleSignUp = () => {
    navigate("/signup");
  };
  const handleButtonClick = (e) => {
    if (getToken) {
      return;
    }
    navigate("/signup");
  };
  const handleMenuClick = async (e) => {
    if (e.key === "3") {
      let headerObj = {
        headers: {
          Authorization: `${"Bearer "}${getToken?.token}`,
        },
      };
      let url =
        getToken?.userRole === "EMPLOYER"
          ? "http://localhost:8080/api/v1/auth/profile/employerProfileDetails"
          : "http://localhost:8080/api/v1/auth/profile/jobSeekerProfileDetails";
      const response = await fetch(url, headerObj)
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            setProfileData(data);
            setOpenProfile(true);
          } else {
            showToastError(data?.message);
          }
        })
        .catch((err) => {
          showToastError(err);
          console.log(err);
        });
    } else if (e.key === "4") {
      localStorage.setItem("token", {});
      navigate("/signup");
    }
  };

  const registerMenuProps = {
    items: registerItems,
    onClick: handleMenuClick,
  };

  const profileMenuProps = {
    items: profileItems,
    onClick: handleMenuClick,
  };

  /** register and profile dropdown */

  /** onclick functions */

  const handleHamburger = () => {
    setShowHideHamburgerIcon(!showHideHamburgerIcon);
  };
  const isUser = true;
  /** onclick functions */

  /** profile modal functions */
  const closeProfileModal = () => {
    setOpenProfile(false);
  };
  /** profile modal functions */

  const handleAllJobs = async (event, url) => {
    debugger;
    if (url === "/allappliedjobs") {
      if (allAppliedJobsData?.length > 0) {
      } else {
        showToastError("No Jobs Applied yet.");
        event.preventDefault();
      }
    }
  };

  const callAllJobsAppliedFunction = async () => {
    debugger;
    const response = await fetch(
      "http://localhost:8080/api/v1/job/service/jobseekerAllAppliedJobs",
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
        if (data !== undefined && data !== null && data?.length > 0) {
          setAllAppliedJobsData(data);
        }
      })
      .catch((err) => {
        showToastError(err);
        console.log(err);
      });
  };

  useEffect(() => {
    debugger;
    callAllJobsAppliedFunction();
  }, []);

  return (
    <div>
      {/** profile modal */}
      {openProfile && (
        <Profile
          isShowModel={openProfile}
          closeModal={closeProfileModal}
          from="NewPost"
          data={profileData}
        />
      )}
      {/** profile modal */}
      <nav className="NavbarItems">
        <Link to="/" className="logodesign">
          <h1 className="navbar-logo">KickStarters</h1>
        </Link>
        <div className="menu-icons" onClick={handleHamburger}>
          <i
            className={showHideHamburgerIcon ? "fas fa-bars" : "fas fa-times"}
          ></i>
        </div>
        <ul className={showHideHamburgerIcon ? "nav-menu" : "nav-menu active"}>
          {getToken?.userRole === "EMPLOYER" ||
          getToken === undefined ||
          getToken === null
            ? MenuItems.map((item, index) => {
                return (
                  <li key={index}>
                    <Link to={item.url} className={item.cName}>
                      <i className={item.icon}></i>
                      {item.title}
                    </Link>
                  </li>
                );
              })
            : MenuItemsJobSeeker.map((item, index) => {
                return (
                  <li key={index}>
                    <Link
                      to={item.url}
                      className={item.cName}
                      onClick={(event) => handleAllJobs(event, item.url)}
                    >
                      <i className={item.icon}></i>
                      {item.title}
                    </Link>
                  </li>
                );
              })}
          {userDropdownTitle !== "Register" ? (
            <Dropdown.Button
              menu={profileMenuProps}
              placement="bottom"
              onClick={handleButtonClick}
              icon={<UserOutlined />}
            >
              {userDropdownTitle}
            </Dropdown.Button>
          ) : (
            <input
              type="button"
              className="custombtndark"
              value="Login"
              onClick={handleSignUp}
            />
          )}
        </ul>
      </nav>
    </div>
  );
}
