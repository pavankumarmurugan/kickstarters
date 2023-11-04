import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import axios from "axios";
import "./SignUp.css";
import { emailRegex, passwordRegex } from "../GenericRegex/GenericRegex";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  showToastError,
  showToastMessage,
  showToastSuccess,
} from "../GenericToaster/GenericToaster";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import GenericModals from "../GenericModal/GenericModal";

function Signup() {
  const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip
      {...props}
      arrow
      classes={{ popper: className }}
      placement="right"
    />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: "red",
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "red",
      fontSize: "15px",
    },
    [`& .${tooltipClasses.tooltipPlacementRight}`]: {},
  }));

  {
    /** useStates */
  }

  const [isSignUpMode, setSignUpMode] = useState(false);
  const [isSignInMode, setSignInMode] = useState(false);
  const [formData, setFormData] = useState({
    userFirstName: "",
    userLastName: "",
    userEmail: "",
    userPassword: "",
    userRole: "JOBSEEKER",
    loginEmail: "",
    loginPassword: "",
  });

  const [validationField, setValidationField] = useState({
    signUpFName: false,
    signUpLName: false,
    signUpEmail: false,
    signUpPassword: false,
    loginEmail: false,
    loginPassword: false,
  });

  const [openModal, setOpenModal] = useState(false);
  {
    /** useStates */
  }

  const handleSignUp = async () => {
    debugger;

    if (formData.userFirstName.trim() === "") {
      setValidationField((prev) => ({
        ...prev,
        signUpFName: true,
      }));
      showToastError("First Name can not be empty.");
      return;
    } else if (formData.userLastName.trim() === "") {
      setValidationField((prev) => ({
        ...prev,
        signUpLName: true,
      }));
      showToastError("Last Name can not be empty.");
      return;
    }
    const response = await fetch(
      "http://localhost:8080/api/v1/auth/registerUser",
      {
        method: "POST",
        // mode: "no-cors",

        headers: {
          "Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    )
      .then((res) => {
        if (res.status === 200) {
          setOpenModal(true);
        }
      })
      .catch((err) => {
        showToastError(err);
        console.log(err);
      });

    // setSignUpMode(true);
    // setSignInMode(false);
  };
  const handleSignUpUi = () => {
    setSignUpMode(true);
    setSignInMode(false);
  };

  const handleSignIn = () => {
    setSignInMode(true);
    setSignUpMode(false);
  };

  /** Radio button Onchange function */

  const handleRadioBtn = (e) => {
    try {
      debugger;
      if (e !== undefined && e !== null) {
        setFormData((prev) => ({
          ...prev,
          userRole: e.target.value,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    debugger;
    const name = e.target.name;
    const value = e.target.value;

    if (value !== null && value !== undefined) {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      setValidationField((prev) => ({
        ...prev,
        signUpFName: false,
        signUpLName: false,
      }));
    }
  };

  const handleBlur = (e) => {
    debugger;
    const name = e.target.name;
    const value = e.target.value;

    if (value !== "" && value !== null && value !== undefined) {
      if (name === "userEmail") {
        if (!emailRegex.test(value.toLowerCase())) {
          setValidationField((prev) => ({
            ...prev,
            signUpEmail: true,
          }));
          showToastError("Invalid Email Address");
        } else {
          setValidationField((prev) => ({
            ...prev,
            signUpEmail: false,
          }));
        }
      } else if (name === "userPassword") {
        if (!passwordRegex.test(value)) {
          setValidationField((prev) => ({
            ...prev,
            signUpPassword: true,
          }));
          showToastError(
            "Password must contain 1 upper and lower character and 1 special character."
          );
        } else {
          setValidationField((prev) => ({
            ...prev,
            signUpPassword: false,
          }));
        }
      }
    }
  };

  /** Radio button Onchange function */

  /** login form */

  const handleChangeLogin = (e) => {
    debugger;
    const name = e.target.name;
    const value = e.target.value;
    if (value !== null && value !== undefined) {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const loginFunction = async () => {
    debugger;
    const obj = {
      userEmail: formData.loginEmail,
      userPassword: formData.loginPassword,
    };

    const response = await fetch("http://localhost:8080/api/v1/auth/signin", {
      method: "POST",
      // mode: "no-cors",

      headers: {
        "Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((res) => {
        if (res.status === 200) {
          showToastSuccess("Success");
          setOpenModal(true);
        }
      })
      .catch((err) => {
        showToastError(err);
        console.log(err);
      });
  };

  /** login form */

  /** modal functions */

  const closeModalFunction = () => {
    setOpenModal(false);
  };

  const okModalFunction = () => {
    setOpenModal(false);
    window.location.reload(false);
  };

  /** modal functions */

  return (
    <>
      <ToastContainer />

      {openModal && (
        <GenericModals
          isShowModel={openModal}
          closeModal={closeModalFunction}
          okModalFunction={okModalFunction}
          title="Email COnfirmation"
          message="Email Confirmation has been sent to your mail. Please confirm it within 15 minutes."
          btn="1"
          btn1Name="Login"
        />
      )}

      <div className={`container ${isSignUpMode ? "sign-up-mode" : ""}`}>
        <div className="forms-container">
          <div className="signin-signup">
            {/** Sign In Form Code */}
            <form className="sign-in-form">
              <h2 className="titile">Sign in</h2>
              <input
                type="text"
                placeholder="Username"
                className="textfield"
                name="loginEmail"
                value={formData.loginEmail}
                onChange={handleChangeLogin}
              />
              <input
                type="password"
                placeholder="Password"
                className="textfield"
                name="loginPassword"
                value={formData.loginPassword}
                onChange={handleChangeLogin}
              />
              <input
                type="button"
                className="custombtndark"
                value="Login"
                onClick={loginFunction}
              />
              <p className="social-text">Or Sign in with social platform</p>
              <div className="social-media">
                <a href="" className="social-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 512 512"
                  >
                    <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
                  </svg>
                </a>
                <a href="" className="social-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 488 512"
                  >
                    <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                  </svg>
                </a>
                <a href="" className="social-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 448 512"
                  >
                    <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
                  </svg>
                </a>
              </div>
            </form>
            {/** Sign In Form Code */}

            {/** Sign Up Form Code */}
            <form className="sign-up-form">
              <h2 className="titile">Sign up</h2>
              <input
                type="text"
                name="userFirstName"
                value={formData.userFirstName}
                placeholder="First Name*"
                className={`${
                  validationField.signUpFName
                    ? "errorTextfield textfield"
                    : "textfield"
                }`}
                onChange={handleChange}
              />
              <input
                type="text"
                name="userLastName"
                className={`${
                  validationField.signUpLName
                    ? "errorTextfield textfield"
                    : "textfield"
                }`}
                value={formData.userLastName}
                placeholder="Last Name*"
                onChange={handleChange}
              />
              <input
                type="text"
                name="userEmail"
                value={formData.userEmail}
                placeholder="Email*"
                className={`${
                  validationField.signUpEmail
                    ? "errorTextfield textfield"
                    : "textfield"
                }`}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <input
                type="password"
                name="userPassword"
                value={formData.userPassword}
                placeholder="Password*"
                className={`${
                  validationField.signUpPassword
                    ? "errorTextfield textfield"
                    : "textfield"
                }`}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {validationField.signUpFName ||
              validationField.signUpLName ||
              validationField.loginEmail ||
              validationField.loginPassword ? (
                <BootstrapTooltip title="One or more fields have errors.">
                  <input
                    type="button"
                    className={`${
                      validationField.signUpFName ||
                      validationField.signUpLName ||
                      validationField.loginEmail ||
                      validationField.loginPassword
                        ? "errorbtn"
                        : "custombtndark"
                    }`}
                    value="Sign Up"
                    onClick={handleSignUp}
                  />
                </BootstrapTooltip>
              ) : (
                <input
                  type="button"
                  className={`${
                    validationField.signUpFName ||
                    validationField.signUpLName ||
                    validationField.loginEmail ||
                    validationField.loginPassword
                      ? "errorbtn"
                      : "custombtndark"
                  }`}
                  value="Sign Up"
                  onClick={handleSignUp}
                />
              )}
              <p className="social-text">Or Sign up with social platform</p>
              <div className="social-media">
                <a href="" className="social-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 512 512"
                  >
                    <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
                  </svg>
                </a>
                <a href="" className="social-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 488 512"
                  >
                    <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                  </svg>
                </a>
                <a href="" className="social-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 448 512"
                  >
                    <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
                  </svg>
                </a>
              </div>
            </form>
            {/** Sign Up Form Code */}
          </div>
        </div>
        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>New here ?</h3>
              <div className="marginTopGenericClass">
                <p>Sign Up as an Employee or an Employer?</p>
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    value={formData?.userRole}
                    name="radio-buttons-group"
                    onChange={handleRadioBtn}
                  >
                    <FormControlLabel
                      value="JOBSEEKER"
                      control={<Radio />}
                      label="Employee"
                    />
                    <FormControlLabel
                      value="Recruiter"
                      control={<Radio />}
                      label="Employer"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              {/* <button className='btn transparent' id='sign-up-btn'>Sign up</button> */}
              <div className="marginTopGenericClass">
                <button
                  className="signupbtn"
                  onClick={handleSignUpUi}
                  value={"Sign up"}
                >
                  Sign Up
                </button>
              </div>
            </div>

            {/* <img src='https://media.istockphoto.com/id/1349094945/photo/human-using-a-computer-laptop-for-searching-for-job-and-fill-out-personal-data-on-job-website.webp?b=1&s=170667a&w=0&k=20&c=p_SRXAc7KnjTOB803Xap7irCB8xgiAey1SerMMFj-x8=' className='image' alt='logo' /> */}
          </div>

          <div className="panel right-panel">
            <div className="content">
              <h3>One of us ?</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipiscing elit. Minus
                impedit quidem quibusdam?
              </p>
              <button
                className="signupbtn"
                onClick={handleSignIn}
                value={"Sign up"}
              >
                Login
              </button>
            </div>

            {/* <img src='https://img.lovepik.com/free-png/20211208/lovepik-graduation-season-business-job-search-png-image_401413772_wh1200.png' className='image' alt='register' /> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
