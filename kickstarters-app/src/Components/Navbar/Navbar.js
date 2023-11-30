import React, { useEffect, useState } from "react";
import { MenuItems, profileItems, registerItems } from "./ManuItems";
import "./Navbar.css";
import { Dropdown, Space } from "antd";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { userSpecificToken } from "../GenericCode/GenericCode";
import Profile from "../Profile/Profile";
import { showToastError } from "../GenericToaster/GenericToaster";
import JobAlert from "../JobAlert/JobAlert";

export default function Navbar() {
  const navigate = useNavigate();

  /** token */
  let getToken = userSpecificToken();
  /** token */

  /** useStates */
  const [showHideHamburgerIcon, setShowHideHamburgerIcon] = useState(true);
  const [openProfile, setOpenProfile] = useState(false);
  const [userDropdownTitle, setUserDropdownTitle] = useState("");
  const [openJobAlert, setOpenJobAlert] = useState(false);

  /** useStates */

  /**useEffects */

  useEffect(() => {
    debugger;
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
    debugger;
    if (e.key === "3") {
      //profile
      let headerObj = {
        headers: {
          Authorization: `${"Bearer "}${getToken?.token}`,
        },
      };
      let url =
        getToken?.userRole === "EMPLOYER"
          ? "http://localhost:8080/api/v1/auth/profile/eployerProfileDetails"
          : "";
      const response = await fetch(url, headerObj)
        .then((response) => response.json())
        .then((data) => {
          if (data?.length) {
            // setHomepageJobsData(data);
            // setOpenProfile(true);
          } else {
            showToastError(data?.message);
          }
        })
        .catch((err) => {
          showToastError(err);
          console.log(err);
        });
      setOpenProfile(true);
    } else if (e.key === "4") {
      localStorage.setItem("token", {});
      navigate("signup");
    } else if (e.key === "5") {
      setOpenJobAlert(true);
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

  const closeJobAlertModal = () => {
    setOpenJobAlert(false);
  };

  return (
    <div>
      {/** profile modal */}
      {openProfile && (
        <Profile
          isShowModel={openProfile}
          closeModal={closeProfileModal}
          // okModalFunction={okModalFunction}
          from="NewPost"
          data={null}
        />
      )}
      {openJobAlert && (
        <JobAlert
          isShowModel={openJobAlert}
          closeModal={closeJobAlertModal}
          // okModalFunction={okModalFunction}
          data={null}
        />
      )}
      {/** profile modal */}
      <nav className="NavbarItems">
        <h1 className="navbar-logo">KickStarters</h1>
        <div className="menu-icons" onClick={handleHamburger}>
          <i
            className={showHideHamburgerIcon ? "fas fa-bars" : "fas fa-times"}
          ></i>
        </div>
        <ul className={showHideHamburgerIcon ? "nav-menu" : "nav-menu active"}>
          {MenuItems.map((item, index) => {
            return (
              <li key={index}>
                <Link to={item.url} className={item.cName}>
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
