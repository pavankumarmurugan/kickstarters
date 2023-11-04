import React, { useState } from "react";
import { MenuItems, profileItems, registerItems } from "./ManuItems";
import "./Navbar.css";
import { Dropdown, Space } from "antd";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  /** useStates */
  const [showHideHamburgerIcon, setShowHideHamburgerIcon] = useState(true);

  /** useStates */

  /** register and profile dropdown */

  const handleButtonClick = (e) => {
    // message.info("Click on left button.");
    navigate("/signup");
    console.log("click left button", e);
  };
  const handleMenuClick = (e) => {
    // message.info("Click on menu item.");
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
          {/* <button className="signupbtn">Sign Up</button> */}
          {isUser ? (
            <Dropdown.Button
              menu={registerMenuProps}
              placement="bottom"
              onClick={handleButtonClick}
              icon={<UserOutlined />}
            >
              Register
            </Dropdown.Button>
          ) : (
            <Dropdown.Button
              menu={profileMenuProps}
              placement="bottom"
              onClick={handleButtonClick}
              icon={<UserOutlined />}
            >
              Profile
            </Dropdown.Button>
          )}
        </ul>
      </nav>
    </div>
  );
}
