import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Jumbotron from './components/jumbotron';
import Home from './pages/Home';
import Search from './pages/Search';
import Nav from './components/navbar/Nav';

// https://www.pluralsight.com/guides/how-to-use-radio-buttons-in-reactjs

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      name: "React"
    };
    this.onChangeValue = this.onChangeValue.bind(this);
  }

  onChangeValue(event) {
    console.log(event.target.value);
  }

  render() {
    return (
          <Router>
      <div>
        <Nav />
        {/* <Switch> */}
          <Route exact path={"/"} >
            <Home />
          </Route>
        <Route exact path={"/Search"}>
          <Search />
          </Route> 

          {/* </Switch> */}
      </div>
    
      <Jumbotron />
      <div className="container container-fluid">
        <h1 className="text-center"> Welcome user! How much time do you have?</h1>
        <div className="container col-sm-6">
          <form className="form">
            <input />
          </form>
        </div>
        {/* <div className="container col-sm-6" onChange={this.onChangeValue}>
          <input type="radio" value="Day" name="day" /> By Day
          <input type="radio" value="Week" name="week" /> By Week
        </div> */}
      </div>
      </Router>
    );
  }
}

export default Profile;