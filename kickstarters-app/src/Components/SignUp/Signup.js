import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import genericTextfield from "../GenericCode/GenericCode";
import "./SignUp.css";

function Signup() {
  {
    /** useStates */
  }

  const [isSignUpMode, setSignUpMode] = useState(false);
  const [isSignInMode, setSignInMode] = useState(false);
  const [signUpAsEmployee, setSignUpAsEmployee] = useState("1");

  {
    /** useStates */
  }

  const handleSignUp = () => {
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
        setSignUpAsEmployee(e.target.value);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /** Radio button Onchange function */

  return (
    <div className={`container ${isSignUpMode ? "sign-up-mode" : ""}`}>
      <div className="forms-container">
        <div className="signin-signup">
          {/** Sign In Form Code */}
          <form className="sign-in-form">
            <h2 className="titile">Sign in</h2>
            {/* <div className="input-field"> */}
            {/* <TextField
                style={{ width: "100%" }}
                id="outlined-basic"
                label="Username"
                variant="outlined"
                type="text"
                placeholder="Username"
                size="small"
              /> */}
            <input type="text" placeholder="Username" className="textfield" />
            <input
              type="password"
              placeholder="Password"
              className="textfield"
            />
            {/* </div> */}
            {/* <div className="input-field">
              <TextField
                style={{ width: "100%" }}
                id="outlined-basic"
                label="Password"
                variant="outlined"
                type="password"
                placeholder="password"
                size="small"
              />
            </div> */}
            <button className="signupbtn">Login</button>
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
            {/* <div className="input-field">
              <TextField
                style={{ width: "100%" }}
                id="outlined-basic"
                label="Username"
                variant="outlined"
                type="text"
                placeholder="Username"
                size="small"
              />
            </div> */}
            <input type="text" placeholder="Username" className="textfield" />
            <input type="text" placeholder="Email" className="textfield" />
            <input
              type="password"
              placeholder="Password"
              className="textfield"
            />
            {/* <div className="input-field">
              <TextField
                style={{ width: "100%" }}
                id="outlined-basic"
                label="Email"
                variant="outlined"
                type="email"
                placeholder="Email"
                size="small"
              />
            </div>
            <div className="input-field">
              <TextField
                style={{ width: "100%" }}
                id="outlined-basic"
                label="Password"
                variant="outlined"
                type="password"
                placeholder="Password"
                size="small"
              />
            </div> */}
            {signUpAsEmployee === "2" && (
              //   <div className="input-field">
              //     <TextField
              //       style={{ width: "100%" }}
              //       id="outlined-basic"
              //       label="for Emplyer"
              //       variant="outlined"
              //       type="password"
              //       placeholder="Password"
              //       size="small"
              //     />
              //   </div>
              <input
                type="password"
                placeholder="Password"
                className="textfield"
              />
            )}
            {/* <Button variant="contained">Sign up</Button> */}
            <button
              className="signupbtn"
              //   onClick={handleSignUp}
              value={"Sign up"}
            >
              Sign Up
            </button>
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
                  value={signUpAsEmployee}
                  name="radio-buttons-group"
                  onChange={handleRadioBtn}
                >
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="Employee"
                  />
                  <FormControlLabel
                    value="2"
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
                onClick={handleSignUp}
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
  );
}

export default Signup;
