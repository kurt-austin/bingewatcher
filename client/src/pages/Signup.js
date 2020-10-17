import Axios from "axios";
import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from "../components/alert";
import { Button } from "react-bootstrap";
import "./signupStyles.css";

function Signup() {
  const [userAlert, setAlert] = useState(false);
  const userRef = useRef();
  const passRef = useRef();
  let history = useHistory();

  const signUp = () => {
    if (userRef.current.value && passRef.current.value) {
      signUpUser(userRef.current.value.trim(), passRef.current.value.trim());
    }
  };
  const login = () => {
    if (userRef.current.value && passRef.current.value) {
      loginUser(userRef.current.value.trim(), passRef.current.value.trim());
    }
  };
  function signUpUser(userName, password) {
    Axios.post("/api/signup", {
      userName,
      password,
    })
      .then((res) => {
        history.push({ pathname: "/Profile", userId: res.data.id });
      })
      .catch(handleLoginError);
    function handleLoginError(err) {
      console.log(err.responseJSON);
      setAlert(true);
    }
  }

  function loginUser(userName, password) {
    Axios.post("/api/login", {
      userName,
      password,
    })
      .then((res) => {
        history.push({ pathname: "/Profile", userId: res.data.id });
      })

      .catch(handleLoginError);
    function handleLoginError(err) {
      console.log(err.responseJSON);
      setAlert(true);
    }
  }

  function closeIt() {
    setAlert(false);
  }
  return (
    <div>
      <div className="app container">
        <div className="d-flex justify-content-center">
          <card>
            <div className="base-container">
              {/* <div className = "header">Login</div> */}
              <div className="content"></div>
            </div>
          </card>
        </div>

        <div className="card-body d-flex justify-content-center">
          <card>
            <div className="card-body">
              <div className="header d-flex justify-content-center">
                Register/Login
              </div>
              <p>Username and password should be 8-30 characters.</p>
              <div className="d-flex justify-content-center">
                <div className="form">
                  <div className="form-group">
                    <input placeholder="username" ref={userRef}></input>
                  </div>
                  <div className="form-group"></div>
                  <input
                    type="password"
                    placeholder="password"
                    ref={passRef}
                  ></input>
                </div>
              </div>

              <br></br>
              <div className="d-flex justify-content-center">
                <Button type="button" className="btn" onClick={() => signUp()}>
                  Register
                </Button>
                &nbsp;
                <Button type="button" className="btn" onClick={() => login()}>
                  Log In
                </Button>
              </div>
              <p className="text-center">
                TV Show data is generated with the{" "}
                <a href="https://www.episodate.com/api" target="_blank">
                  EpisoDate.com API{" "}
                </a>
                <a
                  rel="license"
                  target="_blank"
                  href="https://creativecommons.org/licenses/by-sa/4.0/"
                >
                  <img
                    alt="Creative Commons License"
                    src="https://i.creativecommons.org/l/by-sa/4.0/80x15.png"
                  />
                </a>
              </p>
            </div>
          </card>
          <div className="message">
            {userAlert && (
              <Alert
                message="please enter password and username at least 8 characters"
                closeIt={closeIt}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
