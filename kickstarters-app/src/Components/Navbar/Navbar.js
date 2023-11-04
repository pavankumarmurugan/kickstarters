import React, { useEffect, useState } from "react";
import { MenuItems, profileItems, registerItems } from "./ManuItems";
import "./Navbar.css";
import { Dropdown, Space } from "antd";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { userSpecificToken } from "../GenericCode/GenericCode";

export default function Navbar() {
  const navigate = useNavigate();

  /** token */
  let getToken = userSpecificToken();
  /** token */

  /** useStates */
  const [showHideHamburgerIcon, setShowHideHamburgerIcon] = useState(true);
  const [user, setUser] = useState({});
  const [userDropdownTitle, setUserDropdownTitle] = useState("");

  /** useStates */

  /**useEffects */

  useEffect(() => {
    debugger;
    let userDetails = getToken;
    setUser(userDetails);
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

  const handleButtonClick = (e) => {
    if (getToken) {
      return;
    }
    navigate("/signup");
    console.log("click left button", e);
  };
  const handleMenuClick = (e) => {
    debugger;
    if (e.key === "3") {
      // profile
    }
    console.log("click", e);
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

  return (
    <div>
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
          {user ? (
            <Dropdown.Button
              menu={profileMenuProps}
              placement="bottom"
              onClick={handleButtonClick}
              icon={<UserOutlined />}
            >
              {userDropdownTitle}
            </Dropdown.Button>
          ) : (
            <Dropdown.Button
              menu={registerMenuProps}
              placement="bottom"
              onClick={handleButtonClick}
              icon={<UserOutlined />}
            >
              {userDropdownTitle}
            </Dropdown.Button>
          )}
        </ul>
      </nav>
    </div>
  );
}
