// Marissa's code

import React, { useRef } from 'react';
//import Jumbotron from '../jumbotron';
import Profile from "./Profile";
//import Nav from './navbar/Nav';
//import { BrowserRouter as Router, Route,  Link } from "react-router-dom";
// import Home from './pages/Home';
// import Search from './pages/Search';
//import './App.css';
function NotApp() {
    const userRef = useRef()
    const passRef = useRef()
    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const emailRef = useRef()
    const doIt = () => {
        console.log("we did it")
        loginUser(userRef.current.value, passRef.current.value)
    }
    function loginUser(email, password) {
        fetch("/api/login", {
            email: email,
            password: password
        })
            .then((parameter) => {
                debugger
                window.location.replace("/Profile");
                // If there's an error, log the error
            })
            .catch(err => {
                console.log(err);
            });
    }
    return (
        <div className="login">
            <h1>BingeWatcher</h1>
            <h2>Login</h2>
            <input placeholder="username" ref={userRef}></input>
            <input placeholder="password" ref={passRef}></input>
            <button onClick={() => doIt()}>Log In</button>
            <br>
            </br>
            <h3>SignUp</h3>
            <div className="userRegistration">
                <input placeholder="first Name" ref={firstNameRef}></input>
                <input placeholder="Last name" ref={lastNameRef}></input>
                <br>
                </br>
                <input placeholder="Email" ref={emailRef}></input>
                <br></br>
                <input placeholder="username" ref={userRef}></input>
                <input placeholder="password" ref={passRef}></input>
                <button onClick={() => doIt()}>Sign Up</button>
            </div>
        </div>
    );
}
export default NotApp;