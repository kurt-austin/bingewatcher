import React from 'react';
//package listen for changes in userdata//
import {observer} from "mobx-react";
//import Jumbotron from './components/Jumbotron';
import userData from "./userData/userData";
import LoginForm from "./LoginForm";
import SubmitButton from "./SubmitButton";





//import './App.css';

class App extends React.Component{
  //api call//
  async componentDidMount(){
    try {
      // checking if user is logged in by ref sessions//
      let res = await fetch("/loggedIn",{
        method: "Post",
        header:{
          "accept": "application/json",
          "content-Type": "application/json"
        }
      });
      let result = await res.json();
      if (result && result.sucess){
        userData.loading = false;
        userData.isLoggedIn = true;
        userData.username = result.username;

      }
      else{
          userData.loading = false;
          userData.isLoggedIn = false;
      }
    }
    catch(error){
      userData.loading = false;
      userData.isLoggedIn = false;

    }
  }

  async Logout(){
    try {
      // checking if user is logged in by ref sessions//
      let res = await fetch("/logout",{
        method: "Post",
        header:{
          "accept": "application/json",
          "content-Type": "application/json"
        }
      });
      let result = await res.json();
      if (result && result.sucess){
        userData.isLoggedIn = false;
        userData.username = "";
      
      }
    }
    catch(error){
      console.log (error)

    }
  }

    
  render(){
    if (userData.loading){
      return (<div className="app">
        <div className= "container">
         Application loading, please wait...
        </div>
    </div>

      );
    }
      else { 
        if(userData.isLoggedIn){
          return (
              <div className="app">
          <div className= "container">
           Welcome ! {userData.username}
           
           <SubmitButton
           text= {" Log out"}
           disabled = {false}
           onClick = {() => this.Logout()}
           />
         
          </div>
      
      </div>
  
        );
      }
      return( 
        <div className="app">
        <div className = "container">
        <SubmitButton
           text= {" Log out"}
           disabled = {false}
           onClick = {() => this.Logout()}
           />
         
          <LoginForm/>

        </div>
    </div>
  );
     }
      }
        }
export default observer(App);