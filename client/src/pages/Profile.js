import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Jumbotron from '../components/Jumbotron';
//import Home from './pages/Home';
//import Search from './pages/Search';
//import Nav from './components/navbar/Nav';
// App.js will show navbar

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
            <>
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

                    {/* Completed */}

                    <div className="row">
                        <div className="col-sm-6">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Completed Shows</h5>
                                    <ul className="card-text"> List items</ul>
                                </div>
                            </div>
                        </div>

                        {/* In progress shows  */}

                        <div className="col-sm-6">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">In progress </h5>
                                    <ul className="card-text"> List items</ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="btn-group">
                        <button className="btn btn-primary">Delete Profile</button>
                        <button className="btn btn-primary">Continue</button>
                    </div>

                    {/* <>
            <Footer />
          </> */}
                </div>
            </>
        );
    }
}

export default Profile;