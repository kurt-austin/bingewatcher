import React ,{useRef}from 'react';

//import Jumbotron from '../jumbotron';
 import Profile from  "./components/Profile";
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
  const doIt = ()=>{
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
        window.location.replace("/profile");
        // If there's an error, log the error
      })
      .catch(err => {
        console.log(err);
      });
    }

  return (
// <<<<<<< begum
//     <Router>
//       <div>
//         <Nav />
//         {/* <Switch> */}
//           <Route exact path={"/"} >
//             <Home />
//           </Route>
//         <Route exact path={"/search"}>
//           <Search />
//           </Route> 
//         {/* </Switch> */}
//         <Jumbotron />
//         <Profile />
//       </div>
//     </Router>


    <div className="app">
        <h1>BingeWatcher</h1>
        <h2>Login</h2>
        <input placeholder="username" ref={userRef}></input>
        <input placeholder="password" ref={passRef}></input>
        <button onClick={()=>doIt()}>submit</button>
        <br>
        </br>
        <h3>SignUp</h3>
        <div className= "userRegistration">
          <input placeholder= "first Name"ref ={firstNameRef}></input>
          <input placeholder = "Last name" ref = {lastNameRef}></input>
          <button onClick={()=>doIt()}>submit</button>


        
      </div>
    </div>

  );

  }

export default NotApp;
