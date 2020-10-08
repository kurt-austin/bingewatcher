import React from "react";


class signUp extends Component{
    constructor (props){
        super (props);
        this.state ={
            username: "",
            password: "",
            firstName: "",
            lastName: "",
            email: "",

        }
    }
}


setInputValue (property,val){
    val = val.trim ();
    if (val.length > 18){
        return;
    }
    this.setState( {
        [property] : val
    });

signupUser (this.state);
email.val("");
password.val("");
firstName.val("");
lastName.val("");
email.val("");
}
function signupUser(username, password,firstName,lastName,email) {
    fetch("/api/login", {
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
      email: email
    })
      .then(() => {
        
    debugger
        window.location.replace("/profile");
        // If there's an error, log the error
      })
      .catch(err => {
        console.log(err);
        this.resetForm();
      }
    )
    export default signUp;