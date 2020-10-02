import React ,{useRef}from 'react';
import logo from './logo.svg';
import Jumbotron from './components/jumbotron';
import Profile from "./components/Profile";
import Nav from './components/navbar/Nav';
import { BrowserRouter as Router, Route,  Link } from "react-router-dom";
import Home from './pages/Home';
import Search from './pages/Search';


//import './App.css';

function App() {
  const userRef = useRef()
  const passRef = useRef()
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
        window.location.replace("/members");
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
      <div>
        <h1>Register</h1>
        <input placeholder="username" ref={userRef}></input>
        <input placeholder="password" ref={passRef}></input>
        <button onClick={()=>doIt()}>submit</button>
        <Jumbotron />
      </div>
    </div>

  );
}

export default App;
