import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import API from "../components/utils/API";
import { InputGroup, FormControl, Button, ButtonToolbar, ListGroupItem } from 'react-bootstrap';

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
        for(var pair of urlParams.entries()) {
          // console.log(pair[0]+ ', '+ pair[1]);
          if (pair[0] === "uid") {
            uid = pair[1];
          }
       }
        setUserId(location.userId||uid);
        getShows(location.userId||uid);
        getUserProfile(location.userId||uid);
        
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
                console.log(res.data)
                setShows(res.data)
            })
            .catch(err => console.log(err));
    };

    function deleteShow(tvShowId,userShowId) {
        API.deleteShow(tvShowId,userShowId)
            .then(res => getShows(userShowId))
            .catch(err => console.log(err));
    }

    // Deletes a user from the database with a given id, then redirects to the home page (signup)
    function deleteUser(UserId) {
        API.deleteUser(UserId)
            .then(results => {
                console.log(results)
                window.location.href = "/"
            })
            .catch(err => console.log(err));
    }

    function logout(UserId) {
        API.logout(UserId)
            .then(results => {
                console.log(results)
                window.location.href = "/"
            })
            .catch(err => console.log(err));
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
                id: userId,
                timeAvailable: formObject.timeAvailable
            }
            API.saveUserSelection(user_data)
                .then(results => {
 
 
                    history.push({ pathname: "/Profile", userId: userId })
                })
                .catch(err => console.log(err));

        };
    };

    function search(userId) {
        window.location.href = "/Search?uid="+userId;
    };

    function detailsPage(id, UserId) {
                history.push({ pathname: "/Details", id, UserId })
    }




    return (
        <div className="container container-fluid">
            <h1 className="text-center"> Welcome {user}! <span className="name"></span>How much time do you have?</h1>
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
                                                        <a href="#" onClick={() => detailsPage(show.id, show.UserId)}>
                                                            <strong> Name: {show.name} Runtime: {show.runtime} </strong>
                                                        </a>
                                                        <Button className="primary" onClick={() => deleteShow(show.id,show.UserId)}>Delete Show</Button>
                                                    </div>
                                                </ul>)
                                            )
                                        ) : (<p>No results to display</p>)}

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
                <Button type="submit" className="btn-sm btn-primary"
                    onClick={() => search(userId)}>
                    Search Shows
                </Button>
                &nbsp;
                <Button type="submit" className="btn-sm btn-primary"
                    onClick={handleFormSubmit}
                    disabled={!(formObject.timeAvailable)}>
                    Save Profile
                </Button>
                &nbsp;
                <Button type="submit" className="btn-sm btn-primary"
                    onClick={() => logout(userId)}>
                    Logout
                </Button>
                &nbsp;
                <Button type="submit" className="btn-sm btn-primary"
                    onClick={() => deleteUser(userId)}
                > Delete Profile
                </Button>


            </div>
        </div >
    );
}



export default Profile;