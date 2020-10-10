import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, useHistory } from "react-router-dom";
import API from "../components/utils/API";
import Jumbotron from '../components/Jumbotron';
// https://react-bootstrap.netlify.app/getting-started/introduction/
import { InputGroup, FormControl, Button, ButtonToolbar, ListGroupItem } from 'react-bootstrap';



function Profile() {
    // Setting our component's initial state
    const [shows, setShows] = useState([])
    const [formObject, setFormObject] = useState({ timeAvailable: 0 })
    let history = useHistory();

    // Load all shows and store them with setShows
    useEffect(() => {
        getShows()
    }, [])

    // Loads all shows and sets them to shows
    function getShows() {
        API.getShows()
            .then(res => {
                console.log(res.data)
                setShows(res.data)
            })
            .catch(err => console.log(err));
    };

    function deleteShow(tvShowId) {
        API.deleteShow(tvShowId)
            .then(res => getShows())
            .catch(err => console.log(err));
    }

    // Deletes a user from the database with a given id, then redirects to the home page (signup)
    function deleteUser(UserId) {
        API.deleteUser(UserId)
            .then(results => {
                console.log(results)
                window.location.href = "/"
            })

    }

    // Handles updating component state when the user types into the input field
    function handleInputChange(event) {
        const { name, value } = event.target;
        console.log(event.target)
        setFormObject({ ...formObject, [name]: value })
    };


    // When the form is submitted, save user selection to save the User data 
    // Then redirect to the Search Page
    function handleFormSubmit(event) {
        event.preventDefault()
        if (formObject.timeAvailable) {
            const user_data = {
                // we need to get userID from login
                id: 1,
                timeAvailable: formObject.timeAvailable
            }
            API.saveUserSelection(user_data)
                .then(results => {
                    console.log(results)
                    window.location.href = "/Search"
                })

        };
    };

    function detailsPage(id, UserId) {
        API.userDetails(id, UserId)
            .then(results => {
                console.log(results)
                history.push({ pathname: "/Details", id, UserId })
            })
        // console.log("I am here")
        // console.log(id)
        //     console.log(UserId)
    }




    return (
        <div className="container container-fluid">
            <h1 className="text-center"> Welcome! How much time do you have?</h1>
            <InputGroup className="mb-3">
                <FormControl
                    name="timeAvailable"
                    onChange={handleInputChange}
                    type="number"
                    className="form-control"
                    placeholder="Enter how much time you have available in a week (hours)"
                    // By entering a value, we are creating a controlled input (whatever value we set in state)
                    value={formObject.timeAvailable}
                />
            </InputGroup>

            {/* <div className="container col-sm-6" onChange={this.onChangeValue}>
                    <input type="radio" value="Day" name="day" /> By Day
                     <input type="radio" value="Week" name="week" /> By Week
                     </div> */}

            {/* Completed Shows */}
            <div className="container">
                <div className="row">
                    <div className="col-xs-6 col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Completed Shows</h5>
                                <ButtonToolbar>
                                    <ListGroupItem className="card-text">
                                        {shows.length > 0 ? (
                                            shows.filter(show => show.showStatus === "COMPLETED").map(show => (
                                                <ul key={show.id}>
                                                    {/* <Link to={detailsPage}> */}
                                                    <strong> Name: {show.name} Length: {show.runtime} </strong>
                                                    {/* </Link> */}
                                                </ul>)
                                            )
                                        ) : (<p>No results to display</p>)}
                                    </ListGroupItem>
                                </ButtonToolbar>

                            </div>
                        </div>
                    </div>
                    {console.log(formObject.timeAvailable, "timeAvailable")}
                    {/* Shows in Progress  */}
                    <div className="col-xs-6 col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Shows in Progress </h5>
                                <ButtonToolbar>
                                    <ListGroupItem className="card-text">
                                        {shows.length > 0 ? (
                                            shows.filter(show => show.showStatus === "INPROGRESS").map(show => (
                                                <ul key={show.id}>
                                                    <div>
                                                        <a onClick={() => detailsPage(show.id, show.UserId)}>
                                                            <strong> Name: {show.name} Runtime: {show.runtime} </strong>
                                                        </a>
                                                        <Button bsStyle="primary" onClick={deleteShow}>Delete Show</Button>
                                                    </div>
                                                </ul>)
                                            )
                                        ) : (<p>No results to display</p>)}

                                    </ListGroupItem>
                                </ButtonToolbar>

                                {/* <ul className="card-text">
                                    {shows.length > 0 ? (
                                        shows.filter(show => show.showStatus === "INPROGRESS").map(show => (
                                            <ul key={show.id}>
                                                <Link to={"/api/user_tv_shows/:id"}>
                                                    <strong> Name: {show.name} Length: {show.runtime} </strong>
                                                </Link>
                                            </ul>)
                                        )
                                    ) : (<p>No results to display</p>)}

                                </ul> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <br>
            </br>
            <div className="btn-group d-flex justify-content-center">
                <button role="button" type="submit" className="btn-sm btn-primary"
                    onClick={deleteUser}
                > Delete Profile
                </button>
                <button role="button" type="submit" className="btn-sm btn-primary"
                    onClick={handleFormSubmit}
                    disabled={!(formObject.timeAvailable)}>
                    Continue
                </button>
            </div>
        </div >
    );
}



export default Profile;