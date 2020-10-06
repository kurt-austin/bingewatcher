import React from 'react';
import inputData from "./inputData";
import SubmitButton from "./SubmitButton";
import Jumbotron from './components/Jumbotron';
import userData from './userData/userData';



//import './App.css';

class LoginForm extends React.Component{
 constructor (props){
   super (props);
   this.state ={
     username: "",
     password: "",
     busttonDisabled: false
   }
 }
    setInputVale (property,val){
      val = val.trim ();
      if (val.length > 18){
          return;
      }
      this.setState({
        [property] : val
      })
    }
    //if error with user login input form resets//
    resetForm(){
      this.state({
        username: "",
        password: "",
        busttonDisabled: false

      })
    }
    async login(){
      if (!this.state.username){
        return;
      }
      if(!this.state.password){
        return;
      }
      this.setState({
        busttonDisabled: true
      })
      try{
        let res = await fetch ("/login",{
          method: "post",
          headers: {
          "accept": "application/json",
          "content-Type" : "application/json"
          },
          //username needs to be in database//
          body : JSON.stringify({
            username: this.state.username,
            password: this.state.password
          })

        });
        let result = await res.json();
        if (result && result.succes){
          userData.isLoggedIn = true;
          userData.username = result.username;

        }
        else if (result && result.success === false){
          this.resetForm ();
          alert (result.msg);

        }

      }
    catch(error){
      console.log (error);
      this.resetForm();

    }
  }
  render(){
      return( 
      <div className="loginForm">
      Log in here
     
            <inputField
          type = "password"
          placeholder = "password"
          value ={this.state.password ? this.state.password : ""}
          onchange= {(val) => this.setInputVale("password",val)}
          />
        
          <SubmitButton
          text = "Login"
          disabled = {this.state.buttonDisabled}
          onClick={()=> this.login()}

          />
</div>
);
}
}
export default LoginForm;