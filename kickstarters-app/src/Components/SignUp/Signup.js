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
import "./SignUp.css";
import { emailRegex, passwordRegex } from "../GenericRegex/GenericRegex";
import "react-toastify/dist/ReactToastify.css";
import {
  showToastError,
  showToastSuccess,
} from "../GenericToaster/GenericToaster";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import GenericModals from "../GenericModal/GenericModal";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
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
    delete formData["loginEmail"];
    delete formData["loginPassword"];
    const response = await fetch(
      "http://localhost:8080/api/v1/auth/registerUser",
      {
        method: "POST",
        headers: {
          "Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data?.message === "User registered successfully!") {
          showToastSuccess(data?.message);
          setTimeout(() => {
            setOpenModal(true);
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
    const name = e.target.name;
    const value = e.target.value;
    if (value !== null && value !== undefined) {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      setValidationField((prev) => ({
        ...prev,
        loginEmail: false,
        loginPassword: false,
      }));
    }
  };

  const loginFunction = async () => {
    const obj = {
      userEmail: formData.loginEmail,
      userPassword: formData.loginPassword,
    };

    const response = await fetch("http://localhost:8080/api/v1/auth/signin", {
      method: "POST",
      headers: {
        "Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Login Successfull!!") {
          showToastSuccess(data.message);
          setTimeout(() => {
            localStorage.setItem("token", JSON.stringify([data]));
            navigate("/");
          }, 1000);
        } else {
          showToastError(data.message);
          setValidationField((prev) => ({
            ...prev,
            loginEmail: true,
            loginPassword: true,
          }));
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
                name="loginEmail"
                className={`${
                  validationField.loginEmail
                    ? "errorTextfield textfield"
                    : "textfield"
                }`}
                value={formData.loginEmail}
                onChange={handleChangeLogin}
              />
              <input
                type="password"
                placeholder="Password"
                name="loginPassword"
                className={`${
                  validationField.loginEmail
                    ? "errorTextfield textfield"
                    : "textfield"
                }`}
                value={formData.loginPassword}
                onChange={handleChangeLogin}
              />
              {validationField.loginEmail || validationField.loginPassword ? (
                <BootstrapTooltip title="One or more fields have errors.">
                  <input
                    type="button"
                    className={`${
                      validationField.loginEmail ||
                      validationField.loginPassword
                        ? "errorbtn"
                        : "custombtndark"
                    }`}
                    value="Login"
                    onClick={loginFunction}
                  />
                </BootstrapTooltip>
              ) : (
                <input
                  type="button"
                  className={`${
                    validationField.loginEmail || validationField.loginPassword
                      ? "errorbtn"
                      : "custombtndark"
                  }`}
                  value="Login"
                  onClick={loginFunction}
                />
              )}
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
              {/* <p className="social-text">Or Sign up with social platform</p> */}
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
                      label="Jobseeker"
                    />
                    <FormControlLabel
                      value="EMPLOYER"
                      control={<Radio />}
                      label="Employer"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
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
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
