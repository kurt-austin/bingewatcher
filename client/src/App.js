import React from 'react';
import Jumbotron from './components/Jumbotron';
import "./components/Jumbotron/style.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
//import Home from "./pages/Home";
import Search from "./pages/Search";
import Signup from "./pages/Signup";
import NotApp from "./pages/NotApp"
import Profile from "./pages/Profile"
import Details from "./pages/Details";
import 'bootstrap/dist/css/bootstrap.min.css';

//import footer from "./components/footer";
//import navbar from "./components/navbar";


//import './App.css';

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <h1>title</h1>
      <Jumbotron />
      {/* <Route exact path="/" component={Home} /> */}
      <Route exact path="/Search" component={Search} />
      <Route exact path="/" component={Signup} />
      <Route exact path="/Profile" component={Profile} />
      <Route exact path="/login" component={NotApp} />
      <Route exact path="/Details" component={Details} />
      {/* <Footer /> */}
    </Router>
  )

}

export default App;








