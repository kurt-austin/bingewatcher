import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import API from "../components/utils/API";
import { InputGroup, FormControl, Button, ButtonToolbar, ListGroupItem, ListGroup, Card } from 'react-bootstrap';
import profileStyles from "./profileStyles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { PieChart } from 'react-minimal-pie-chart';

var uid = -1;

function Profile() {
    // Setting our component's initial state
    const [shows, setShows] = useState([]);
    const [user, setUser] = useState("");
    const [userId, setUserId] = useState(-1);
    const [timeAvailable, setTimeAvailable] = useState(0);
    const [totalBudgeted, setTotalBudgeted] = useState(0);
    const [budgetStatus, setBudgetStatus] = useState("FULLYBUDGETED");
    const [formObject, setFormObject] = useState({ timeAvailable: 0 });
    let history = useHistory();
    const location = useLocation()

    // Load all shows and store them with setShows
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        for (var pair of urlParams.entries()) {

            if (pair[0] === "uid") {
                uid = pair[1];
            }
        }
        setUserId(location.userId || uid);
        getShows(location.userId || uid);
        getUserProfile(location.userId || uid);

    }, [])

    // Loads user profile info
    function getUserProfile(UserId) {
        API.getUserProfile(UserId)
            .then(res => {
                const userInfo = res.data[0];
                setUser(userInfo.userName);
                setTimeAvailable(userInfo.timeAvailable);
                setTotalBudgeted(userInfo.totalBudgeted);
                setBudgetStatus(userInfo.budgetStatus);
                setFormObject({ ...formObject, timeAvailable: userInfo.timeAvailable })
            })
            .catch(err => console.log(err));
    };

    // Loads all shows and sets them to shows
    function getShows(UserId) {
        API.getShows(UserId)
            .then(res => {

                setShows(res.data)
            })
            .catch(err => console.log(err));
    };

    function deleteShow(tvShowId, userShowId) {
        API.deleteShow(tvShowId, userShowId)
            .then(res => {
                getUserProfile(location.userId || uid);
                getShows(userShowId);
            }

            )
            .catch(err => console.log(err));
    }

    // Deletes a user from the database with a given id, then redirects to the home page (signup)
    function deleteUser(UserId) {
        API.deleteUser(UserId)
            .then(results => {

                window.location.href = "/"
            })
            .catch(err => console.log(err));
    }

    function logout(UserId) {
        API.logout(UserId)
            .then(results => {

                window.location.href = "/"
            })
            .catch(err => console.log(err));
    }

    // Handles updating component state when the user types into the input field
    function handleInputChange(event) {
        const { name, value } = event.target;

        setFormObject({ ...formObject, [name]: value })
    };


    // When the form is submitted, save user selection to save the User data 
    // Then redirect to the Search Page
    function handleFormSubmit(event) {
        event.preventDefault()
        if (formObject.timeAvailable) {
            const user_data = {
                // we need to get userID from login
                id: userId,
                timeAvailable: formObject.timeAvailable
            }
            API.saveUserSelection(user_data)
                .then(results => {

                    getUserProfile(location.userId || uid);
                    history.push({ pathname: "/Profile", userId: userId })
                })
                .catch(err => console.log(err));

        };
    };

    function search(userId) {

        history.push("/Search?uid=" + userId)
    };

    function detailsPage(id, UserId) {
        history.push({ pathname: "/Details", id, UserId })
    }

    // const defaultLabelStyle = {
    //     fontSize: '3px',
    //     fontFamily: 'Righteous',
    //     color: '#fffff', 
    // };

    // const data = [
    //     { title: 'Time Left', value: show.timeLeft, color: '#CA1F7B' },
    //     { title: 'Time Logged', value: show.timeLogged, color: '#FF7F00' },
    // ];


    return (
        <div className="yellow-background">
            <div className="container container-fluid">
                <h1 className="profile-heading"> Welcome {user}! <span className="name"></span>How many hours do you have per week?</h1>
                <InputGroup className="mb-3">
                    <FormControl
                        name="timeAvailable"
                        size="md"
                        onChange={handleInputChange}
                        type="number"
                        className="form-control profile-regular-text"
                        placeholder="Enter how much time you have available in a week (hours)"
                        // By entering a value, we are creating a controlled input (whatever value we set in state)
                        value={formObject.timeAvailable}
                    />
                </InputGroup>
                <ListGroup className="list-group-flush">
                    <ListGroupItem className="profile-regular-text"> <strong>Total Hours Budgeted </strong>: {totalBudgeted}</ListGroupItem>
                    <ListGroupItem className={budgetStatus + " profile-regular-text"}> <strong>Budget Status</strong>: {budgetStatus}</ListGroupItem>
                </ListGroup>

                {/* Completed Shows */}
                <div className="container card-padding">
                    <div className="row">
                        <div className="col-xs-6 col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="profile-text card-title">Completed Shows</h5>
                                    <ButtonToolbar>
                                        <ListGroupItem className="card-text">
                                            {shows.filter(show => show.showStatus === "COMPLETED").length > 0 ? (
                                                shows.filter(show => show.showStatus === "COMPLETED").map(show => (
                                                    <ul key={show.id}>
                                                        <div className="row">
                                                            <div className="col-xs-4 col-md-4 profile-regular-text">
                                                                <a href="#" onClick={() => detailsPage(show.id, show.UserId)}>
                                                                    <strong> Show Name  </strong>: {show.name} <br></br> <strong> Runtime</strong>: {show.runtime}
                                                                </a>
                                                            </div>
                                                            <div className="col-xs-4 col-md-4">
                                                                <Card.Img variant="right" className="thumbnail" src={show.image} alt="movie image for the chosen movie" />
                                                            </div>
                                                            <div className="col-xs-4 col-md-4"><Button className="button-pink" onClick={() => deleteShow(show.id, show.UserId)}>Delete Show</Button> </div>
                                                        </div>
                                                    </ul>)
                                                )
                                            ) : (<p className="no-results-style">No results to display</p>)}
                                        </ListGroupItem>
                                    </ButtonToolbar>

                                </div>
                            </div>
                        </div>

                        {/* Shows in Progress  */}
                        <div className="col-xs-6 col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="profile-text card-title">Shows in Progress </h5>
                                    <ButtonToolbar>
                                        <ListGroupItem className="card-text">
                                            {shows.filter(show => show.showStatus === "INPROGRESS").length > 0 ? (
                                                shows.filter(show => show.showStatus === "INPROGRESS").map(show => (
                                                    <ul key={show.id}>
                                                        <div className="row">
                                                            <div className="col-xs-4 col-md-4 profile-regular-text">
                                                                <a href="#" onClick={() => detailsPage(show.id, show.UserId)}>
                                                                    <strong> Name</strong>: {show.name} <strong> <br></br> Budgeted</strong>:{show.timeBudgeted}&nbsp;
                                                                    </a>
                                                            </div>
                                                            <div className="col-xs-4 col-md-4">
                                                                <Card.Img variant="right" className="thumbnail" src={show.image} alt="movie image for the chosen movie" />
                                                            </div>
                                                            <div className="col-xs-4 col-md-4">
                                                                <Button className="button-pink" onClick={() => deleteShow(show.id, show.UserId)}>Delete Show</Button>
                                                            </div>
                                                        </div>
                                                    </ul>)
                                                )
                                            ) : (<p className="no-results-style">No results to display</p>)}

                                        </ListGroupItem>
                                    </ButtonToolbar>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
                <br>
                </br>
                <div className="btn-group d-flex justify-content-center">
                    <Button
                        type="submit"
                        size="md"
                        className="button-pink"
                        accessibilityLabel="button for searching shows"
                        onClick={() => search(userId)}>
                        Search Shows
                </Button>
                &nbsp;
                <Button type="submit"
                        size="md"
                        className="button-pink"
                        accessibilityLabel="button for saving profile selection"
                        onClick={handleFormSubmit}
                        disabled={!(formObject.timeAvailable)}>
                        Save Profile
                </Button>
                &nbsp;
                <Button type="submit"
                        size="md"
                        className="button-pink"
                        accessibilityLabel="button for logging out the user"
                        onClick={() => logout(userId)}>
                        Logout
                </Button>
                &nbsp;
                <Button type="submit"
                        size="md"
                        className="button-pink"
                        accessibilityLabel="button for deleting user profile"
                        onClick={() => deleteUser(userId)}
                    > Delete Profile
                </Button>
                </div>
            </div >
        </div >
    );
}



export default Profile;