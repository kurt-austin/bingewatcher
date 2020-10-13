// Marissa's code

import Axios from 'axios';
import React, { useRef } from 'react';
//import Jumbotron from '../jumbotron';
import Profile from "./Profile";
//import Nav from './navbar/Nav';
import { useHistory} from "react-router-dom";
// import Home from './Home';
// import Search from './Search';
//import './App.css';

function NotApp() {
    const history= useHistory()
    const userRef = useRef()
    const passRef = useRef()
    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const emailRef = useRef()

    const doIt = () => {
        console.log(userRef.current.value)
        // event.preventDefault()
        console.log("we did it")
        loginUser(userRef.current.value, passRef.current.value)
    }
    function loginUser(userName, password) 
        { console.log(userName,password)
         fetch("/api/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
               'Content-Type': 'application/x-www-form-urlencoded',
           },
             body:JSON.stringify({
               userName: userName,
                password: password,
               

         })})
     
        
            .then((user) => {
                console.log(user)
              history.push("/Profile");
                 // If there's an error, log the error
            })
         .catch(err => {
             console.log(err);
             });
             console.log(useRef)
    }
    return (
        <div className="login">
            <h1>BingeWatcher</h1>
            <h2>Login</h2>
            <input placeholder="username" ref={userRef}></input>
            <input placeholder="password" ref={passRef}>
            </input>

            
            <button onClick={()=> doIt()}>Log In</button>
            <br/>
            
            <h3>SignUp</h3>
            <div className="userRegistration">
                {/* <input placeholder="first Name" ref={firstNameRef}></input>
                <input placeholder="Last name" ref={lastNameRef}></input>
                <br>
                </br> */}
                {/* <input placeholder="Email" ref={emailRef}></input>
                <br/><br/> */}
                <input placeholder="username" ref={userRef}></input>
                <input placeholder="password" ref={passRef}></input>
                <button onClick={doIt}>Sign Up</button>
            </div>
        </div>
    );
}
export default NotApp;