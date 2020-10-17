// Pie Chart package information: https://www.npmjs.com/package/react-minimal-pie-chart

import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import API from "../components/utils/API.js";
import { PieChart } from 'react-minimal-pie-chart';
import { Card, ListGroup, ListGroupItem, InputGroup, FormControl, Button } from 'react-bootstrap';
import detailsStyles from "./detailsStyles.css";

function Details(props) {

    const [show, setShow] = useState({})
    const [user, setUser] = useState()
    const [formObject, setFormObject] = useState({ timeLogged: 0, timeBudgeted: 0 })


    let history = useHistory();
    const location = useLocation()


    useEffect(() => {
        setUser(location.UserId);
        API.loadShow(location.id, location.UserId)
            .then(res => {

                setShow(res.data[0])
                setFormObject({ ...formObject, timeBudgeted: res.data[0].timeBudgeted, timeLogged: res.data[0].timeLogged });


            })
            .catch(err => console.log(err));
    }, [])


    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({ ...formObject, [name]: value })
    };

    function handleFormSubmit(event) {
        event.preventDefault()
        // if (formObject.timeLogged && formObject.timeBudgeted) {

            API.updateUserSelection(show.id, show.UserId, formObject.timeBudgeted, formObject.timeLogged)
                .then(results => {
                    history.push({ pathname: "/Details", id: show.id, UserId: show.UserId })
                    API.loadShow(show.id, show.UserId)
                        .then(res => {
                            setShow(res.data[0])
                            setFormObject({ ...formObject, timeBudgeted: res.data[0].timeBudgeted, timeLogged: res.data[0].timeLogged });
                        })
                        .catch(err => console.log(err));
                })

        // };
    };

    function backToProfile() {
        history.push({ pathname: "/Profile", userId: user })

    }

    // defining constants for the Pie chart's label style and data 

    const defaultLabelStyle = {
        fontSize: '3px',
        fontFamily: 'Righteous',
        color: 'ffffff', 
    };

    const data = [
        { title: 'Time Left', value: show.timeLeft, color: '#CA1F7B' },
        { title: 'Time Logged', value: show.timeLogged, color: '#FF7F00' },
    ];


    return (
        <div className="show-card container">
            <div className="row">
                <div className="col-xs-6 col-md-6">
                    <Card>
                        <Card.Img variant="top" src={show.image} alt="movie image for the chosen movie"/>
                        <Card.Body>
                            <Card.Title className="details-headings"> Show Name: {show.name} </Card.Title>
                            <Card.Text className="details-text"> Description: {show.description}
                            </Card.Text>
                        </Card.Body>
                        <ListGroup className="details-text list-group-flush">
                            <ListGroupItem> Genre: {show.genre} </ListGroupItem>
                            <ListGroupItem> Number of Episodes: {show.numOfEpisodes}</ListGroupItem>
                            <ListGroupItem> Rating: {show.rating}</ListGroupItem>
                            <ListGroupItem> Runtime: {show.runtime}</ListGroupItem>
                            <ListGroupItem> Estimated Completion Date: {show.estimatedCompletionDate}</ListGroupItem>
                            <ListGroupItem> Update hours logged: {show.timeLogged}
                                <InputGroup className="mb-3">
                                    <FormControl
                                        name="timeLogged"
                                        onChange={handleInputChange}
                                        type="number"
                                        className="form-control"
                                        placeholder="Update logged time"
                                        // By entering a value, we are creating a controlled input (whatever value we set in state)
                                        value={formObject.timeLogged}
                                    />
                                </InputGroup>
                            </ListGroupItem>
                            <ListGroupItem> Update hours budgeted per week: {show.timeBudgeted}
                                <InputGroup className="mb-3">
                                    <FormControl
                                        name="timeBudgeted"
                                        onChange={handleInputChange}
                                        type="number"
                                        className="form-control"
                                        placeholder="Update budgeted time"
                                        // By entering a value, we are creating a controlled input (whatever value we set in state)
                                        value={formObject.timeBudgeted}
                                    />
                                </InputGroup>

                            </ListGroupItem>

                        </ListGroup>
                        <Card.Body>

                            <Button className="button-pink" onClick={handleFormSubmit}>Save Changes</Button>
                            &nbsp;
                            <Button className="button-pink" onClick={backToProfile}> Back to Profile </Button>
                        </Card.Body>
                    </Card>
                </div>

                <div className="pie-chart col-xs-6 col-md-6">
                        <div>
                            <h5 className="details-headings">Time Breakdown</h5>
                            {/* React Pie Chart */}

                            <PieChart
                                data={data}
                                label={({ dataEntry }) => Math.round(dataEntry.percentage) + '%' + dataEntry.title} 
                                labelStyle={defaultLabelStyle}
                            />
                        </div> 
                </div>
            </div >
        </div >


    );

}



export default Details; 