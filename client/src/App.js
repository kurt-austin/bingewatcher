import React from 'react';
import NotApp from "./NotApp"
import newApp from "./pages/newApp"
import Search from "./pages/Search"
import { BrowserRouter as Router, Route } from "react-router-dom";
function App(){

    return (
        <Router>
        <h1>title</h1>
       <Route exact path="/profile" component={newApp } />
       <Route exact path="/login" component={NotApp} />
       <Route exact path="search" component=
       {Search}/>
        </Router>
    )
} 
export default App