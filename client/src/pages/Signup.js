import React, { useRef,useState } from 'react';
import { CardImg } from 'react-bootstrap';
import Jumbotron from '../components/Jumbotron';
import "../pages/signupStyles.css";


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
    function SignupUser(userName, password) {
        fetch("/api/ignup", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            body:JSON.stringify({
                userName: userName,
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

        <div className ="card-header">
        <div className="app">
            <div>
               
               
                
            <div className = "base-container">
                <div className = "header">Login</div>
                <div className = "content">
                    <div className = "image">
                        <img src ="https://i.ndtvimg.com/i/2016-07/television-generic_650x400_81469541532.jpg" height= "200px" width ="300px" >
                            </img>
                    </div>
                </div>
                </div>
                
                </div>
                <div className = "card-body">
                
                    <div className= "card-body">
                <div className = "form">
                    <div className = "form-group">
                    <input placeholder="username" ref={userRef}></input>
                    </div>
                    <div className = "form-group"></div>
                    <input placeholder="password" ref={passRef}></input>
                </div>
                <br>
                </br>
               <div className = "footer">
               <button type="button" className ="btn" onClick={() => doIt()}>Log In</button>
               </div>
            
                <br></br>
                <div className ="header">Register</div>
                <div className = "form">
                    <div className = "form-group">
                    <input placeholder="username" ref={userRef}></input>
                    </div>
                    <div className = "form-group"></div>
                    <input placeholder="password" ref={passRef}></input>
                </div>
                <br>
                </br>
                <div className = "footer">
                <button type ="button" className ="btn"onClick={() => doIt()}>Register</button>
                {/* <button onClick={() => doIt()}>Login</button> */}
                </div>
            </div>
           
            </div>
            </div>
            </div>
            
    

    );
}

export default Signup; 