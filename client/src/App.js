import React, { useRef } from 'react';
import Jumbotron from './components/Jumbotron';
import { BrowserRouter as Router, Route } from "react-router-dom";
//import Home from "./pages/Home";
import Search from "./pages/Search";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
//import footer from "./components/footer";
//import navbar from "./components/navbar";


//import './App.css';

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Jumbotron />
      {/* <Route exact path="/" component={Home} /> */}
      <Route exact path="/Search" component={Search} />
      <Route exact path="/" component={Signup} />
      <Route exact path="/Profile" component={Profile} />
      {/* <Footer /> */}
    </Router>
  )

}

export default App;
