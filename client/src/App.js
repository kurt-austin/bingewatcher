import React from 'react';
import logo from './logo.svg';
import Jumbotron from './components/jumbotron';
import Profile from "./components/Profile";
import Nav from './components/navbar/Nav';
import { BrowserRouter as Router, Route,  Link } from "react-router-dom";
import Home from './pages/Home';
import Search from './pages/Search';


//import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Nav />
        {/* <Switch> */}
          <Route exact path={"/"} >
            <Home />
          </Route>
        <Route exact path={"/search"}>
          <Search />
          </Route> 
        {/* </Switch> */}
        <Jumbotron />
        <Profile />
      </div>
    </Router>
  );
}

export default App;
