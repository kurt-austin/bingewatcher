import Axios from 'axios';
import React, { useRef, useState } from 'react';
import {useHistory} from "react-router-dom";
import Alert from "../components/alert";


function Signup() {
    const [userAlert , setAlert]= useState(false)
    const userRef = useRef()
    const passRef = useRef()
    let history = useHistory();

    const signUp = () => {

        if (userRef.current.value && passRef.current.value) {
            signUpUser(userRef.current.value.trim(), passRef.current.value.trim());
        }
    }
    const login = () => {
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
            .then((res) => {
                history.push({ pathname: "/Profile", userId: res.data.id })

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
            .then((res) => {


                history.push({ pathname: "/Profile", userId: res.data.id })
               
            })
            
            .catch(handleLoginError);
            function handleLoginError(err){
                console.log(err.responseJSON);
                setAlert(true)
            }

            
            };
    
            function closeIt(){
                setAlert(false)
            }
    return (

        <div>
        <div className="app">
            <div>
           
            <card>
               <div className = "base-container">
                   <div className = "header">Login</div>
                   <div className = "content">
                       <div className = "image">
                           <img src ="https://i.ndtvimg.com/i/2016-07/television-generic_650x400_81469541532.jpg" height= "200px" width ="300px" >
                               </img>
                       </div>
                   </div>
                   </div>
                   </card>
                   </div>

                   <br>
                   </br>
               
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
                   <button type ="button" className ="btn"onClick={() => signUp()}>Register</button>
                   <button type="button" className ="btn" onClick={() => login()}>Log In</button>

                   <div className="message">
                   { userAlert && (
                <Alert message = "please enter password and username at least 8 characters" closeIt ={closeIt}/>
            )}
   

                  

               </div>
               </div>
               </div>
       
                   )};

       
   

            



export default Signup; 