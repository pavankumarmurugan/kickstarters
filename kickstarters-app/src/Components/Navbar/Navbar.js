import React, { useState } from "react";
import { MenuItems } from "./ManuItems";
import "./Navbar.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  /** useStates */

  const [showHideHamburgerIcon, setShowHideHamburgerIcon] = useState(true);

  /** useStates */

  /** onclick functions */

  const handleHamburger = () => {
    setShowHideHamburgerIcon(!showHideHamburgerIcon);
  };

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
          <button className="signupbtn">Sign Up</button>
        </ul>
      </nav>
    </div>
  );
}
