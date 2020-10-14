import React from 'react';

import Jumbotron from './components/Jumbotron';

import { BrowserRouter as Router, Route } from "react-router-dom";

import Search from "./pages/Search";
import Signup from "./pages/Signup";

import Profile from "./pages/Profile"
import Details from "./pages/Details";
// import Footer from './components/footer';





function App() {
  return (
    <Router>

      <Jumbotron />
    

      <Route exact path="/Search" component={Search} />
      <Route exact path="/" component={Signup} />
      <Route exact path="/Profile" component={Profile} />
 
      <Route exact path="/Details" component={Details} />
 
      {/* <Footer /> */}
    </Router>
  )

}

export default App;








