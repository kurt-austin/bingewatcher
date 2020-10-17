import Axios from "axios";
import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from "../components/alert";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";
import signupStyles from "./signupStyles.css";
import footer from "../components/footer/footer.css";
import Footer from '../components/footer';

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
      <div className="signup">
          <div className= "blocktext">
        <div className="card-title">
          {/* <Card.Title className= "title-header">Card Title</Card.Title> */}
          <Card style={{ width: "20rem" }}>
            {/* <Card.Img
              variant="top"
              src="https://i.ndtvimg.com/i/2016-07/television-generic_650x400_81469541532.jpg"
              height="200px"
              width="300px"
            /> */}
            <Card.Body>
              <Card.Text>
                <div className="form">
                  <div className="form-group">
                    <input placeholder="username" ref={userRef}></input>
                  </div>
                  <div className="form-group"></div>
                  <input placeholder="password" ref={passRef}></input>
                </div>

                <div className="message">
                  {userAlert && (
                    <Alert
                      message="please enter password and username at least 8 characters"
                      closeIt={closeIt}
                    />
                  )}
                </div>
              </Card.Text>
              </Card.Body>
          </Card>
          <footer>
              <Button type="button" className="btn" onClick={() => signUp()}>
                Register
              </Button>

              <Button type="button" className="btn" onClick={() => login()}>
                Log In
              </Button>
              <div className="footer">© 2020 Copyright: BingeWatchers Development Team"
        </div>
              
           </footer>
        </div>
      </div>
    </div>
    </div>
   
  );
}



export default Signup;
