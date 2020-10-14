// Pie Chart package information: https://www.npmjs.com/package/react-minimal-pie-chart

import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import API from "../components/utils/API.js";
import { PieChart } from 'react-minimal-pie-chart';
import { Card, ListGroup, ListGroupItem, InputGroup, FormControl } from 'react-bootstrap';

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
        if (formObject.timeLogged && formObject.timeBudgeted) {

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

        };
    };

    function backToProfile() {
        history.push({ pathname: "/Profile", userId: user })

    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-xs-6 col-md-6">
                    <Card>
                        <Card.Img variant="top" src={show.image} />
                        <Card.Body>
                            <Card.Title> Show Name: {show.name} </Card.Title>
                            <Card.Text> Description: {show.description}
                            </Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem> Genre: {show.genre} </ListGroupItem>
                            <ListGroupItem> Number of Episodes: {show.numOfEpisodes}</ListGroupItem>
                            <ListGroupItem> Rating: {show.rating}</ListGroupItem>
                            <ListGroupItem> Runtime: {show.runtime}</ListGroupItem>
                            <ListGroupItem> Estimated Completion Date: {show.estimatedCompletionDate}</ListGroupItem>
                            <ListGroupItem> Update time logged: {show.timeLogged}
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
                            <ListGroupItem> Update time budgeted: {show.timeBudgeted}
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

                            <Card.Link onClick={handleFormSubmit}>Save Changes</Card.Link>
                            <Card.Link onClick={backToProfile}> Back to Profile </Card.Link>
                        </Card.Body>
                    </Card>
                </div>

                <div className="col-xs-6 col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Time Breakdown</h5>
                            <PieChart
                                data={[
                                    { title: 'How much time budgeted this show', value: show.timeLeft, color: '#C13C37' },
                                    { title: 'How much time logged for this show', value: show.timeLogged, color: '#6A2135' },
                                ]}
                            />
                        </div>
                    </div>
                </div>
            </div >
        </div >


    );

}



export default Details; 