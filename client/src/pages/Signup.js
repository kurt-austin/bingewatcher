import React, { useRef,useState } from 'react';
import Jumbotron from '../components/Jumbotron';

function Signup() {
    //const [password,setPassword]= useState (""),
    // const [signupState, setSignupState] = useState({
    //     username: "",
    //     password: "",
    
     //handleChange = (event) => {setUsername(...username.username)}
    const userRef = useRef()
    const passRef = useRef()
    // const firstNameRef = useRef()
    // const lastNameRef = useRef()
    // const emailRef = useRef()
    const doIt = () => {
        console.log("we did it")
        SignupUser(userRef.current.value, passRef.current.value)
      
    }
    function SignupUser(username, password) {
        fetch("/api/signup", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
            body:JSON.stringify({
                userName: username,
                password: password

        })})
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
            <button onClick={() => doIt()}>Log In</button>
                <br></br>
                <button onClick={() => doIt()}>Register</button>
                <button onClick={() => doIt()}>Login</button>
            

            </div>
        </div>

    );
}

export default Signup; 