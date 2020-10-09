import React, { useRef } from 'react';
import Jumbotron from '../components/Jumbotron';

function Signup() {
    const userRef = useRef()
    const passRef = useRef()
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


        <div className="app">
            <div>
                <h1>Register</h1>
                <input placeholder="username" ref={userRef}></input>
                <input placeholder="password" ref={passRef}></input>
                <button onClick={() => doIt()}>submit</button>

            </div>
        </div>

    );
}

export default Signup; 