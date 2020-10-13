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
            <div className = "base-container">
                <div className = "header">Login</div>
                <div className = "content">
                    <div className = "image">
                        <img src ="https://img.jakpost.net/c/2019/12/24/2019_12_24_83946_1577167027._large.jpg" height= "100px" width ="200px">
                            </img>
                    </div>
                </div>
                </div>
                <div className = "form">
                    <div className = "form-group">
                    <input placeholder="username" ref={userRef}></input>
                    </div>
                    <div className = "form-group"></div>
                    <input placeholder="password" ref={passRef}></input>
                </div>
               <div className = "footer">
               <button onClick={() => doIt()}>Log In</button>
               </div>
            
                <br></br>
                <button onClick={() => doIt()}>Register</button>
                <button onClick={() => doIt()}>Login</button>
            

            </div>
        </div>

    );
}

export default Signup; 