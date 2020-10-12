import Axios from 'axios';
import React, { useRef } from 'react';
// import {Route, Redirect, useHistory} from "react-router-dom";
import {useHistory} from "react-router-dom";
// import Jumbotron from '../components/Jumbotron';

function Signup() {
    console.log("***Signup.js***");
    const userRef = useRef()
    const passRef = useRef()
    let history = useHistory();

    const signUp = () => {
        console.log("we did it2")
        console.log("un: "+userRef.current.value);
        console.log("pw: "+passRef.current.value);
        if (userRef.current.value && passRef.current.value) {
            signUpUser(userRef.current.value.trim(), passRef.current.value.trim());
        }
    }
    const login = () => {
        console.log("we did it3")
        console.log("un: "+userRef.current.value);
        console.log("pw: "+passRef.current.value);
        if (userRef.current.value && passRef.current.value) {
            loginUser(userRef.current.value.trim(), passRef.current.value.trim());
        }
    }
    function signUpUser(userName, password) {
        Axios.post("/api/signup",
        {
            userName,
            password
        })
        // fetch("/api/login", {
        //     userName: userName,
        //     password: password
        // })
            .then((res) => {
                console.log(res);
                console.log("user id: "+res.data.id);
                // debugger
                // return (
                //     <Route>
                //         <Redirect to={{
                //             pathname: "/Profile"
                //         }} />
                //     </Route>
                // )
                history.push({ pathname: "/Profile", userId: res.data.id })
                // window.location.replace("/Profile?uid="+res.data.id);
                // If there's an error, log the error
            })
            .catch(err => {
                console.log(err);
            });
    }

    function loginUser(userName, password) {
        Axios.post("/api/login",
        {
            userName,
            password
        })
        // fetch("/api/login", {
        //     userName: userName,
        //     password: password
        // })
            .then((res) => {
                console.log(res);
                console.log("user id: "+res.data.id);
                // debugger
                // return (
                //     <Route >
                //         <Redirect to={{
                //             pathname: "/Profile"
                //         }} />
                //     </Route>
                // )
                history.push({ pathname: "/Profile", userId: res.data.id })
                // window.location.replace("/Profile?uid="+res.data.id);
                // If there's an error, log the error
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (


        <div className="app">
            <div>
                <h1>Register</h1>
                <input placeholder="username" ref={userRef}></input>
                <input placeholder="password" ref={passRef}></input>
                <button onClick={() => signUp()}>Sign Up</button>
                <button onClick={() => login()}>Login</button>

            </div>
        </div>

    );
}

export default Signup; 